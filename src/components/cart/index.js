import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, PageHeader, List, InputNumber } from 'antd'

import { updateCart, emptyCart } from '../../actions/cart'

class Cart extends React.Component {
  render() {
    const { history, cart, updateCart, emptyCart } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/cart', breadcrumbName: 'Cart' },
    ]
    const listData = []
    cart.items
      .filter(item => item.quantity > 0)
      .forEach(item => {
        listData.push({
          _id: item._id,
          item: item.item,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })
      })

    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space
          style={{ padding: '10px 50px 30px 50px', width: '100%' }}
          direction='vertical'
          size='large'
        >
          <h1>CART</h1>
          {cart.quantity ? (
            <Space style={{ width: '100%' }} direction='vertical' size='large'>
              <List
                bordered
                itemLayout='vertical'
                size='large'
                dataSource={listData}
                renderItem={item => (
                  <List.Item
                    key={item._id}
                    extra={
                      <Space direction='vertical'>
                        <h2>${(item.price * item.quantity).toFixed(2)}</h2>
                        <InputNumber
                          size='large'
                          min={1}
                          max={9}
                          value={item.quantity}
                          onChange={value => updateCart(item.item, value - item.quantity)}
                        />
                        <Button onClick={() => updateCart(item.item, -item.quantity)}>
                          Remove
                        </Button>
                      </Space>
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <img
                          style={{ cursor: 'pointer' }}
                          width={180}
                          src={item.image}
                          onClick={() => history.push(`/item/${item.item}`)}
                        />
                      }
                      title={
                        <div
                          style={{ cursor: 'pointer' }}
                          onClick={() => history.push(`/item/${item.item}`)}
                        >
                          {item.title}
                        </div>
                      }
                      description={<div>Unit Price: ${item.price}</div>}
                    />
                  </List.Item>
                )}
              />
              <Space style={{ width: '100%' }} direction='vertical'>
                <h2 style={{ textAlign: 'right' }}>Subtotal: ${cart.price.toFixed(2)}</h2>
                <Space style={{ float: 'right' }}>
                  <Button size='large' onClick={() => emptyCart()}>
                    Empty Cart
                  </Button>
                  <Button
                    style={{ width: 200 }}
                    type='primary'
                    size='large'
                    onClick={() => history.push('/checkout')}
                  >
                    Check out
                  </Button>
                </Space>
              </Space>
            </Space>
          ) : (
            <div>Cart is empty</div>
          )}
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps, { updateCart, emptyCart })(Cart)
