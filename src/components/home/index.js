import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Button } from 'antd'

import { setState, test } from '../../actions'
import { logout } from '../../actions/auth'
import { openUploadModal } from '../../actions/items'

class Home extends React.Component {
  render() {
    const { test, openUploadModal } = this.props
    return (
      <div>
        <div>Home Page</div>
        <Space>
          <Button onClick={() => test()}>Test</Button>
          <Button onClick={() => openUploadModal()}>Upload</Button>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { setState, test, logout, openUploadModal })(
  withRouter(Home)
)
