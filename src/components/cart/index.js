import React from 'react'
import { connect } from 'react-redux'

class Cart extends React.Component {
  render() {
    return (
      <div>
        <div>Cart</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(Cart)
