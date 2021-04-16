import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import './config/messageConfig'

import Home from './components/home'
import LoginModal from './components/auth/loginModal'
import RegisterModal from './components/auth/registerModal'

import { getUser } from './actions/auth'

class App extends React.Component {
  // componentDidMount() {
  //   const { getUser } = this.props
  //   getUser()
  // }

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

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getUser })(App)
