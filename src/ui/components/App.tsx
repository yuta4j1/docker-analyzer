import React, { useLayoutEffect, useState } from 'react'
import ContainerInfo from './container-info'
import Utilizations from './utilizations'
import { DockerContainer } from '../../types/docker'

const App = () => {
  const [containers, setContainers] = useState<DockerContainer[]>([])

  useLayoutEffect(() => {
    let unmounted = false
    ;(async () => {
      window.dockerApi
        .invoke<DockerContainer[]>({ url: 'containers/json?all=1' })
        .then((cnts) => {
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
      <Utilizations />
      <div>
        {containers &&
          containers.length > 0 &&
          containers.map((v, i) => <ContainerInfo key={v.id} container={v} />)}
      </div>
    </div>
  )
}

export default App
