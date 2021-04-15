import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button } from 'antd'

import { setState } from '../../actions'
import { login } from '../../actions/authActions'

class LoginModal extends React.Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { showLoginModal, setState, login } = this.props
    return (
      <Modal
        title='Login'
        visible={showLoginModal}
        onCancel={() => setState({ showLoginModal: false })}
        footer={[
          <Button key='register' type='primary' onClick={() => login(this.state)}>
            Submit
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Input placeholder='Email' onChange={e => this.setState({ email: e.target.value })} />
          <Input.Password
            placeholder='Password'
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showLoginModal: state.showLoginModal,
})

export default connect(mapStateToProps, { setState, login })(LoginModal)
