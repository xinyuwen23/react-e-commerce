import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './config/messageConfig'

import Home from './components/home'
import LoginModal from './components/auth/loginModal'
import RegisterModal from './components/auth/registerModal'

class App extends React.Component {
  render() {
    return (
      <div>
        {/* OtherComponents */}
        <LoginModal />
        <RegisterModal />
        <div>
          <Switch>
            <Route component={Home} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
