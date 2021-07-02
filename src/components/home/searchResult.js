import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Card } from 'antd'

class SearchResult extends React.Component {
  render() {
    const { history, searchResult } = this.props
    return (
      <Space direction='vertical'>
        <h2>SEARCH RESULT</h2>
        <Space style={{ width: '100%', marginBottom: 0 }} wrap size='large'>
          {searchResult.length > 0 &&
            searchResult.map(item => (
              <Card
                key={item._id}
                hoverable
                style={{ width: 200 }}
                cover={<img style={{ padding: 10 }} alt={item.title} src={item.images[0]} />}
                onClick={() => history.push(`/item/${item._id}`)}
              >
                <p id='itemTitle'>{item.title}</p>
                <Card.Meta title={`$${item.price}`} />
              </Card>
            ))}
        </Space>
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  searchResult: state.searchResult,
})

export default connect(mapStateToProps)(withRouter(SearchResult))
