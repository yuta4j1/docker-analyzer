import React from 'react'
import { styled } from '@linaria/react'
import Colors from '../../../consts/color'

const BadgeWrapper = styled.div`
  display: flex;
  color: ${Colors.white};
  font-size: 0.7rem;
`

const BadgeTitle = styled.div`
  border: none;
  border-radius: 4px 0 0 4px;
  background-color: #9b97f4;
  padding: 2px 8px;
`

const BadgeValue = styled.div`
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: ${Colors.black};
  padding: 2px 12px;
`

const SizeBadge: React.VFC<{}> = ({}) => {
  return (
    <BadgeWrapper>
      <BadgeTitle>
        <span>Size</span>
      </BadgeTitle>
      <BadgeValue>12Kbyte</BadgeValue>
    </BadgeWrapper>
  )
}

export default SizeBadge
