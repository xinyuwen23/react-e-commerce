import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, PageHeader, Table, Divider, Tag } from 'antd'
import moment from 'moment'

import { getAllItems } from '../../actions/item'

class AllItems extends React.Component {
  componentDidMount() {
    const { getAllItems } = this.props
    getAllItems()
  }

  render() {
    const { history, allItems } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/admin', breadcrumbName: 'Admin' },
      { path: '/products', breadcrumbName: 'All Products' },
    ]
    const tagColor = {
      Household: 'red',
      Drinks: 'blue',
      'COVID-19': 'green',
    }
    const product_columns = [
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
      {
        title: 'Seller',
        dataIndex: 'seller',
        key: 'seller',
        sorter: (a, b) => a.seller - b.seller,
        render: seller => seller.name,
      },
    ]

    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        {allItems.length && (
          <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
            <h1>REVIEW PRODUCTS</h1>
            <Divider />
            <Space style={{ width: '100%' }} direction='vertical' size='large'>
              <Table columns={product_columns} dataSource={allItems} />
            </Space>
          </Space>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allItems: state.allItems,
})

export default connect(mapStateToProps, { getAllItems })(withRouter(AllItems))
