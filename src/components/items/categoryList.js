import React from 'react'
import { connect } from 'react-redux'
import { Space, Card, PageHeader } from 'antd'

class CategoryList extends React.Component {
  render() {
    const { history } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/category', breadcrumbName: 'Category' },
    ]
    const categoryList = [
      { title: 'COVID-19', icon: require('../../static/img/covid-19.jpg').default },
      { title: 'Drinks', icon: require('../../static/img/drinks.jpg').default },
      { title: 'Household', icon: require('../../static/img/household.png').default },
    ]
    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px' }} direction='vertical'>
          <h1>CATEGORY</h1>
          <Space style={{ width: '100%' }} wrap size='large'>
            {categoryList.map(category => (
              <Card
                key={category.title}
                hoverable
                style={{ width: 350 }}
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

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(CategoryList)
