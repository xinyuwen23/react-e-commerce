import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'

import { openLoginModal, logout } from '../../actions/auth'
import { getFilteredItemList } from '../../actions/item'

class NavBar extends React.Component {
  render() {
    const { history, user, cart, openLoginModal, logout, getFilteredItemList } = this.props
    return (
      <Menu mode='horizontal' theme='dark'>
        <Menu.Item key='home' onClick={() => history.push('/')}>
          Home
        </Menu.Item>
        <Menu.SubMenu key='category' title='Category'>
          <Menu.ItemGroup key='beverages' title='Beverages'>
            <Menu.Item
              key='soft_drinks'
              onClick={() => {
                history.push('/category/soft-drinks')
                getFilteredItemList('soft-drinks')
              }}
            >
              Soft Drinks
            </Menu.Item>
            <Menu.Item
              key='tea'
              onClick={() => {
                history.push('/category/tea')
                getFilteredItemList('tea')
              }}
            >
              Tea
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        {!user._id && (
          <Menu.Item style={{ float: 'right' }} key='login' onClick={() => openLoginModal()}>
            Login
          </Menu.Item>
        )}
        {user._id && (
          <Menu.SubMenu style={{ float: 'right' }} key='account' title='Account'>
            <Menu.Item key='profile' onClick={() => history.push('/profile')}>
              Profile
            </Menu.Item>
            <Menu.Item key='orders' onClick={() => history.push('/orders')}>
              Order History
            </Menu.Item>
            <Menu.Item key='addressbook' onClick={() => history.push('/addressbook')}>
              Address Book
            </Menu.Item>
            <Menu.Item key='logout' onClick={() => logout(history)}>
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        )}
        <Menu.Item style={{ float: 'right' }} key='cart' onClick={() => history.push('/cart')}>
          Cart {cart.quantity > 0 && `(${cart.quantity})`}
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
})

export default connect(mapStateToProps, { openLoginModal, logout, getFilteredItemList })(
  withRouter(NavBar)
)
