import React from 'react'
import { connect } from 'react-redux'
import { Space } from 'antd'

class Cart extends React.Component {
  render() {
    const { cart } = this.props
    return (
      <Space direction='vertical'>
        <div>Cart</div>
        {cart.items.length ? (
          cart.items.map(item => (
            <Space>
              <div>Item ID: {item.item}</div>
              <div>Quantity: {item.quantity}</div>
            </Space>
          ))
        ) : (
          <div>Cart is empty</div>
        )}
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps, null)(Cart)
