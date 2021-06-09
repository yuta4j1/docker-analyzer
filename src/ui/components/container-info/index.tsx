import React, { useState } from 'react'
import { css } from '@linaria/core'
import { DockerContainer, Port } from '../../../types/docker'

const wrapper = css`
  width: 44rem;
`

const containerInfoRow = css`
  display: flex;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  cursor: pointer;
`

const longItem = css`
  margin: 0 1rem 0 0;
  width: 15rem;
`

const item = css`
  margin: 0 1rem 0 0;
  width: 10rem;
`

const containerPortString = (ports: Port[]): string => {
  if (ports.length > 0) {
    return `${ports[0].publicPort || '-'} -> ${ports[0].privatePort || '-'}`
  } else {
    return '-'
  }
}

const ContainerInfo: React.VFC<{ container: DockerContainer }> = ({
  container,
}) => {
  console.log('container info', container)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  return (
    <div className={wrapper}>
      <div
        className={containerInfoRow}
        onClick={() => {
          setShowDetail(!showDetail)
        }}
      >
        <div className={longItem}>{container.names[0].replace('/', '')}</div>
        <div className={item}>{containerPortString(container.ports)}</div>
        <div className={longItem}>{container.image}</div>
        <div className={item}>{container.status}</div>
      </div>
      {showDetail && (
        <div>
          <div className={item}>id: {container.id}</div>
        </div>
      )}
    </div>
  )
}

export default ContainerInfo
