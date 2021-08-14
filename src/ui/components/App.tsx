import React, { useLayoutEffect, useState } from 'react'
import { styled } from '@linaria/react'
import ContainerInfo from './container-info'
import Utilizations from './utilizations'
import SideBar from './SideBar'
import Spacer from './common/Spacer'
import { DockerContainer } from '../../types/docker'

const ContentWrapper = styled.div`
  display: flex;
`

const UtilizationWrapper = styled.div`
  margin-left: 4rem;
`

const ContainerInfoWrapper = styled.div`
  margin-left: 4rem;
`

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
    <ContentWrapper>
      <SideBar />
      <div>
        <UtilizationWrapper>
          <Utilizations />
        </UtilizationWrapper>
        <Spacer space={24} />
        <ContainerInfoWrapper>
          {containers && containers.length > 0 && (
            <ContainerInfo {...{ containers }} />
          )}
        </ContainerInfoWrapper>
      </div>
    </ContentWrapper>
  )
}

export default App
