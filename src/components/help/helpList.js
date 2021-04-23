import React from 'react'
import { connect } from 'react-redux'

class HelpList extends React.Component {
  render() {
    return (
      <div>
        <div>Help List</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(HelpList)
