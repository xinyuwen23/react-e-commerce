import React from 'react'
import { connect } from 'react-redux'

class Help extends React.Component {
  render() {
    return (
      <div>
        <div>Help Details</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(Help)
