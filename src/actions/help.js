import axios from 'axios'
import { message } from 'antd'

import { uploadImages } from './item'

export const openHelpModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isHelpModalVisible: true } })
}

export const closeHelpModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isHelpModalVisible: false } })
}

export const getHelpList = () => dispatch => {
  axios.get('help/get_helps').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_HELP_LIST', payload: res.data.helpList })
    }
  })
}

export const getHelp = () => dispatch => {
  axios.get('help/get_help').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_HELP', payload: res.data.help })
    }
  })
}

export const createHelp = (helpModal, order) => dispatch => {
  const { action, description, fileList } = helpModal.state
  let images = []
  uploadImages(fileList, images)
  setTimeout(() => {
    axios.post('help/create_help', { order, action, description, images }).then(res => {
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
  }, 5000)
}
