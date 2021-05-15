import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Button, PageHeader } from 'antd'

class Admin extends React.Component {
  render() {
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/seller', breadcrumbName: 'Seller' },
    ]
    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
          <h1>ADMIN</h1>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(withRouter(Admin))
