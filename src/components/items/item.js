import React from 'react'
import { connect } from 'react-redux'
import { Space, Button } from 'antd'

import { getItem } from '../../actions/item'
import { updateCart, emptyCart } from '../../actions/cart'

class Item extends React.Component {
  componentDidMount() {
    const { _id } = this.props.match.params
    const { getItem } = this.props
    getItem(_id)
  }

  render() {
    const { item, updateCart, emptyCart } = this.props
    return (
      <Space direction='vertical'>
        <div>Item Page</div>
        <div>Title: {item.title}</div>
        <div>Price: {item.price}</div>
        <div>Seller: {item.seller}</div>
        <Space>
          <Button onClick={() => updateCart(item._id, 1)}>Add 1 to Cart</Button>
          <Button onClick={() => updateCart(item._id, -1)}>Remove 1 from Cart</Button>
          <Button onClick={() => emptyCart()}>Empty Cart</Button>
        </Space>
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
})

export default connect(mapStateToProps, { getItem, updateCart, emptyCart })(Item)
