import React, { useState } from 'react'
import { styled } from '@linaria/react'
import ContainerStatusBadge from './ContainerStatusBadge'
import SubMenuModal from './SubMenuModal'
import ContainerDetailModal from '../container-detail-modal'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DockerContainer, Port } from '../../../types/docker/container'
import { ContainerStatus } from '../../../types/docker/container'
import Colors from '../../../consts/color'

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 300;
  height: 3.5rem;
  padding: 1.2rem 0;
  margin: 0 1rem;
  border-bottom: 0.5px solid #4c4e52;
  cursor: pointer;
  position: relative;
`

const LongItem = styled.div`
  margin: 0 1rem 0 0;
  width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
`

const Item = styled.div`
  margin: 0 1rem 0 0;
  width: 10rem;
  color: #ffffff;
`

const ShortItem = styled.div`
  margin: 0 1rem 0 0;
  width: 2rem;
  display: flex;
  justify-content: center;
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
`

const containerPortString = (ports: Port[]): string => {
  if (ports.length > 0) {
    return `${ports[0].publicPort || '-'} / ${ports[0].privatePort || '-'}`
  } else {
    return '-'
  }
}

const convertStatusString = (statusStr: string): ContainerStatus => {
  console.log('statusStr', statusStr)
  switch (statusStr) {
    case 'created':
    case 'restarting':
    case 'running':
    case 'removing':
    case 'paused':
    case 'exited':
    case 'dead':
      return statusStr
    default:
      return 'unknown'
  }
}

const ContainerInfoRow: React.VFC<{
  container: DockerContainer
  mutateContainerList: () => Promise<any>
}> = ({ container, mutateContainerList }) => {
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showMenuModal, setShowMenuModal] = useState(false)
  console.log('container info', container)

  return (
    <RowWrapper>
      <ShortItem />
      <LongItem onClick={() => setShowDetailModal(true)}>
        {container.names[0].replace('/', '')}
      </LongItem>
      <Item>
        <ContainerStatusBadge status={convertStatusString(container.state)} />
      </Item>
      <Item>{containerPortString(container.ports)}</Item>
      <LongItem>{container.image}</LongItem>
      <ShortItem onClick={() => setShowMenuModal(true)}>
        <BsThreeDotsVertical size={20} color={Colors.white} />
      </ShortItem>
      {showDetailModal && (
        <ContainerDetailModal
          container={container}
          onClose={() => setShowDetailModal(false)}
        />
      )}
      {showMenuModal && (
        <>
          <Backdrop onClick={() => setShowMenuModal(false)} />
          <SubMenuModal
            containerId={container.id}
            status={convertStatusString(container.state)}
            mutateContainerList={mutateContainerList}
          />
        </>
      )}
    </RowWrapper>
  )
}

export default ContainerInfoRow
