import React from 'react'
import { connect } from 'react-redux'

class Profile extends React.Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <div>Profile</div>
        <div>Email: {user.email}</div>
        <div>Name: {user.name}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isUserLoaded: state.isUserLoaded,
  user: state.user,
})

export default connect(mapStateToProps, null)(Profile)
