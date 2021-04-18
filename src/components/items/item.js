import React from 'react'
import { connect } from 'react-redux'

import { getItem } from '../../actions/item'

class Item extends React.Component {
  componentDidMount() {
    const { _id } = this.props.match.params
    const { getItem } = this.props
    getItem(_id)
  }

  render() {
    const { item } = this.props
    return (
      <div>
        <div>Item Detail</div>
        <div>Title: {item.title}</div>
        <div>Price: {item.price}</div>
        <div>Seller: {item.seller}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
})

export default connect(mapStateToProps, { getItem })(Item)
