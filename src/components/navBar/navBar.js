import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  MenuOutlined,
  HomeOutlined,
} from '@ant-design/icons'

import { openLoginModal, logout } from '../../actions/auth'
import { getFilteredItemList } from '../../actions/item'

class NavBar extends React.Component {
  render() {
    const { history, user, cart, openLoginModal, logout, getFilteredItemList } = this.props
    const categoryDropdown = [{ name: 'COVID-19' }, { name: 'Drinks' }, { name: 'Household' }]
    const accountDropdown = [
      { key: 'profile', title: 'Profile' },
      { key: 'orders', title: 'Order History' },
      { key: 'addressbook', title: 'Address Book' },
    ]
    return (
      <Menu mode='horizontal' theme='dark' selectedKeys={'null'}>
        <Menu.SubMenu
          key='home'
          icon={<HomeOutlined />}
          title='Home'
          onTitleClick={() => history.push('/')}
        ></Menu.SubMenu>

        <Menu.SubMenu
          key='categories'
          icon={<MenuOutlined />}
          title='Categories'
          onTitleClick={() => history.push('/category')}
        >
          {categoryDropdown.map(category => (
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
          <Menu.SubMenu
            style={{ float: 'right' }}
            key='login'
            icon={<LoginOutlined />}
            title='Log In'
            onTitleClick={() => openLoginModal()}
          ></Menu.SubMenu>
        )}
        {user._id && (
          <Menu.SubMenu
            style={{ float: 'right' }}
            key='account'
            icon={<UserOutlined />}
            title={user.name}
          >
            {user.isAdmin && (
              <Menu.Item key='admin' onClick={() => history.push('/admin')}>
                Admin
              </Menu.Item>
            )}
            {user.isSeller && (
              <Menu.Item key='seller' onClick={() => history.push('/seller')}>
                Seller
              </Menu.Item>
            )}
            {(user.isSeller || user.isAdmin) && <Menu.Divider />}
            {accountDropdown.map(option => (
              <Menu.Item key={option.key} onClick={() => history.push(`/${option.key}`)}>
                {option.title}
              </Menu.Item>
            ))}

            <Menu.Item key='logout' onClick={() => logout(history)}>
              Log Out
            </Menu.Item>
          </Menu.SubMenu>
        )}

        <Menu.SubMenu
          style={{ float: 'right' }}
          key='cart'
          icon={<ShoppingCartOutlined />}
          title={cart.quantity > 0 ? `Cart (${cart.quantity})` : 'Cart'}
          onTitleClick={() => history.push('/cart')}
        ></Menu.SubMenu>
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
