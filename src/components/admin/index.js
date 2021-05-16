import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, PageHeader, Button, Divider } from 'antd'

class Admin extends React.Component {
  render() {
    const { history } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/admin', breadcrumbName: 'Admin' },
    ]

    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
          <h1>ADMIN PAGE</h1>
          <Divider />
          <Space direction='vertical'>
            <Button
              style={{ width: 240 }}
              size='large'
              onClick={() => history.push('/admin/products')}
            >
              Show All Products
            </Button>
            <Button
              style={{ width: 240 }}
              size='large'
              onClick={() => history.push('/admin/helps')}
            >
              Show All Help Requests
            </Button>
          </Space>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(withRouter(Admin))
