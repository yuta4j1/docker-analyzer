import React, { useState, useLayoutEffect, useRef } from 'react'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { MdLabelOutline } from 'react-icons/md'
import { BiX } from 'react-icons/bi'
import type {
  DockerContainer,
  ContainerStatus,
} from '../../../types/docker/container'
import Colors from '../../../consts/color'
import ContainerStatusBadge from '../container-info/ContainerStatusBadge'
// import SizeBadge from './SizeBadge'

const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #1c1c1c;
  opacity: 0.6;
  z-index: 4;
`

const ModalContainerWrapper = styled.div`
  position: fixed;
  top: 20;
  width: 60%;
  height: auto;
  border: 0.5px solid #797979;
  border-radius: 10px;
  background: #141e2f;
  padding: 1rem 1.5rem;
  color: ${Colors.white};
  z-index: 5;
`

const header = css`
  display: flex;
  justify-content: flex-end;
`

const ContainerTitleSection = styled.div`
  display: flex;
`

const containerName = css`
  color: ${Colors.white};
  font-weight: 200;
  font-size: 1.1rem;
  margin: 0;
`

const containerId = css`
  color: #b9b9b9;
  margin: 4px 0;
`

const badgeWrapper = css`
  margin: 4px 0 4px 1rem;
`

const CommandSection = styled.div`
  background-color: ${Colors.black};
  border: none;
  border-radius: 8px;
  padding: 1rem 1.5rem;
`

const commandText = css`
  font-size: 0.8rem;
`

const LabelSection = styled.div`
  display: flex;
  margin: 1rem 0;
`

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

const ContainerDetailModal: React.VFC<{
  container: DockerContainer
  onClose: () => void
}> = ({ container, onClose }) => {
  const [halfElSize, setHalfElSize] = useState(0)
  const modalEl = useRef<HTMLDivElement>(null)
  console.log('container', container)
  useLayoutEffect(() => {
    if (modalEl && modalEl.current) {
      const elWidth = modalEl.current.clientWidth
      setHalfElSize(elWidth / 2)
    }
  }, [])
  return (
    <>
      <ModalContainerWrapper
        ref={modalEl}
        style={{ left: `calc(50% - ${halfElSize})` }}
      >
        <div className={header}>
          <BiX size={30} />
        </div>
        <ContainerTitleSection>
          <div>
            <h2 className={containerName}>
              {container.names[0].replace('/', '')}
            </h2>
            <p className={containerId}>{container.id.slice(0, 12)}</p>
          </div>
          <div className={badgeWrapper}>
            <ContainerStatusBadge
              status={convertStatusString(container.state)}
            />
          </div>
        </ContainerTitleSection>
        {/* <SizeBadge /> */}
        <LabelSection>
          <MdLabelOutline size={12} />
        </LabelSection>
        <CommandSection>
          <span className={commandText}>{`$ ${container.command}`}</span>
        </CommandSection>
      </ModalContainerWrapper>
      <Backdrop onClick={onClose} />
    </>
  )
}

export default ContainerDetailModal
