import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { css } from '@linaria/core'
import Title from '../common/Title'
import { Doughnut } from 'react-chartjs-2'
import Spacer from '../common/Spacer'
import type { DockerContainer } from '../../../types/docker/container'
import type { ContainerStats } from '../../../types/docker/stats'

const wrapper = css`
  display: flex;
`

const chartContainer = css`
  width: 16rem;
`

type ContainerMemoryUsage = {
  containerName: string
  usage: number
}

type ContainerCpuUsage = {
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
  datasets: ChartDatasets[]
}

const COLORS = ['rgb(75, 89, 192)', 'rgb(75, 89, 56)', 'rgb(35, 89, 56)']

const computeMemoryUsage = (stats: ContainerStats): number => {
  const usedMemory = stats.memoryStats.usage - stats.memoryStats.stats.cache
  const availableMmeory = stats.memoryStats.limit
  return (usedMemory / availableMmeory) * 100
}

const computeCpuUsage = (stats: ContainerStats): number => {
  const { cpuStats, precpuStats } = stats
  const cpuDelta =
    cpuStats.cpuUsage.totalUsage - precpuStats.cpuUsage.totalUsage
  const systemCpuDelta = cpuStats.systemCpuUsage - precpuStats.systemCpuUsage
  const numberCpus = cpuStats.cpuUsage.percpuUsage?.length
  return (cpuDelta / systemCpuDelta) * numberCpus * 100.0
}

const Utilizations = () => {
  const [containerMemoryUsages, setContainerMemoryUsages] = useState<
    ContainerMemoryUsage[] | null
  >(null)
  const [containerCpuUsages, setContainerCpuUsages] = useState<
    ContainerCpuUsage[] | null
  >(null)

  const createChartData = (
    containerUsages: ContainerMemoryUsage[] | ContainerCpuUsage[]
  ): ChartDatasets[] => {
    if (!containerMemoryUsages) {
      return []
    }

    let datas = []
    let backgroundColors = []
    let borderColors = []
    for (let i in containerUsages) {
      if (containerUsages[i].containerName === 'unused') {
        const UNUSED_COLOR = '#4a4a4a'
        datas.push(containerUsages[i].usage)
        backgroundColors.push(UNUSED_COLOR)
        borderColors.push(UNUSED_COLOR)
      } else {
        datas.push(containerUsages[i].usage)
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

  // ラベル作成
  const createLabels = (): string[] => {
    if (!containerMemoryUsages) {
      return [] as string[]
    }

    return containerMemoryUsages.map((v) => v.containerName)
  }

  const memoryUsageChartData = useMemo((): ChartData | null => {
    if (containerMemoryUsages === null) {
      return null
    }
    const datasets = createChartData(containerMemoryUsages)
    if (datasets.length === 0) {
      return null
    }

    return {
      datasets: datasets,
    }
  }, [containerMemoryUsages])

  const cpuUsageChartData = useMemo((): ChartData | null => {
    if (containerCpuUsages === null) {
      return null
    }
    const datasets = createChartData(containerCpuUsages)
    if (datasets.length === 0) {
      return null
    }

    return {
      datasets: datasets,
    }
  }, [containerCpuUsages])

  // メモリ使用率の更新
  const updateContainerMemoryUsages = useCallback(
    (statsArr: ContainerStats[]): void => {
      let usedMemoryUsage = statsArr.map((v) => ({
        containerName: v.name.replace('/', ''),
        usage: computeMemoryUsage(v),
      }))
      usedMemoryUsage.sort((a, b) => {
        return b.usage - a.usage
      })
      let usedUsage = usedMemoryUsage.reduce((acc, curr) => {
        return acc + curr.usage
      }, 0)
      const unusedUsage = 100 - usedUsage
      setContainerMemoryUsages([
        ...usedMemoryUsage,
        { containerName: 'unused', usage: unusedUsage },
      ])
    },
    [containerMemoryUsages]
  )

  // CPU使用率の更新
  const updateContainerCpuUsages = useCallback(
    (statsArr: ContainerStats[]): void => {
      let usedCpuUsage = statsArr.map((v) => ({
        containerName: v.name.replace('/', ''),
        usage: computeCpuUsage(v),
      }))
      console.log('usedCpuUsage', usedCpuUsage)
      usedCpuUsage.sort((a, b) => {
        return b.usage - a.usage
      })
      let usedUsage = usedCpuUsage.reduce((acc, curr) => {
        return acc + curr.usage
      }, 0)
      const unusedUsage = 100 - usedUsage
      setContainerCpuUsages([
        ...usedCpuUsage,
        { containerName: 'unused', usage: unusedUsage },
      ])
    },
    [containerCpuUsages]
  )

  const fetchDatas = async () => {
    const activeContainers = await window.dockerApi.get<DockerContainer[]>({
      url: 'containers/json',
    })
    if (activeContainers && activeContainers.length > 0) {
      const containerStats = await Promise.all(
        activeContainers.map((v) =>
          window.dockerApi.get<ContainerStats>({
            url: `containers/${v.id}/stats?stream=0`,
          })
        )
      )
      updateContainerMemoryUsages(containerStats)
      updateContainerCpuUsages(containerStats)
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
      <div className={chartContainer}>
        <Title title="Memory Usage" />
        {memoryUsageChartData !== null && (
          <Doughnut
            type={'doughnut'}
            width={480}
            height={480}
            data={memoryUsageChartData}
            options={{ animation: false }}
            redraw
          />
        )}
      </div>
      {/** 横幅スペース開ける */}
      <Spacer space={24} />
      <div className={chartContainer}>
        <Title title="CPU Usage" />
        {cpuUsageChartData !== null && (
          <Doughnut
            type={'doughnut'}
            width={480}
            height={480}
            data={cpuUsageChartData}
            options={{ animation: false }}
            redraw
          />
        )}
      </div>
    </div>
  )
}

export default Utilizations
