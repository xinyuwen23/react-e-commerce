import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Space, Tag, Divider, Image } from 'antd'
import ReactMarkdown from 'react-markdown'

import { closeHelpContent, markHelp } from '../../actions/help'

class HelpContent extends React.Component {
  render() {
    const { isHelpContentVisible, help, closeHelpContent, markHelp } = this.props
    return (
      <div>
        {help && (
          <Modal
            title='Help Request'
            visible={isHelpContentVisible}
            onCancel={() => closeHelpContent()}
            footer={[
              <Button key='close' onClick={() => closeHelpContent()}>
                Close
              </Button>,
              <Button key='login' type='primary' onClick={() => markHelp(help)}>
                Mark as Solved
              </Button>,
            ]}
          >
            <Space style={{ width: '100%' }} direction='vertical'>
              <Space direction='vertical'>
                <Tag color='red'>{help.action.toUpperCase()}</Tag>
              </Space>
              <Divider />
              <ReactMarkdown>{help.description}</ReactMarkdown>
              <Divider />
              <Image height={200} width={200} alt='img' src={help.images[0]} />
            </Space>
          </Modal>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isHelpContentVisible: state.isHelpContentVisible,
  help: state.help,
})

export default connect(mapStateToProps, { closeHelpContent, markHelp })(HelpContent)
