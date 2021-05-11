import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import NavBar from './components/navBar/navBar'
import Home from './components/home'
import LoginModal from './components/auth/loginModal'
import RegisterModal from './components/auth/registerModal'
import Profile from './components/account/profile'
import UploadModal from './components/items/uploadModal'
import Item from './components/items/item'
import Category from './components/items/category'
import CategoryList from './components/items/categoryList'
import Cart from './components/cart'
import AddressModal from './components/address/addressModal'
import AddressBook from './components/address/addressBook'
import Orders from './components/orders/orders'
import Order from './components/orders/order'
import Checkout from './components/orders/checkout'
import CheckoutDone from './components/orders/checkoutDone'
import HelpModal from './components/help/helpModal'
import Seller from './components/seller'

import { getUser } from './actions/auth'
import { getAllItems } from './actions/item'

class App extends React.Component {
  componentDidMount() {
    const { getUser, getAllItems } = this.props
    getUser()
    getAllItems()
  }

  render() {
    return (
      <div>
        <NavBar />
        <LoginModal />
        <RegisterModal />
        <UploadModal />
        <AddressModal />
        <HelpModal />
        <div>
          <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/category/:category' component={Category} />
            <Route exact path='/category' component={CategoryList} />
            <Route exact path='/item/:_id' component={Item} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/addressbook' component={AddressBook} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/order/:_id' component={Order} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/checkout-done' component={CheckoutDone} />
            <Route exact path='/seller' component={Seller} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getUser, getAllItems })(App)
