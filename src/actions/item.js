import axios from 'axios'
import { message } from 'antd'
import validator from 'validator'

export const openUploadModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isUploadModalVisible: true } })
}

export const closeUploadModal = uploadModal => dispatch => {
  uploadModal.setState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    fileList: [],
  })
  dispatch({ type: 'SET_STATE', payload: { isUploadModalVisible: false } })
}

export const getAllItems = () => dispatch => {
  axios.get('item/list').then(res => {
    if (res.status === 200) {
      dispatch({ type: 'GET_ALL_ITEMS', payload: res.data })
    }
  })
}

export const getFilteredItemList = category => dispatch => {
  axios.post('item/filter_items', { category }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_ITEM_LIST', payload: res.data.itemList })
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

export const uploadItem = uploadModal => dispatch => {
  const { title, description, price, quantity, category, fileList } = uploadModal.state
  let images = []
  if (!title || !description || !price || !quantity || !category || !fileList[0]) {
    message.error('All fields are required')
  } else if (!validator.isNumeric(price) || price < 0) {
    message.error('Price must be numeric and larger or equal to 0')
  } else if (!validator.isInt(quantity) || quantity < 0) {
    message.error('Quantity must be integer and larger or equal to 0')
  } else {
    uploadImages(fileList, images)
    setTimeout(() => {
      axios
        .post('item/upload_item', { title, description, price, quantity, category, images })
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            dispatch({ type: 'UPLOAD_ITEM' })
            message.success(res.data.message)
            uploadModal.setState({
              title: '',
              description: '',
              price: '',
              quantity: '',
              category: '',
              fileList: [],
            })
          }
        })
    }, 5000)
  }
}

export const uploadImages = (fileList, images) => {
  fileList.forEach(file => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    const options = {
      method: 'POST',
      body: formData,
    }
    return fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, options)
      .then(res => res.json())
      .then(res => {
        images.push(res.secure_url)
      })
      .catch(err => console.log(err))
  })
}
