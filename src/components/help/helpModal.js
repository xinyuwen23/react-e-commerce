import React from 'react'
import { connect } from 'react-redux'
import { Modal, Space, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { closeHelpModal, createHelp } from '../../actions/help'

class HelpModal extends React.Component {
  state = {
    action: '',
    description: '',
    fileList: [],
  }

  render() {
    const { isHelpModalVisible, closeHelpModal, createHelp } = this.props
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
          <Button key='send' type='primary' onClick={() => createHelp(this)}>
            Send
          </Button>,
        ]}
      >
        <Space style={{ width: '100%' }} direction='vertical'>
          <div>Order: </div>
          <Input
            placeholder='Action'
            value={this.state.action}
            onChange={e => this.setState({ action: e.target.value })}
          />
          <Input
            placeholder='Description'
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
        </Space>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isHelpModalVisible: state.isHelpModalVisible,
})

export default connect(mapStateToProps, { closeHelpModal, createHelp })(HelpModal)
