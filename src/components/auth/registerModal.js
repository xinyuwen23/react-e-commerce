import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button, Checkbox } from 'antd'

import { openLoginModal, closeRegisterModal, register } from '../../actions/auth'

class RegisterModal extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    password2: '',
    isSeller: false,
  }

  render() {
    const { isRegisterModalVisible, openLoginModal, closeRegisterModal, register } = this.props
    return (
      <Modal
        title='Register'
        visible={isRegisterModalVisible}
        onCancel={() => closeRegisterModal()}
        footer={[
          <Button key='login' onClick={() => openLoginModal()}>
            I already have an account
          </Button>,
          <Button key='register' type='primary' onClick={() => register(this.state)}>
            Register
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Input
            placeholder='Email'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            placeholder='Name'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Input.Password
            placeholder='Password'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Input.Password
            placeholder='Confirm Password'
            value={this.state.password2}
            onChange={e => this.setState({ password2: e.target.value })}
          />
          <Checkbox onChange={e => this.setState({ isSeller: e.target.checked })}>
            I'm a seller
          </Checkbox>
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isRegisterModalVisible: state.isRegisterModalVisible,
})

export default connect(mapStateToProps, {
  openLoginModal,
  closeRegisterModal,
  register,
})(RegisterModal)
