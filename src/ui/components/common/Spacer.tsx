import React from 'react'

const Spacer: React.VFC<{ space: number }> = ({ space }) => {
  return <div style={{ height: `${space}px` }} />
}

export default Spacer
