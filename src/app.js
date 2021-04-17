import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import './config/messageConfig'

import NavBar from './components/navBar/navBar'
import Home from './components/home'
import LoginModal from './components/auth/loginModal'
import RegisterModal from './components/auth/registerModal'
import Profile from './components/account/profile'
import UploadModal from './components/items/uploadModal'
import Item from './components/items/item'
import ItemList from './components/items/itemList'

import { getUser } from './actions/auth'

class App extends React.Component {
  componentDidMount() {
    const { getUser } = this.props
    getUser()
  }

  render() {
    return (
      <div>
        {/* OtherComponents */}
        <NavBar />
        <LoginModal />
        <RegisterModal />
        <UploadModal />
        <div>
          <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/items' component={ItemList} />
            <Route exact path='/item/:_id' component={Item} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getUser })(App)
