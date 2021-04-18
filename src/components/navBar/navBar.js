import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'

import { openLoginModal, logout } from '../../actions/auth'

class NavBar extends React.Component {
  render() {
    const { history, openLoginModal, logout } = this.props
    return (
      <Menu mode='horizontal' theme='dark'>
        <Menu.Item key='home' onClick={() => history.push('/')}>
          Home
        </Menu.Item>
        <Menu.Item key='login' onClick={() => openLoginModal()}>
          Login
        </Menu.Item>
        <Menu.SubMenu key='account' title='Account'>
          <Menu.Item key='profile' onClick={() => history.push('/profile')}>
            Profile
          </Menu.Item>
          <Menu.Item key='logout' onClick={() => logout(history)}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key='cart' onClick={() => history.push('/cart')}>
          Cart
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { openLoginModal, logout })(withRouter(NavBar))
