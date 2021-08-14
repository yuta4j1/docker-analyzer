import React from 'react'
import { styled } from '@linaria/react'
import { FaDocker } from 'react-icons/fa'
import Colors from '../../consts/color'

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  border-right: 0.5px solid #4c4e52;
`

const LogoContainer = styled.div`
  margin: 0.8rem 1.1rem;
`

const SideBar = () => {
  return (
    <SideBarContainer>
      <LogoContainer>
        <FaDocker size={34} color={Colors.theme} />
      </LogoContainer>
    </SideBarContainer>
  )
}

export default SideBar
