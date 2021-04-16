import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button } from 'antd'

import { setState } from '../../actions'
import { login } from '../../actions/auth'

class LoginModal extends React.Component {
  state = {
    email: 'admin@ecommerce.com',
    password: 'Q95Zqb5F5OCVTqM9',
  }

  render() {
    const { isLoginModalVisible, setState, login } = this.props
    return (
      <Modal
        title='Login'
        visible={isLoginModalVisible}
        onCancel={() => setState({ isLoginModalVisible: false })}
        footer={[
          <Button
            key='register'
            onClick={() => setState({ isRegisterModalVisible: true, isLoginModalVisible: false })}
          >
            Register
          </Button>,
          <Button key='login' type='primary' onClick={() => login(this.state)}>
            Submit
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

export default connect(mapStateToProps, { setState, login })(LoginModal)
