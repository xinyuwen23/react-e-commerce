import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, PageHeader, Divider } from 'antd'

import { getOrder } from '../../actions/order'
import { openHelpModal } from '../../actions/help'

class Order extends React.Component {
  componentDidMount() {
    const { _id } = this.props.match.params
    const { getOrder } = this.props
    window.scrollTo(0, 0)
    getOrder(_id)
  }
  render() {
    const { user, order, openHelpModal } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/orders', breadcrumbName: 'Order History' },
      { path: 'order', breadcrumbName: `Order #${order._id}` },
    ]
    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        {order && (
          <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
            <h1>ORDER SUMMARY</h1>
            <Space direction='vertical'>
              <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
              <p>Shipping Fees: ${order.shippingCost.toFixed(2)}</p>
              <h3>Total: ${order.total.toFixed(2)}</h3>
            </Space>
            <Divider />
            <Space direction='vertical'>
              <h2>PRODUCTS</h2>
              <Space style={{ width: '100%' }} wrap size='large'>
                {order.items
                  .filter(item => item.quantity > 0)
                  .map(item => (
                    <div key={item.item}>
                      <img width={120} src={item.item.images[0]} /> X {item.quantity}
                    </div>
                  ))}
              </Space>
            </Space>
            <Divider />
            <Space direction='vertical' size='large'>
              <h2>SHIPPING ADDRESS</h2>
              <Space direction='vertical'>
                <div>{order.address.name}</div>
                <div>{order.address.address}</div>
                <div>
                  {order.address.city}, {order.address.state} {order.address.zip}
                </div>
                <div>{order.address.region}</div>
              </Space>
            </Space>
            <Divider />
            <Space direction='vertical' size='large'>
              <h2>PAYMENT</h2>
              <div>DUMMY CREDIT CARD</div>
            </Space>
            <Divider />
            {order.user === user._id && (
              <Space direction='vertical' size='large'>
                <Button style={{ width: 150 }} type='primary' onClick={() => openHelpModal()}>
                  Help Desk
                </Button>
              </Space>
            )}
          </Space>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  order: state.order,
})

export default connect(mapStateToProps, { getOrder, openHelpModal })(Order)
