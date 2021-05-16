import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Space, PageHeader, Table, Tag, Button } from 'antd'
import moment from 'moment'

import { openHelpContent, getHelpList } from '../../actions/help'

class AllHelps extends React.Component {
  componentDidMount() {
    const { getHelpList } = this.props
    getHelpList()
  }

  render() {
    const { history, openHelpContent, helpList } = this.props
    helpList.forEach((help, index) => {
      help.index = index + 1
    })
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/admin', breadcrumbName: 'Admin' },
      { path: '/helps', breadcrumbName: 'Helps' },
    ]
    const tagColor = {
      complaint: 'red',
      question: 'blue',
      return: 'orange',
    }
    const columns = [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'type',
        dataIndex: 'action',
        key: 'type',
        render: action => <Tag color={tagColor[action]}>{action.toUpperCase()}</Tag>,
      },
      {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: user => user.name,
      },
      {
        title: 'Order',
        dataIndex: 'order',
        key: 'order',
        render: order => (
          <Button onClick={() => history.push(`/order/${order}`)}>Go to Order</Button>
        ),
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'date',
        render: createdAt => <div>{moment(createdAt).format('MM-DD-YYYY')}</div>,
      },
      {
        title: 'Solved',
        dataIndex: 'isSolved',
        key: 'solved',
        render: (text, record) => {
          if (!record.isSolved) {
            return <Tag color='red'>Not Solved</Tag>
          } else {
            return <Tag color='green'>Solved</Tag>
          }
        },
      },
      {
        title: 'Details',
        key: 'details',
        render: (text, record) => {
          if (!record.isSolved) {
            return <Button onClick={() => openHelpContent(record)}>View</Button>
          }
        },
      },
    ]

    return (
      <div>
        <PageHeader breadcrumb={{ routes }} />
        <Space style={{ padding: '10px 50px 30px 50px', width: '100%' }} direction='vertical'>
          <h1>REVIEW HELP REQUESTS</h1>
          <Table columns={columns} dataSource={helpList} />
        </Space>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  helpList: state.helpList,
})

export default connect(mapStateToProps, { openHelpContent, getHelpList })(withRouter(AllHelps))
