import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import NavBar from './components/navBar/navBar'
import Footer from './components/navBar/footer'
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
import OrderPlaced from './components/orders/orderPlaced'
import HelpModal from './components/help/helpModal'
import Seller from './components/seller'
import Admin from './components/admin'
import AllItems from './components/admin/allItems'
import AllHelps from './components/admin/allHelps'
import HelpContent from './components/help/helpContent'

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
        <HelpContent />
        <div id='main'>
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
            <Route exact path='/orderplaced' component={OrderPlaced} />
            <Route exact path='/seller' component={Seller} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/admin/products' component={AllItems} />
            <Route exact path='/admin/helps' component={AllHelps} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getUser, getAllItems })(App)
