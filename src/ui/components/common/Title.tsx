import React from 'react'
import { css } from '@linaria/core'

const style = css`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 300;
`

const Title: React.VFC<{ title: string }> = ({ title }) => {
  return <h2 className={style}>{title}</h2>
}

export default Title
