import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button, Checkbox } from 'antd'

import { setState } from '../../actions'
import { register } from '../../actions/authActions'

class RegisterModal extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    password2: '',
    isSeller: false,
  }

  render() {
    const { isRegisterModalVisible, setState, register } = this.props
    return (
      <Modal
        title='Register'
        visible={isRegisterModalVisible}
        onCancel={() => setState({ isRegisterModalVisible: false })}
        footer={[
          <Button
            key='login'
            onClick={() => setState({ isRegisterModalVisible: false, isLoginModalVisible: true })}
          >
            Login
          </Button>,
          <Button key='register' type='primary' onClick={() => register(this.state)}>
            Submit
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Input placeholder='Email' onChange={e => this.setState({ email: e.target.value })} />
          <Input placeholder='Name' onChange={e => this.setState({ name: e.target.value })} />
          <Input.Password
            placeholder='Password'
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Input.Password
            placeholder='Confirm Password'
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

export default connect(mapStateToProps, { setState, register })(RegisterModal)
