import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button } from 'antd'

import {setState} from '../../actions'

class RegisterModal extends React.Component {
  state = {
    email: '',
    password: '',
    password2: '',
  }

  render() {
    const {showRegisterModal,setState}=this.props
    return (
      <Modal
        title='Register'
        visible={showRegisterModal}
        okText='Register'
        onCancel={() => setState({ showRegisterModal: false })}
        footer={[
          <Button key='register' type='primary' onClick={() => console.log(this.state)}>
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
          <Input.Password
            placeholder='Confirm Password'
            onChange={e => this.setState({ password2: e.target.value })}
          />
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showRegisterModal: state.showRegisterModal,
})

export default connect(mapStateToProps, {setState})(RegisterModal)
