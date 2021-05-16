import axios from 'axios'
import { message } from 'antd'

export const openHelpModal = order => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isHelpModalVisible: true, order } })
}

export const closeHelpModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isHelpModalVisible: false } })
}

export const openHelpContent = help => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isHelpContentVisible: true, help } })
}

export const closeHelpContent = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isHelpContentVisible: false } })
}

export const getHelpList = () => dispatch => {
  axios.get('help/get_helps').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_HELP_LIST', payload: res.data.helpList })
    }
  })
}

export const markHelp = help => dispatch => {
  axios.post('help/mark_help', { help }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_HELP_LIST', payload: res.data.helpList })
    }
  })
}

export const createHelp = (helpModal, order) => dispatch => {
  const { action, description, fileList } = helpModal.state
  let images = []
  let imageProcessed = 0
  if (!action || !description) {
    message.error('Action and Description are required')
  } else {
    fileList.forEach(file => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      const options = {
        method: 'POST',
        body: formData,
      }
      fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, options)
        .then(res => res.json())
        .then(res => {
          images.push(res.secure_url)
          imageProcessed++
          if (imageProcessed === fileList.length) {
            axios
              .post('help/create_help', { order, action, description, images })
              .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                  dispatch({ type: 'CREATE_HELP' })
                  message.success(res.data.message)
                  helpModal.setState({
                    action: '',
                    description: '',
                    fileList: [],
                  })
                }
              })
              .catch(err => console.log(err))
          }
        })
    })
  }
}
