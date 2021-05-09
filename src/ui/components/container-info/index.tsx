import React from 'react'
import { DockerContainer } from '../../../types/docker'

const ContainerInfo: React.VFC<{ container: DockerContainer }> = ({
  container,
}) => {
  return (
    <div>
      <div>{container.id}</div>
      <div>{container.names}</div>
      <div>{container.status}</div>
      <div>{container.image}</div>
    </div>
  )
}

export default ContainerInfo
