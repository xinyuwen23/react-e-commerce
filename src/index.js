import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from './app'

const index = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(index, document.getElementById('root'))
