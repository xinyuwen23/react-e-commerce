import React from 'react'
import { connect } from 'react-redux'
import { PageHeader } from 'antd'

class OrderPlaced extends React.Component {
  render() {
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/orderplaced', breadcrumbName: 'Order Placed' },
    ]
    return (
      <>
        <PageHeader breadcrumb={{ routes }} />
        <div id='orderPlaced'>
          <div style={{ fontSize: 36, fontWeight: 'bold', marginTop: 100 }}>THANK YOU!</div>
          <div style={{ fontSize: 24 }}>Your order has been placed</div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(OrderPlaced)
