import React, { useLayoutEffect, useState } from 'react'
import LineChart from './line-chart'
import ContainerInfo from './container-info'
import { DockerContainer } from '../../types/docker'

const App = () => {
  const [containers, setContainers] = useState<DockerContainer[]>([])

  useLayoutEffect(() => {
    let unmounted = false
    ;(async () => {
      window.dockerApi
        .invoke('My test arguments.')
        .then((cnts: DockerContainer[]) => {
          if (cnts && cnts.length > 0) {
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
