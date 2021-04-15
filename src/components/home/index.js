import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { setState } from '../../actions'

class Home extends React.Component {
  render() {
    const { setState } = this.props
    return (
      <div>
        <div>Home Page</div>
        <Button onClick={() => setState({ showRegisterModal: true })}>Register</Button>
        <Button onClick={() => setState({ showLoginModal: true })}>Login</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { setState })(Home)
