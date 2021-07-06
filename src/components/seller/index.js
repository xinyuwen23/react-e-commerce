import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Button, PageHeader, Divider, Table, Tag } from 'antd'
import moment from 'moment'

import { openUploadModal, getSellerItemList } from '../../actions/item'

class Seller extends React.Component {
  componentDidMount() {
    const { getSellerItemList } = this.props
    getSellerItemList()
  }

  render() {
    const { history, sellerItemList, openUploadModal } = this.props
    let itemSold = 0
    let totalIncome = 0

    sellerItemList.forEach(item => {
      if (item.sold) {
        itemSold += item.sold
        totalIncome += item.sold * item.price
      }
    })

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
            alt='img'
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
      <>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
          <h1>SELLER PAGE</h1>
          <Button style={{ width: 150 }} size='large' onClick={() => openUploadModal()}>
            Add New Item
          </Button>
          <Divider />
          <Space style={{ width: '100%' }} direction='vertical' size='large'>
            <h2>SUMMARY</h2>
            <div>Products Sold: {itemSold}</div>
            <div>Total Income: ${totalIncome.toFixed(2)}</div>
          </Space>
          <Divider />
          <Space style={{ width: '100%' }} direction='vertical' size='large'>
            <h2>MY PRODUCTS</h2>
            <Table columns={columns} dataSource={sellerItemList} />
          </Space>
        </Space>
      </>
    )
  }
}

const mapStateToProps = state => ({
  sellerItemList: state.sellerItemList,
})

export default connect(mapStateToProps, { openUploadModal, getSellerItemList })(withRouter(Seller))
