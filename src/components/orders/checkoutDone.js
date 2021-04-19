import React from 'react'
import { connect } from 'react-redux'
import { Space, Button } from 'antd'

class CheckoutDone extends React.Component {
  render() {
    const { history } = this.props
    return (
      <Space>
        <h1>Thank you! Your order has been placed</h1>
        <Button onClick={() => history.push('/orders')}>Order History</Button>
      </Space>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(CheckoutDone)
