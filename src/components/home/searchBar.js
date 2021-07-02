import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'

import { setState } from '../../actions'
import { searchItems } from '../../actions/item'

class SearchBar extends React.Component {
  render() {
    const { searchText, setState, searchItems } = this.props

    return (
      <>
        <Input.Search
          style={{ width: 500, marginTop: 40 }}
          size='large'
          enterButton
          placeholder='Search for products'
          value={searchText}
          onChange={e => {
            setState({ searchText: e.target.value })
          }}
          onSearch={() => {
            searchItems(searchText)
            setState({ searchText: '' })
          }}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  searchText: state.searchText,
})

export default connect(mapStateToProps, { setState, searchItems })(SearchBar)
