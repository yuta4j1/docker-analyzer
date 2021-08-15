import React from 'react'
import { styled } from '@linaria/react'
import Colors from '../../../consts/color'
import { VscDebugRestart, VscDebugStop } from 'react-icons/vsc'
import { AiFillDelete } from 'react-icons/ai'
import Spacer from '../common/Spacer'
import type { ContainerStatus } from '../../../types/docker/container'

const SubMenuWrapper = styled.div`
  position: absolute;
  z-index: 3;
  width: 200px;
  border-radius: 8px;
  margin-left: 41rem;
  margin-top: 3rem;
  background-color: ${Colors.white};
`

const MenuRow = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
`

const MenuRowText = styled.p`
  padding-left: 0.7rem;
`

const restartContainer = async (containerId: string) => {
  return window.dockerApi.post<void>({
    url: `containers/${containerId}/restart`,
  })
}

const stopContainer = async (containerId: string) => {
  return window.dockerApi.post<void>({
    url: `containers/${containerId}/stop`,
  })
}

const SubMenuModal: React.VFC<{
  containerId: string
  status: ContainerStatus
  mutateContainerList: () => Promise<any>
}> = ({ containerId, status, mutateContainerList }) => {
  return (
    <SubMenuWrapper>
      <Spacer space={4} />
      {status === 'exited' && (
        <>
          <MenuRow
            onClick={() => {
              restartContainer(containerId)
                .then(() => {
                  mutateContainerList()
                })
                .catch((err) => console.error(err))
            }}
          >
            <VscDebugRestart size={18} />
            <MenuRowText>Restart</MenuRowText>
          </MenuRow>
          <MenuRow>
            <AiFillDelete size={18} />
            <MenuRowText>Delete</MenuRowText>
          </MenuRow>
        </>
      )}
      {status === 'up' && (
        <MenuRow
          onClick={() => {
            stopContainer(containerId)
              .then(() => {
                mutateContainerList()
              })
              .catch((err) => console.error(err))
          }}
        >
          <VscDebugStop size={18} />
          <MenuRowText>Stop</MenuRowText>
        </MenuRow>
      )}
      <Spacer space={4} />
    </SubMenuWrapper>
  )
}

export default SubMenuModal
