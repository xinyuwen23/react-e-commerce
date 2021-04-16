import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, Button } from 'antd'

import { setState, test } from '../../actions'
import { logout } from '../../actions/auth'

class Home extends React.Component {
  render() {
    const { history, setState, test, logout } = this.props
    return (
      <div>
        <div>Home Page</div>
        <Space>
          <Button onClick={() => test()}>Test</Button>
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { setState, test, logout })(withRouter(Home))
