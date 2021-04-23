import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Card } from 'antd'

import { getFilteredItemList } from '../../actions/item'

class Category extends React.Component {
  componentDidMount() {
    const { category } = this.props.match.params
    const { getFilteredItemList } = this.props
    getFilteredItemList(category)
  }

  render() {
    const { history, itemList } = this.props
    return (
      <Space style={{ width: '100%' }} wrap>
        {itemList.map(item => (
          <Card
            key={item._id}
            hoverable
            style={{ width: 300 }}
            cover={<img alt={item.title} src={item.images[0]} />}
            onClick={() => history.push(`/item/${item._id}`)}
          >
            <Card.Meta title={item.title} description={item.category} />
          </Card>
        ))}
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  itemList: state.itemList,
})

export default connect(mapStateToProps, { getFilteredItemList })(withRouter(Category))
