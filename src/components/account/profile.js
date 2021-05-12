import React from 'react'
import { connect } from 'react-redux'
import { Space } from 'antd'

class Profile extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Space style={{ padding: '30px 60px 30px 60px' }} direction='vertical' size='large'>
        <h1>Profile</h1>
        <div>Email: {user.email}</div>
        <div>Name: {user.name}</div>
      </Space>
    )
  }
}

const mapStateToProps = state => ({
  isUserLoaded: state.isUserLoaded,
  user: state.user,
})

export default connect(mapStateToProps, null)(Profile)
