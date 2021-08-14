import React, { useState } from 'react'
import { styled } from '@linaria/react'
import Title from '../common/Title'
import ContainerInfoRow from './ContainerInfoRow'
import { DockerContainer, Port } from '../../../types/docker'

const Table = styled.div`
  border: 0.5px solid #4c4e52;
  border-radius: 8px;
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2.4rem;
  border-radius: 8px 8px 0 0;
  border-bottom: 0.5px solid #4c4e52;
  background-color: #343639;
  font-size: 0.8rem;
  padding: 0 1rem;
`

const TableContent = styled.div`
  height: 20rem;
  overflow-y: scroll;
`

const LongItem = styled.div`
  margin: 0 1rem 0 0;
  width: 15rem;
  color: #9f9f9f;
`

const Item = styled.div`
  margin: 0 1rem 0 0;
  width: 10rem;
  color: #9f9f9f;
`
const ShortItem = styled.div`
  margin: 0 1rem 0 0;
  width: 2rem;
`

const ContainerInfo: React.VFC<{ containers: DockerContainer[] }> = ({
  containers,
}) => {
  console.log('container info list', containers)

  return (
    <div>
      <Title title="Container" />
      <Table>
        <TableHeader>
          <ShortItem />
          <LongItem>Name / ID</LongItem>
          <Item>Status</Item>
          <Item>Port</Item>
          <LongItem>Image</LongItem>
          <ShortItem />
        </TableHeader>
        <TableContent>
          {containers.map((v, i) => (
            <ContainerInfoRow key={i} container={v} />
          ))}
        </TableContent>
      </Table>
    </div>
  )
}

export default ContainerInfo
