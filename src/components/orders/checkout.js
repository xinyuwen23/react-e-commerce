import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, Card, Radio, PageHeader, Divider, Row, Col } from 'antd'

import { openAddressModal, getAddressList } from '../../actions/address'
import { createOrder } from '../../actions/order'

class Checkout extends React.Component {
  state = {
    shippingCost: 0,
    address: '',
  }

  componentDidMount() {
    const { getAddressList } = this.props
    window.scrollTo(0, 0)
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
        {cart && addressList && (
          <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
            <h1>CHECKOUT</h1>
            <Divider />
            <Space style={{ width: '100%' }} direction='vertical'>
              <Row>
                <Col span={12}>
                  <h2>CART</h2>
                </Col>
                <Col span={12}>
                  <Button style={{ float: 'right' }} onClick={() => history.push('/cart')}>
                    Edit
                  </Button>
                </Col>
              </Row>
              <div>
                Subtotal: ${cart.price} | Items: {cart.quantity}
              </div>
              <Space style={{ width: '100%' }} wrap size='large'>
                {cart.items
                  .filter(item => item.quantity > 0)
                  .map(item => (
                    <div key={item.item}>
                      <img
                        width={120}
                        src={item.image}
                        onClick={() => history.push(`/item/${item._id}`)}
                      />{' '}
                      X {item.quantity}
                    </div>
                  ))}
              </Space>
            </Space>
            <Divider />
            <Space direction='vertical' size='large'>
              <h2>SHIPPING ADDRESS</h2>
              <div>Please choose your address</div>
              <Space wrap size='large'>
                {addressList.map((addr, index) => (
                  <Card
                    key={addr._id}
                    title={`Address ${index + 1}`}
                    style={
                      this.state.address === addr._id
                        ? { width: 300, outline: 'solid', outlineColor: 'red', cursor: 'pointer' }
                        : { width: 300, cursor: 'pointer' }
                    }
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
              <h2>SHIPPING METHOD</h2>
              <Radio.Group
                onChange={e => this.setState({ shippingCost: e.target.value })}
                value={this.state.shippingCost}
              >
                <Radio style={radioStyle} value={10}>
                  Express Delivery (+$10)
                </Radio>
                <Radio style={radioStyle} value={0}>
                  Regular Shipping (Free)
                </Radio>
              </Radio.Group>
            </Space>
            <Divider />
            <Space direction='vertical' size='large'>
              <h2>PAYMENT</h2>
              <Radio.Group value='dummy'>
                <Radio style={radioStyle} value={'dummy'}>
                  Dummy Credit Card
                </Radio>
              </Radio.Group>
            </Space>
            <Divider />
            <Space direction='vertical'>
              <h2>ORDER SUMMARY</h2>
              <p>Subtotal: ${cart.price.toFixed(2)}</p>
              <p>Shipping Fees: ${this.state.shippingCost.toFixed(2)}</p>
              <h3>Total: ${(cart.price + this.state.shippingCost).toFixed(2)}</h3>
            </Space>
            <Divider />
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
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  addressList: state.addressList,
})

export default connect(mapStateToProps, { openAddressModal, getAddressList, createOrder })(Checkout)
