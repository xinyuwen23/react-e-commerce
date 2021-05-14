import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, Card, Radio, PageHeader, Divider } from 'antd'

import { openAddressModal, getAddressList } from '../../actions/address'
import { createOrder } from '../../actions/order'

class Checkout extends React.Component {
  state = {
    shippingCost: 0,
    address: '',
  }

  componentDidMount() {
    const { getAddressList } = this.props
    getAddressList()
  }

  render() {
    const { history, cart, addressList, openAddressModal, createOrder } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/checkout', breadcrumbName: 'Checkout' },
    ]
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space
          style={{ padding: '10px 50px 30px 50px', width: '100%' }}
          direction='vertical'
          size='large'
        >
          <h1>CHECKOUT</h1>
          <Divider />
          <Space direction='vertical'>
            <h2>Cart</h2>
            {cart.items.map(item => (
              <Space key={item.item}>
                <div>Item: {item.title}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: ${item.price}</div>
              </Space>
            ))}
          </Space>
          <Divider />
          <Space direction='vertical' size='large'>
            <h2>Shipping Address</h2>
            <Space wrap size='large'>
              {addressList.map((addr, index) => (
                <Card
                  key={addr._id}
                  title={`Address ${index + 1}`}
                  style={{ width: 300 }}
                  onClick={() => this.setState({ address: addr._id })}
                >
                  <p>{addr.name}</p>
                  <p>{addr.address}</p>
                  <p>
                    {addr.city}, {addr.state} {addr.zip}
                  </p>
                  <p>{addr.region}</p>
                </Card>
              ))}
            </Space>
            <Button
              style={{ width: 200 }}
              size='large'
              type='primary'
              onClick={() => openAddressModal()}
            >
              + New Address
            </Button>
          </Space>
          <Divider />
          <Space direction='vertical' size='large'>
            <h2>Shipping Method</h2>
            <Radio.Group
              onChange={e => this.setState({ shippingCost: e.target.value })}
              value={this.state.shippingCost}
            >
              <Radio style={radioStyle} value={9.99}>
                Express Delivery (+$9.99)
              </Radio>
              <Radio style={radioStyle} value={0}>
                Slow Delivery (Free)
              </Radio>
            </Radio.Group>
          </Space>
          <Divider />
          <Space direction='vertical' size='large'>
            <h2>Payment</h2>
            <Radio.Group value='dummy'>
              <Radio style={radioStyle} value={'dummy'}>
                Dummy Credit Card
              </Radio>
            </Radio.Group>
          </Space>
          <Divider />
          <Space direction='vertical'>
            <h2>Order Summary</h2>
            <p>Items: ${cart.price}</p>
            <p>Shipping: ${this.state.shippingCost}</p>
            <h3>Total: ${(cart.price + this.state.shippingCost).toFixed(2)}</h3>
          </Space>
          <Button
            style={{ width: 200 }}
            type='primary'
            size='large'
            onClick={() => {
              createOrder({
                history,
                price: (cart.price + this.state.shippingCost).toFixed(2),
                items: cart.items,
                shippingCost: this.state.shippingCost,
                address: this.state.address,
              })
            }}
          >
            Place Order
          </Button>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  addressList: state.addressList,
})

export default connect(mapStateToProps, { openAddressModal, getAddressList, createOrder })(Checkout)
