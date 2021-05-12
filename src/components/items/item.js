import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, PageHeader, Image, InputNumber, Row, Col } from 'antd'
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
    const { item, updateCart } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/category', breadcrumbName: 'Category' },
      { path: `/${item.category}`, breadcrumbName: item.category },
      { path: 'product', breadcrumbName: 'Product' },
    ]
    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px' }} direction='vertical'>
          <Row>
            <Col style={{ padding: '0px 70px 0px 90px' }} span={12}>
              {item.images && <Image width='100%' src={item.images[0]} />}
            </Col>
            <Col style={{ padding: '40px 20px 0px 10px' }} span={12}>
              <Space direction='vertical'>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>{item.title}</div>
                <Space direction='vertical' size='large'>
                  <div style={{ fontSize: 16 }}>Seller: {item.seller}</div>
                  <div style={{ fontSize: 30, fontWeight: 'bold' }}>${item.price}</div>
                  <div>
                    <InputNumber
                      size='large'
                      min={1}
                      max={10}
                      value={this.state.quantity}
                      onChange={value => this.setState({ quantity: value })}
                    />
                  </div>
                  <Button
                    type='primary'
                    size='large'
                    onClick={() => updateCart(item._id, this.state.quantity)}
                  >
                    Add to Cart
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
          <Space direction='vertical' size='large'>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>About This Item</div>
            <ReactMarkdown>{item.description}</ReactMarkdown>
          </Space>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
})

export default connect(mapStateToProps, { getItem, updateCart })(Item)
