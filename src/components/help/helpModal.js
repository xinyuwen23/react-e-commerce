import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button, Upload, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { closeHelpModal, createHelp } from '../../actions/help'

class HelpModal extends React.Component {
  state = {
    action: '',
    description: '',
    fileList: [],
  }

  render() {
    const { isHelpModalVisible, order, closeHelpModal, createHelp } = this.props
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
        title='Help Desk'
        visible={isHelpModalVisible}
        onCancel={() => {
          closeHelpModal(this)
        }}
        footer={[
          <Button key='send' type='primary' onClick={() => createHelp(this, order._id)}>
            Submit
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Select
            style={{ width: 200 }}
            placeholder='Choose a Type'
            onChange={value => this.setState({ action: value })}
          >
            <Select.Option value='question'>General Question</Select.Option>
            <Select.Option value='complaint'>Complaint</Select.Option>
            <Select.Option value='return'>Return Item</Select.Option>
          </Select>
          <Input.TextArea
            rows={6}
            placeholder='Description'
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Images (Optional)</Button>
          </Upload>
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isHelpModalVisible: state.isHelpModalVisible,
  order: state.order,
})

export default connect(mapStateToProps, { closeHelpModal, createHelp })(HelpModal)
