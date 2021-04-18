import axios from 'axios'
import { message } from 'antd'
import validator from 'validator'

export const openUploadModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isUploadModalVisible: true } })
}

export const closeUploadModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isUploadModalVisible: false } })
}

export const getItemList = () => dispatch => {
  axios.get('item/list').then(res => {
    if (res.status === 200) {
      dispatch({ type: 'GET_ITEM_LIST', payload: res.data })
    }
  })
}

export const getItem = _id => dispatch => {
  axios.post('item/get_item', { _id }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_ITEM', payload: res.data.item })
    }
  })
}

export const uploadItem = ({ title, description, price, quantity, category }) => dispatch => {
  if (!title || !description || !price || !quantity || !category) {
    message.error('All fields are required')
  } else if (!validator.isNumeric(price) || price < 0) {
    message.error('Price must be numeric and larger or equal to 0')
  } else if (!validator.isInt(quantity) || quantity < 0) {
    message.error('Quantity must be integer and larger or equal to 0')
  } else {
    axios.post('item/upload_item', { title, description, price, quantity, category }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch({ type: 'UPLOAD_ITEM' })
        message.success(res.data.message)
      }
    })
  }
}
