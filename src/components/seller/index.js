import React from 'react'
import { connect } from 'react-redux'

class Seller extends React.Component {
  render() {
    return (
      <div>
        <div>Seller Page</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(Seller)
