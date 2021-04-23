import React from 'react'
import { connect } from 'react-redux'
import { Space, Button } from 'antd'

class Cart extends React.Component {
  render() {
    const { history, cart } = this.props
    return (
      <Space direction='vertical'>
        <div>Cart</div>
        {cart.items.length ? (
          <Space direction='vertical'>
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
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps, null)(Cart)
