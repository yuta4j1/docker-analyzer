import React, { useEffect, useState } from 'react'
import { css } from '@linaria/core'
import LineChart from './line-chart'
import ContainerInfo from './container-info'
import { DockerContainer } from '../../types/docker'

const fontStyle = css`
  font-size: 24px;
  color: red;
  font-weight: 1.2rem;
`

const App = () => {
  const [containers, setContainers] = useState<DockerContainer[]>([])

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      window.dockerApi
        .invoke('My test arguments.')
        .then((cnts: DockerContainer[]) => {
          if (cnts && cnts.length > 0) {
            console.log('cnts', cnts)
            console.log('unmounted', unmounted)
            if (!unmounted) {
              setContainers(cnts)
            }
          }
        })
        .catch((err) => console.error(err))
    })()
    return () => {
      unmounted = true
    }
  }, [])
  return (
    <div>
      <div className={fontStyle}>Hello, World!</div>
      <div>
        <LineChart />
      </div>
      <div>
        {containers &&
          containers.length > 0 &&
          containers.map((v, i) => <ContainerInfo key={v.id} container={v} />)}
      </div>
    </div>
  )
}

export default App
