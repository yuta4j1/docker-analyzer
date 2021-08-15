import React from 'react'
import { styled } from '@linaria/react'
import ContainerInfo from './container-info'
import Utilizations from './utilizations'
import SideBar from './SideBar'
import Spacer from './common/Spacer'

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
  return (
    <ContentWrapper>
      <SideBar />
      <div>
        <UtilizationWrapper>
          <Utilizations />
        </UtilizationWrapper>
        <Spacer space={24} />
        <ContainerInfoWrapper>
          <ContainerInfo />
        </ContainerInfoWrapper>
      </div>
    </ContentWrapper>
  )
}

export default App
