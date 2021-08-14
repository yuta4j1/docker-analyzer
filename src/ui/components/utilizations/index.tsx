import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { css } from '@linaria/core'
import Title from '../common/Title'
import { Doughnut } from 'react-chartjs-2'
import type { DockerContainer } from '../../../types/docker/container'
import type { ContainerStats } from '../../../types/docker/stats'

const wrapper = css`
  width: 18rem;
`

type ContainerMemoryUsage = {
  containerName: string
  usage: number
}

type ChartDatasets = {
  label?: string
  data: number[]
  backgroundColor: string[]
  borderColor: string[]
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
  const [containerMemoryUsages, setContainerMemoryUsages] = useState<
    ContainerMemoryUsage[] | null
  >(null)

  const createChartData = (): ChartDatasets[] => {
    if (!containerMemoryUsages) {
      return []
    }

    let datas = []
    let backgroundColors = []
    let borderColors = []
    for (let i in containerMemoryUsages) {
      if (containerMemoryUsages[i].containerName === 'unused') {
        const UNUSED_COLOR = '#4a4a4a'
        datas.push(containerMemoryUsages[i].usage)
        backgroundColors.push(UNUSED_COLOR)
        borderColors.push(UNUSED_COLOR)
      } else {
        datas.push(containerMemoryUsages[i].usage)
        backgroundColors.push(COLORS[i])
        borderColors.push(COLORS[i])
      }
    }
    return [
      {
        data: datas,
        borderColor: borderColors,
        backgroundColor: backgroundColors,
      },
    ]
  }
  const createLabels = (): string[] => {
    if (!containerMemoryUsages) {
      return [] as string[]
    }

    return containerMemoryUsages.map((v) => v.containerName)
  }
  const chartData = useMemo((): ChartData | null => {
    const labels = createLabels()
    const datasets = createChartData()
    if (labels.length === 0 || datasets.length === 0) {
      return null
    }

    return {
      labels: createLabels(),
      datasets: createChartData(),
    }
  }, [containerMemoryUsages])

  const updateContainerMemoryUsages = useCallback(
    (statsArr: ContainerStats[]): void => {
      let usedContainerUsage = statsArr.map((v) => ({
        containerName: v.name.replace('/', ''),
        usage: computeMemoryUsage(v),
      }))
      usedContainerUsage.sort((a, b) => {
        return b.usage - a.usage
      })
      let usedUsage = usedContainerUsage.reduce((acc, curr) => {
        return acc + curr.usage
      }, 0)
      const unusedUsage = 100 - usedUsage
      setContainerMemoryUsages([
        ...usedContainerUsage,
        { containerName: 'unused', usage: unusedUsage },
      ])
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

  useEffect(() => {
    fetchDatas()
    const intervalId = setInterval(fetchDatas, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={wrapper}>
      <Title title="CPU Usage" />
      {chartData !== null && (
        <Doughnut
          type={'doughnut'}
          width={480}
          height={480}
          data={chartData}
          options={{ animation: false }}
          redraw
        />
      )}
    </div>
  )
}

export default Utilizations
