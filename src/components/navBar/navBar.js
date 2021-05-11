import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
} from '@ant-design/icons'

import { openLoginModal, logout } from '../../actions/auth'
import { getFilteredItemList } from '../../actions/item'

class NavBar extends React.Component {
  render() {
    const { history, user, cart, openLoginModal, logout, getFilteredItemList } = this.props
    const categoryList = [{ name: 'COVID-19' }, { name: 'Drinks' }, { name: 'Household' }]
    return (
      <Menu mode='horizontal' theme='dark'>
        <Menu.Item key='home' onClick={() => history.push('/')}>
          <HomeOutlined />
          Home
        </Menu.Item>
        <Menu.SubMenu
          key='category'
          icon={<MenuOutlined />}
          title='Category'
          onTitleClick={() => history.push('/category')}
        >
          {categoryList.map(category => (
            <Menu.Item
              key={category.name}
              onClick={() => {
                history.push(`/category/${category.name}`)
                getFilteredItemList(category.name)
              }}
            >
              {category.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        {!user._id && (
          <Menu.Item style={{ float: 'right' }} key='login' onClick={() => openLoginModal()}>
            <LoginOutlined />
            Login
          </Menu.Item>
        )}
        {user._id && (
          <Menu.SubMenu
            style={{ float: 'right' }}
            key='account'
            icon={<UserOutlined />}
            title={user.name}
          >
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
          <ShoppingCartOutlined />
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
