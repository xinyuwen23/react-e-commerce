import React from 'react'
import { connect } from 'react-redux'
import { Space, PageHeader, List } from 'antd'

import { getOrders } from '../../actions/order'

class Orders extends React.Component {
  componentDidMount() {
    const { getOrders } = this.props
    getOrders()
  }
  render() {
    const { history, orderList } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/orders', breadcrumbName: 'Order History' },
    ]
    const listData = []
    orderList.forEach(order => {
      listData.push({
        _id: order._id,
        total: order.total,
        createdAt: order.createdAt,
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
          <h1>ORDER HISTORY</h1>
          <Space direction='vertical'>
            {orderList.length &&
              orderList.map(order => (
                <List
                  bordered
                  itemLayout='vertical'
                  // size='large'
                  dataSource={listData}
                  renderItem={order => (
                    <List.Item
                      key={order._id}
                      extra={
                        <Space direction='vertical'>
                          <h2>${order.total.toFixed(2)}</h2>
                          <InputNumber
                            size='large'
                            min={1}
                            max={9}
                            value={order.quantity}
                            onChange={value => updateCart(order.item, value - order.quantity)}
                          />
                          <Button onClick={() => updateCart(order.item, -order.quantity)}>
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
                            src={order.image}
                            onClick={() => history.push(`/item/${order.item}`)}
                          />
                        }
                        title={
                          <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => history.push(`/item/${order.item}`)}
                          >
                            {order.title}
                          </div>
                        }
                        description={<div>Unit Price: ${order.price}</div>}
                      />
                    </List.Item>
                  )}
                />
              ))}
          </Space>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderList: state.orderList,
})

export default connect(mapStateToProps, { getOrders })(Orders)
