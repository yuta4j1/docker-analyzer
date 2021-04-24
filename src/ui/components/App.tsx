import React, { useEffect } from 'react'
import { requestHttp } from '../../service/ipc'

const App = () => {
  useEffect(() => {
    requestHttp().then(() => {
      console.log('ok')
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
