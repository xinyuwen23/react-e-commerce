import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button, Upload, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { closeUploadModal, uploadItem } from '../../actions/item'

class UploadModal extends React.Component {
  state = {
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    fileList: [],
  }

  render() {
    const { isUploadModalVisible, closeUploadModal, uploadItem } = this.props
    const uploadProps = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file)
          const newFileList = state.fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }))
        return false
      },
      fileList: this.state.fileList,
    }
    return (
      <Modal
        title='Item Upload'
        visible={isUploadModalVisible}
        onCancel={() => {
          closeUploadModal(this)
        }}
        footer={[
          <Button key='upload' type='primary' onClick={() => uploadItem(this)}>
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
          <Input.TextArea
            rows={4}
            placeholder='Description'
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <Select
            style={{ width: '100%' }}
            placeholder='Category'
            onChange={value => this.setState({ category: value })}
          >
            <Select.Option value='soft-drinks'>Soft Drinks</Select.Option>
            <Select.Option value='tea'>Tea</Select.Option>
          </Select>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isUploadModalVisible: state.isUploadModalVisible,
})

export default connect(mapStateToProps, { closeUploadModal, uploadItem })(UploadModal)
