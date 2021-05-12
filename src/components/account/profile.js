import React from 'react'
import { connect } from 'react-redux'
import { Space, Row, Col } from 'antd'

class Profile extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Row>
        <Col span={5} />
        <Col span={14}>
          <Space
            style={{ padding: '40px 100px 40px 100px', width: '100%' }}
            direction='vertical'
            size='large'
          >
            <h1>PROFILE</h1>
            <Space
              style={{
                width: '100%',
                padding: '50px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.1)',
                fontSize: 16,
              }}
              direction='vertical'
              size='large'
            >
              <Row>
                <Col style={{ textAlign: 'right', fontWeight: 'bold' }} span={6}>
                  Email
                </Col>
                <Col span={1} />
                <Col>{user.email}</Col>
              </Row>
              <Row>
                <Col style={{ textAlign: 'right', fontWeight: 'bold' }} span={6}>
                  Name
                </Col>
                <Col span={1} />
                <Col>{user.name}</Col>
              </Row>
            </Space>
          </Space>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  isUserLoaded: state.isUserLoaded,
  user: state.user,
})

export default connect(mapStateToProps, null)(Profile)
