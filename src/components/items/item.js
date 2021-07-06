import React from 'react'
import { connect } from 'react-redux'
import { message, Space, Button, PageHeader, Image, InputNumber, Row, Col, Tag } from 'antd'
import ReactMarkdown from 'react-markdown'

import { getItem } from '../../actions/item'
import { updateCart } from '../../actions/cart'

class Item extends React.Component {
  state = {
    quantity: 1,
  }

  componentDidMount() {
    const { _id } = this.props.match.params
    const { getItem } = this.props
    getItem(_id)
  }

  render() {
    const { user, item, updateCart } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/category', breadcrumbName: 'Category' },
      { path: `/${item.category}`, breadcrumbName: item.category },
      { path: 'item', breadcrumbName: 'Product Details' },
    ]
    return (
      <>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px' }} direction='vertical'>
          <Row>
            <Col style={{ padding: '0px 70px 0px 90px' }} span={12}>
              {item.images && <Image width='100%' src={item.images[0]} />}
            </Col>
            <Col style={{ padding: '40px 20px 0px 10px' }} span={12}>
              <Space direction='vertical'>
                <div style={{ fontSize: 28, fontWeight: 'bold' }}>{item.title}</div>
                <Space direction='vertical' size='large'>
                  <Tag color='blue'>SELLER: {item.seller}</Tag>
                  <div style={{ fontSize: 32, fontWeight: 'bold' }}>${item.price}</div>
                  <div>
                    <InputNumber
                      size='large'
                      min={1}
                      max={9}
                      value={this.state.quantity}
                      onChange={value => this.setState({ quantity: value })}
                    />
                  </div>
                  <Button
                    type='primary'
                    size='large'
                    onClick={() => {
                      updateCart(item._id, this.state.quantity)
                      if (user._id) {
                        message.success('Added to Cart')
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
          <Space style={{ padding: '0px 100px 0px 100px' }} direction='vertical' size='large'>
            <h2>About This Product</h2>
            <ReactMarkdown>{item.description}</ReactMarkdown>
          </Space>
        </Space>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  item: state.item,
})

export default connect(mapStateToProps, { getItem, updateCart })(Item)
