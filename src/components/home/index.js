import React from 'react'
import { connect } from 'react-redux'
import { Space, Button } from 'antd'

import { setState, test } from '../../actions'

class Home extends React.Component {
  render() {
    const { setState, test } = this.props
    return (
      <div>
        <div>Home Page</div>
        <Space>
          <Button onClick={() => setState({ isRegisterModalVisible: true })}>Register</Button>
          <Button onClick={() => setState({ isLoginModalVisible: true })}>Login</Button>
          <Button onClick={() => test()}>Test</Button>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { setState, test })(Home)
