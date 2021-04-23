import React from 'react'
import { connect } from 'react-redux'
import { Space, Button } from 'antd'

import { getOrder } from '../../actions/order'
import { openHelpModal } from '../../actions/help'

class Order extends React.Component {
  componentDidMount() {
    const { _id } = this.props.match.params
    const { getOrder } = this.props
    getOrder(_id)
  }
  render() {
    const { order, openHelpModal } = this.props
    return (
      <Space direction='vertical'>
        <h1>Order</h1>
        <div>ID: {order._id}</div>
        <div>Items:</div>
        {order.items && order.items.map(item => <div key={item.item}>{item.item}</div>)}
        <div>Total: ${order.total}</div>
        <Button onClick={() => openHelpModal()}>Ask for Help</Button>
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
})

export default connect(mapStateToProps, { getOrder, openHelpModal })(Order)
