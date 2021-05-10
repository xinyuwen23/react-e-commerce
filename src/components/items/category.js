import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Card, PageHeader } from 'antd'

import { getFilteredItemList } from '../../actions/item'

class Category extends React.Component {
  componentDidMount() {
    const { category } = this.props.match.params
    const { getFilteredItemList } = this.props
    getFilteredItemList(category)
  }

  render() {
    const { history, itemList } = this.props
    const { category } = this.props.match.params
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/category', breadcrumbName: 'Category' },
      { path: `/category/${category}`, breadcrumbName: category },
    ]
    return (
      <Space style={{ padding: '10px 50px 30px 50px' }} direction='vertical'>
        <PageHeader title={category.toUpperCase()} breadcrumb={{ routes }} />
        <Space style={{ width: '100%' }} wrap size='large'>
          {itemList.map(item => (
            <Card
              key={item._id}
              hoverable
              style={{ width: 260 }}
              cover={<img style={{ padding: 10 }} alt={item.title} src={item.images[0]} />}
              onClick={() => history.push(`/item/${item._id}`)}
            >
              <Card.Meta title={item.title} description={`$${item.price}`} />
            </Card>
          ))}
        </Space>
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  itemList: state.itemList,
})

export default connect(mapStateToProps, { getFilteredItemList })(withRouter(Category))
