import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart: React.VFC<{}> = () => {
  const data = () => {
    return {
      datasets: [
        {
          data: [2, 5],
        },
        {
          data: [8, 10],
        },
      ],
    }
  }
  return (
    <div>
      <Line type={'line'} data={data()} redraw />
    </div>
  )
}

export default React.memo(LineChart)
