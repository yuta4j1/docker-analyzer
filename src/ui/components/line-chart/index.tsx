import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2'

type ContainerMemoryUsagePerMinute = {
  [key: string]: {
    minutes: string[]
    containerName: string
    usage: number[]
  }
}

type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
  }[]
}

const LineChart: React.VFC<{
  chartData: ChartData
}> = ({ chartData }) => {
  const chartRef = useRef(null)
  // const createChartData = (): ChartDatasets[] => {
  //   return Object.keys(containerMemoryUsages).map((v) => {
  //     const label = containerMemoryUsages[v].containerName
  //     const data = containerMemoryUsages[v].usage
  //     return {
  //       label,
  //       data,
  //     }
  //   })
  // }
  // const createLabels = (): string[] => {
  //   for (let k of Object.keys(containerMemoryUsages)) {
  //     return containerMemoryUsages[k].minutes
  //   }
  // }
  // const data = () => {
  //   return {
  //     labels: createLabels(),
  //     datasets: createChartData(),
  //   }
  // }
  return (
    <div>
      <Line
        id={'10321'}
        ref={chartRef}
        width={480}
        height={240}
        type={'line'}
        data={chartData}
        options={{ maintainAspectRatio: false, animation: false }}
        redraw
      />
    </div>
  )
}

export default React.memo(LineChart)
