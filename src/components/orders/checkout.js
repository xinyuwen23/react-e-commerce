import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, Card, Radio } from 'antd'

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
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    return (
      <Space direction='vertical'>
        <h1>Checkout</h1>
        <hr />
        <Space direction='vertical'>
          <h2>Shipping Address</h2>
          <Button onClick={() => openAddressModal()}>New Address</Button>
          <Space>
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
        </Space>
        <hr />
        <Radio.Group
          onChange={e => this.setState({ shippingCost: e.target.value })}
          value={this.state.shippingCost}
        >
          <Radio style={radioStyle} value={9.99}>
            2-Days Delivery (+$9.99)
          </Radio>
          <Radio style={radioStyle} value={0}>
            Slow Delivery (Free)
          </Radio>
        </Radio.Group>
        <hr />
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
        <hr />
        <Space direction='vertical'>
          <h2>Order Summary</h2>
          <p>Items: ${cart.price}</p>
          <p>Shipping: ${this.state.shippingCost}</p>
          <h4>Order Total: ${(cart.price + this.state.shippingCost).toFixed(2)}</h4>
        </Space>
        <Button
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
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  addressList: state.addressList,
})

export default connect(mapStateToProps, { openAddressModal, getAddressList, createOrder })(Checkout)
