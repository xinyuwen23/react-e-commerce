import React from 'react'
import { connect } from 'react-redux'
import { Space, Card } from 'antd'

import SearchBar from './searchBar'
import SearchResult from './searchResult'

class Home extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { history, allItems, searchResult } = this.props
    const categoryList = [
      { title: 'COVID-19', icon: require('../../static/img/covid-19.jpg').default },
      { title: 'Drinks', icon: require('../../static/img/drinks.jpg').default },
      { title: 'Household', icon: require('../../static/img/household.png').default },
    ]

    return (
      <div>
        <div id='homeImage'>
          <div style={{ height: 160, paddingTop: 80 }}>E-COMMERCE APP</div>
          <SearchBar />
        </div>
        <Space style={{ padding: '10px 50px 30px 50px' }} direction='vertical'>
          {searchResult.length > 0 && <SearchResult />}
          <h2>RECOMMENDATION</h2>
          <Space style={{ width: '100%' }} wrap size='large'>
            {allItems.length > 0 &&
              allItems
                .sort((i1, i2) => i2.sold - i1.sold)
                .slice(0, 5)
                .map(item => (
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
          <h2 style={{ marginTop: '30px' }}>SHOP BY CATEGORY</h2>
          <Space style={{ width: '100%' }} wrap size='large'>
            {categoryList.map(category => (
              <Card
                key={category.title}
                hoverable
                style={{ width: 300 }}
                cover={<img style={{ padding: 10 }} alt={category.title} src={category.icon} />}
                onClick={() => history.push(`/category/${category.title}`)}
              >
                <Card.Meta title={category.title} />
              </Card>
            ))}
          </Space>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allItems: state.allItems,
  searchResult: state.searchResult,
})

export default connect(mapStateToProps)(Home)
