import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

class SearchBar extends React.Component {
  render() {
    const { searchBar } = this.props

    return (
      <>
        <Input
          style={{ width: 500 }}
          prefix={<SearchOutlined />}
          size='large'
          placeholder='Search for products'
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  searchBar: state.searchBar,
})

export default connect(mapStateToProps)(SearchBar)
