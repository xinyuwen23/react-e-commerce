import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, PageHeader, Table, Divider, Tag } from 'antd'

class AllHelps extends React.Component {
  render() {
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/admin', breadcrumbName: 'Admin' },
      { path: '/helps', breadcrumbName: 'All Helps' },
    ]

    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
          <h1>REVIEW HELP REQUESTS</h1>
          <Divider />
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(withRouter(AllHelps))
