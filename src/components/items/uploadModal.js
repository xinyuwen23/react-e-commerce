import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button } from 'antd'

import { closeUploadModal, upload } from '../../actions/items'

class UploadModal extends React.Component {
  state = {
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  }

  render() {
    const { isUploadModalVisible, closeUploadModal, upload } = this.props
    return (
      <Modal
        title='Upload an Item'
        visible={isUploadModalVisible}
        onCancel={() => closeUploadModal()}
        footer={[
          <Button key='upload' type='primary' onClick={() => upload(this.state)}>
            Upload
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Input
            placeholder='Title'
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <Input
            placeholder='Description'
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <Space>
            <Input
              placeholder='Price'
              value={this.state.price}
              onChange={e => this.setState({ price: e.target.value })}
            />
            <Input
              placeholder='Quantity'
              value={this.state.quantity}
              onChange={e => this.setState({ quantity: e.target.value })}
            />
          </Space>
          <Input
            placeholder='Category'
            value={this.state.category}
            onChange={e => this.setState({ category: e.target.value })}
          />
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isUploadModalVisible: state.isUploadModalVisible,
})

export default connect(mapStateToProps, { closeUploadModal, upload })(UploadModal)
