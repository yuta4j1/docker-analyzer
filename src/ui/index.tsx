import React from 'react'
import ReactDOM from 'react-dom'
import { css } from '@linaria/core'
import App from './components/App'

export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: #141e2f;
      font-family: sans-serif;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }
`

ReactDOM.render(<App />, document.querySelector('#root'))
