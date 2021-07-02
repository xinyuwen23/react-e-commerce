import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'

class SearchResult extends React.Component {
  render() {
    return (
      <>
        <div>Search Result</div>
      </>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(SearchResult)
