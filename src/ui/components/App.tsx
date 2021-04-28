import React, { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    window.dockerApi.invoke('My test arguments.').then((res) => {
      console.log('res', res)
    })
  }, [])
  return (
    <div>
      <h2>{'Hello, World!'}</h2>
      <p>{'test'}</p>
    </div>
  )
}

export default App
