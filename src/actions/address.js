import axios from 'axios'

export const openAddressModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isAddressModalVisible: true } })
}

export const closeAddressModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isAddressModalVisible: false } })
}

export const getAddressList = () => dispatch => {
  axios.get('address/get_addresses').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_ADDRESS_LIST', payload: res.data.addressList })
    }
  })
}

export const addAddress = ({ name, address, city, state, zip, region }) => dispatch => {
  axios.post('address/add_address', { name, address, city, state, zip, region }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_ADDRESS_LIST', payload: res.data.addressList })
    }
  })
}
