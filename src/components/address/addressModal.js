import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button } from 'antd'

import { closeAddressModal, addAddress } from '../../actions/address'

class AddressModal extends React.Component {
  state = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    region: '',
  }

  render() {
    const { isAddressModalVisible, closeAddressModal, addAddress } = this.props
    return (
      <Modal
        title='New Address'
        visible={isAddressModalVisible}
        onCancel={() => closeAddressModal()}
        footer={[
          <Button key='add' type='primary' onClick={() => addAddress(this.state)}>
            Add
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Input
            placeholder='Name'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Input
            placeholder='Address'
            value={this.state.address}
            onChange={e => this.setState({ address: e.target.value })}
          />
          <Space>
            <Input
              placeholder='City'
              value={this.state.city}
              onChange={e => this.setState({ city: e.target.value })}
            />
            <Input
              placeholder='State'
              value={this.state.state}
              onChange={e => this.setState({ state: e.target.value })}
            />
          </Space>
          <Space>
            <Input
              placeholder='Zip'
              value={this.state.zip}
              onChange={e => this.setState({ zip: e.target.value })}
            />
            <Input
              placeholder='Region'
              value={this.state.region}
              onChange={e => this.setState({ region: e.target.value })}
            />
          </Space>
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isAddressModalVisible: state.isAddressModalVisible,
})

export default connect(mapStateToProps, { closeAddressModal, addAddress })(AddressModal)
