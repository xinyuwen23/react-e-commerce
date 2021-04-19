import React from 'react'
import { connect } from 'react-redux'
import { Space, Button, Card } from 'antd'

import { openAddressModal, getAddresses } from '../../actions/address'

class AddressBook extends React.Component {
  componentDidMount() {
    const { getAddresses } = this.props
    getAddresses()
  }

  render() {
    const { addressList, openAddressModal } = this.props
    return (
      <Space direction='vertical'>
        <div>Address Book</div>
        <Button onClick={() => openAddressModal()}>New Address</Button>
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
    )
  }
}

const mapStateToProps = state => ({
  addressList: state.addressList,
})

export default connect(mapStateToProps, { openAddressModal, getAddresses })(AddressBook)
