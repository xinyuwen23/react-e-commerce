import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import './config/messageConfig'

import NavBar from './components/navBar/navBar'
import Home from './components/home'
import LoginModal from './components/auth/loginModal'
import RegisterModal from './components/auth/registerModal'
import Profile from './components/account/profile'

import { getUser } from './actions/auth'

class App extends React.Component {
  componentDidMount() {
    const { getUser } = this.props
    console.log('componentDidMount')
    getUser()
  }

  render() {
    return (
      <div>
        {/* OtherComponents */}
        <NavBar />
        <LoginModal />
        <RegisterModal />
        <div>
          <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getUser })(App)
