import React from 'react'
import { connect } from 'react-redux'
import { Space } from 'antd'

class Orders extends React.Component {
  render() {
    return (
      <Space direction='vertical'>
        <div>Order History</div>
      </Space>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(Orders)
