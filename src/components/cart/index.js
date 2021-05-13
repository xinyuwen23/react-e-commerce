import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, List } from 'antd'

import { emptyCart } from '../../actions/cart'

class Cart extends React.Component {
  render() {
    const { history, cart, emptyCart } = this.props
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ]

    return (
      <Space direction='vertical'>
        <h1>CART</h1>
        {cart.quantity ? (
          <Space direction='vertical'>
            <List
              size='large'
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            {cart.items.map(item => (
              <Space key={item.item}>
                <div>Item: {item.title}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: {item.price}</div>
              </Space>
            ))}
            <div>Quantity: {cart.quantity}</div>
            <div>Total: {cart.price}</div>
          </Space>
        ) : (
          <div>Cart is empty</div>
        )}
        {cart.quantity > 0 ? (
          <Button onClick={() => history.push('/checkout')}>Check out</Button>
        ) : (
          <Button onClick={() => history.push('/checkout')} disabled>
            Check out
          </Button>
        )}
        <Button onClick={() => emptyCart()}>Empty Cart</Button>
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps, { emptyCart })(Cart)
