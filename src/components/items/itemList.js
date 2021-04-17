import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Card } from 'antd'

import { getItemList } from '../../actions/item'

class ItemList extends React.Component {
  componentDidMount() {
    const { getItemList } = this.props
    getItemList()
  }
  
  render() {
    const { history, itemList } = this.props
    return (
      <Space style={{ width: '100%' }} wrap>
        {itemList.map(item => (
          <Card
            key={item._id}
            hoverable
            style={{ width: '300px' }}
            cover={<img alt={item.title} src='https://images.alphacoders.com/113/1138231.jpg' />}
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

export default connect(mapStateToProps, { getItemList })(withRouter(ItemList))
