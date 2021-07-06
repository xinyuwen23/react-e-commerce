import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, Card, PageHeader } from 'antd'

import { openAddressModal, getAddressList } from '../../actions/address'

class AddressBook extends React.Component {
  componentDidMount() {
    const { getAddressList } = this.props
    getAddressList()
  }

  render() {
    const { addressList, openAddressModal } = this.props
    const routes = [
      { path: '/', breadcrumbName: 'Home' },
      { path: '/addressbook', breadcrumbName: 'Address Book' },
    ]
    return (
      <>
        <PageHeader breadcrumb={{ routes }} />
        <Space
          style={{ padding: '10px 50px 30px 50px', width: '100%' }}
          direction='vertical'
          size='large'
        >
          <h1>Address Book</h1>
          <Space warp size='large'>
            {addressList.map((addr, index) => (
              <Card key={addr._id} title={`Address ${index + 1}`} style={{ width: 300 }}>
                <p>{addr.name}</p>
                <p>{addr.address}</p>
                <p>
                  {addr.city}, {addr.state} {addr.zip}
                </p>
                <p>{addr.region}</p>
              </Card>
            ))}
          </Space>
          <Button
            style={{ width: 200 }}
            size='large'
            type='primary'
            onClick={() => openAddressModal()}
          >
            + New Address
          </Button>
        </Space>
      </>
    )
  }
}

const mapStateToProps = state => ({
  addressList: state.addressList,
})

export default connect(mapStateToProps, { openAddressModal, getAddressList })(AddressBook)
