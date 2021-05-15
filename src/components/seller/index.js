import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Button } from 'antd'

import { openUploadModal } from '../../actions/item'

class Seller extends React.Component {
  render() {
    const { openUploadModal } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/seller', breadcrumbName: 'Seller' },
    ]
    return (
      <div>
        <div>Seller Page</div>
        <Space>
          <Button onClick={() => openUploadModal()}>Upload</Button>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { openUploadModal })(withRouter(Seller))
