import React, { useState, useLayoutEffect, useCallback } from 'react'
import { css } from '@linaria/core'
import LineChart from '../line-chart'
import { getCurrentHourMinute } from '../../../lib/dateTime'
import type { DockerContainer } from '../../../types/docker/container'
import type { ContainerStats } from '../../../types/docker/stats'

const flexContainer = css`
  display: flex;
`

type MemoryUsagePerMinute = {
  minutes: string[]
  containerName: string
  usage: number[]
}

type ContainerMemoryUsagePerMinute = {
  [key: string]: MemoryUsagePerMinute
}

type ChartDatasets = {
  label: string
  data: number[]
  borderColor: string
}

type ChartData = {
  labels: string[]
  datasets: ChartDatasets[]
}

const COLORS = ['rgb(75, 89, 192)', 'rgb(75, 89, 56)', 'rgb(35, 89, 56)']

const computeMemoryUsage = (stats: ContainerStats): number => {
  const usedMemory = stats.memoryStats.usage - stats.memoryStats.stats.cache
  const availableMmeory = stats.memoryStats.limit
  return (usedMemory / availableMmeory) * 100
}

const Utilizations = () => {
  const [
    containerMemoryUsages,
    setContainerMemoryUsages,
  ] = useState<ContainerMemoryUsagePerMinute | null>(null)
  const createChartData = (): ChartDatasets[] => {
    if (!containerMemoryUsages) {
      return []
    }
    return Object.keys(containerMemoryUsages).map((v, i) => {
      const label = containerMemoryUsages[v].containerName
      const data = containerMemoryUsages[v].usage
      return {
        label,
        data,
        borderColor: COLORS[i],
      }
    })
  }
  const createLabels = (): string[] => {
    if (!containerMemoryUsages) {
      return []
    }
    for (let k of Object.keys(containerMemoryUsages)) {
      return containerMemoryUsages[k].minutes
    }
  }
  const data = (): ChartData | null => {
    const labels = createLabels()
    const datasets = createChartData()
    if (labels.length === 0 || datasets.length === 0) {
      return null
    }
    const len = createLabels().length
    return {
      labels: createLabels(),
      datasets: createChartData(),
    }
  }

  const updateContainerMemoryUsages = useCallback(
    (statsArr: ContainerStats[]): void => {
      const hourMin = getCurrentHourMinute()
      console.log('にゃあああああ', containerMemoryUsages)
      if (containerMemoryUsages) {
        console.log('あれ')
        let newMemUsages = {}
        for (let stats of statsArr) {
          if (containerMemoryUsages[stats.id]) {
            newMemUsages[stats.id] = {
              minutes: [...containerMemoryUsages[stats.id].minutes, hourMin],
              containerName: stats.name,
              usage: [
                ...containerMemoryUsages[stats.id].usage,
                computeMemoryUsage(stats),
              ],
            } as MemoryUsagePerMinute
          } else {
            newMemUsages[stats.id] = {
              minutes: [hourMin],
              containerName: stats.name,
              usage: [computeMemoryUsage(stats)],
            } as MemoryUsagePerMinute
          }
        }
        setContainerMemoryUsages(newMemUsages)
      } else {
        console.log('あれ?????')
        let newMemUsages = {}
        for (let stats of statsArr) {
          newMemUsages[stats.id] = {
            minutes: [hourMin],
            containerName: stats.name,
            usage: [computeMemoryUsage(stats)],
          } as MemoryUsagePerMinute
        }
        setContainerMemoryUsages(newMemUsages)
      }
    },
    [containerMemoryUsages]
  )

  const fetchDatas = async () => {
    const activeContainers = await window.dockerApi.invoke<DockerContainer[]>({
      url: 'containers/json',
    })
    if (activeContainers && activeContainers.length > 0) {
      const containerStats = await Promise.all(
        activeContainers.map((v) =>
          window.dockerApi.invoke<ContainerStats>({
            url: `containers/${v.id}/stats?stream=0`,
          })
        )
      )
      updateContainerMemoryUsages(containerStats)
    }
  }

  useLayoutEffect(() => {
    fetchDatas()
    const intervalId = setInterval(fetchDatas, 6000)

    return () => {
      clearInterval(intervalId)
    }
  }, [fetchDatas])
  return (
    <div className={flexContainer}>
      {data() !== null && <LineChart chartData={data()} />}
    </div>
  )
}

export default Utilizations
