import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button } from 'antd'

import { openRegisterModal, closeLoginModal, login } from '../../actions/auth'

class LoginModal extends React.Component {
  state = {
    email: 'admin@ecommerce.com',
    password: '912349',
  }

  render() {
    const { isLoginModalVisible, openRegisterModal, closeLoginModal, login } = this.props
    return (
      <Modal
        title='Login'
        visible={isLoginModalVisible}
        onCancel={() => closeLoginModal()}
        footer={[
          <Button key='register' onClick={() => openRegisterModal()}>
            Create a new account
          </Button>,
          <Button key='login' type='primary' onClick={() => login(this.state)}>
            Login
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

export default connect(mapStateToProps, { openRegisterModal, closeLoginModal, login })(LoginModal)
