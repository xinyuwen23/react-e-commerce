import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Button, PageHeader, Divider, Table, Tag } from 'antd'
import moment from 'moment'

import { openUploadModal, getSellerItemList } from '../../actions/item'

class Seller extends React.Component {
  componentDidMount() {
    const { history, user, getSellerItemList } = this.props
    if (!user.isSeller) history.push('/')
    getSellerItemList()
  }

  render() {
    const { history, sellerItemList, openUploadModal } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/seller', breadcrumbName: 'Seller' },
    ]
    const tagColor = {
      Household: 'red',
      Drinks: 'blue',
      'COVID-19': 'green',
    }

    const columns = [
      {
        title: 'Product',
        dataIndex: 'images',
        key: 'product',
        render: (images, record) => (
          <img
            style={{ cursor: 'pointer' }}
            width={100}
            src={images[0]}
            onClick={() => history.push(`/item/${record._id}`)}
          />
        ),
      },
      {
        title: 'Start Selling',
        dataIndex: 'createdAt',
        key: 'start_selling',
        sorter: (a, b) => a.createdAt > b.createdAt,
        render: createdAt => <div>{moment(createdAt).format('MM-DD-YYYY')}</div>,
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
        render: category => <Tag color={tagColor[category]}>{category}</Tag>,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        render: price => <div>${price.toFixed(2)}</div>,
      },
      {
        title: 'Inventory',
        dataIndex: 'quantity',
        key: 'inventory',
        sorter: (a, b) => a.quantity - b.quantity,
      },
      {
        title: 'Sold',
        dataIndex: 'sold',
        key: 'sold',
        sorter: (a, b) => a.sold - b.sold,
      },
      {
        title: 'Gross',
        key: 'gross',
        sorter: (a, b) => a.sold * a.price - b.sold * b.price,
        render: (text, record) => <div>${(record.sold * record.price).toFixed(2)}</div>,
      },
    ]

    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
          <h1>SELLER</h1>
          <Button onClick={() => openUploadModal()}>New Item</Button>
          <Divider />
          <Space style={{ width: '100%' }} direction='vertical' size='large'>
            <h2>My Products</h2>
            <Table columns={columns} dataSource={sellerItemList} />
          </Space>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  sellerItemList: state.sellerItemList,
})

export default connect(mapStateToProps, { openUploadModal, getSellerItemList })(withRouter(Seller))
