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

// コンテナのサイズを適切な単位に変換する
const toAppropriateUtil = (byte: number): string => {
  const kByte = Math.floor(byte / 1024)
  if (kByte > 1024) {
    const mbyte = Math.floor(kByte / 1024)
    return `${mbyte}M`
  } else {
    return `${kByte}K`
  }
}

const SizeBadge: React.VFC<{ byteSize: number }> = ({ byteSize }) => {
  return (
    <BadgeWrapper>
      <BadgeTitle>
        <span>Size</span>
      </BadgeTitle>
      <BadgeValue>{`${toAppropriateUtil(byteSize)}byte`}</BadgeValue>
    </BadgeWrapper>
  )
}

export default SizeBadge
