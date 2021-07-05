import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

import { GoogleLogin } from 'react-google-login'

import { openRegisterModal, closeLoginModal, login, handleGoogleLogin } from '../../actions/auth'

class LoginModal extends React.Component {
  state = {
    email: 'admin@ecommerce.com',
    password: 'admin',
  }

  render() {
    const { isLoginModalVisible, openRegisterModal, closeLoginModal, login, handleGoogleLogin } =
      this.props
    return (
      <Modal
        title='Login'
        visible={isLoginModalVisible}
        onCancel={() => closeLoginModal()}
        footer={[
          <Button key='register' onClick={() => openRegisterModal()}>
            Create a new account
          </Button>,

          <GoogleLogin
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{ backgroundColor: 'rgb(46, 54, 70)', color: 'rgb(245, 245, 245)' }}
              >
                <GoogleOutlined />
                Log in with Google
              </Button>
            )}
            key='googleLogin'
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Login with Google'
            onSuccess={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
          />,

          <Button key='login' type='primary' onClick={() => login(this.state)}>
            Log in
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Input
            placeholder='Email'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input.Password
            placeholder='Password'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isLoginModalVisible: state.isLoginModalVisible,
})

export default connect(mapStateToProps, {
  openRegisterModal,
  closeLoginModal,
  login,
  handleGoogleLogin,
})(LoginModal)
