import React from 'react'
import { styled } from '@linaria/react'
import { ContainerStatus } from '../../../types/docker/container'

const badgeColor = (status: ContainerStatus): string => {
  switch (status) {
    case 'running':
      return '#07BF63'
    case 'exited':
      return '#7C7C7C'
    default:
      return ''
  }
}

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 1.2rem;
  border-radius: 20px;
`

const toUpper = (str: string): string => {
  return str
    .split('')
    .map((v, i) => {
      if (i === 0) {
        return v.toUpperCase()
      } else {
        return v
      }
    })
    .join('')
}

const ContainerStatusBadge: React.VFC<{ status: ContainerStatus }> = ({
  status,
}) => {
  return (
    <BadgeWrapper style={{ background: badgeColor(status) }}>
      <p>{toUpper(status)}</p>
    </BadgeWrapper>
  )
}

export default ContainerStatusBadge
