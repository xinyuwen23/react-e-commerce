import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Button, PageHeader } from 'antd'

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
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
          <h1>SELLER</h1>
          <Space>
            <Button onClick={() => openUploadModal()}>Upload</Button>
          </Space>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { openUploadModal })(withRouter(Seller))
