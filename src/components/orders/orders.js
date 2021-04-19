import React from 'react'
import { connect } from 'react-redux'
import { Space } from 'antd'

import { getOrders } from '../../actions/order'

class Orders extends React.Component {
  componentDidMount() {
    const { getOrders } = this.props
    getOrders()
  }
  render() {
    const { orderList } = this.props
    return (
      <Space direction='vertical'>
        <h1>Order History</h1>
        <Space direction='vertical'>
          {orderList.length ? (
            orderList.map(order => (
              <div>
                Order ID: {order._id} | Price: ${order.total}
              </div>
            ))
          ) : (
            <div>No order history</div>
          )}
        </Space>
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  orderList: state.orderList,
})

export default connect(mapStateToProps, { getOrders })(Orders)
