import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/home'
import Login from './components/login'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Home} />
      </Switch>
    )
  }
}

export default App
