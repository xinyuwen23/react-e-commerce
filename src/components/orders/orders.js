import React from 'react'
import { connect } from 'react-redux'
import { Space, PageHeader, List, Button } from 'antd'
import moment from 'moment'

import { getOrders } from '../../actions/order'
import { openHelpModal } from '../../actions/help'

class Orders extends React.Component {
  componentDidMount() {
    const { getOrders } = this.props
    window.scrollTo(0, 0)
    getOrders()
  }
  render() {
    const { history, orderList, openHelpModal } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/orders', breadcrumbName: 'Order History' },
    ]
    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space
          style={{ padding: '10px 50px 30px 50px', width: '100%' }}
          direction='vertical'
          size='large'
        >
          <h1>ORDER HISTORY</h1>
          {orderList.length && (
            <Space style={{ width: '100%' }} direction='vertical'>
              <List
                bordered
                itemLayout='vertical'
                dataSource={orderList.reverse()}
                renderItem={order => (
                  <List.Item
                    key={order._id}
                    extra={
                      <Space direction='vertical'>
                        <Button
                          type='primary'
                          style={{ width: 120 }}
                          onClick={() => history.push(`/order/${order._id}`)}
                        >
                          View Order
                        </Button>
                        <Button style={{ width: 120 }} onClick={() => openHelpModal()}>
                          Help Desk
                        </Button>
                      </Space>
                    }
                  >
                    <List.Item.Meta
                      title={
                        <div>
                          ORDER PLACED: {moment(order.createdAt).format('MM-DD-YYYY')}, TOTAL: $
                          {order.total.toFixed(2)}
                        </div>
                      }
                      description={
                        <Space>
                          {order.items.map((item, index) =>
                            item.quantity ? (
                              <div>
                                <img width={50} src={order.items[index].item.images[0]} /> X{' '}
                                {order.items[index].quantity}
                              </div>
                            ) : null
                          )}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Space>
          )}
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderList: state.orderList,
})

export default connect(mapStateToProps, { getOrders, openHelpModal })(Orders)
