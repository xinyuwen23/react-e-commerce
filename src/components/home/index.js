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
        <Button onClick={() => setState({ isRegisterModalVisible: true })}>Register</Button>
        <Button onClick={() => setState({ isLoginModalVisible: true })}>Login</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { setState })(Home)
