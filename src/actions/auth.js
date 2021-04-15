import axios from 'axios'
import { message } from 'antd'

export const login = ({ email, password }) => dispatch => {
  if (!email || !password) {
    message.error('Email and Password are required')
  } else {
    axios.post('api/login', { email, password }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'LOAD_USER', payload: res.data.user })
        message.success('Welcome')
      } else {
        message.error(res.data.message)
      }
    })
  }
}

export const register = ({ email, name, password, password2, isSeller }) => dispatch => {
  if (!email || !password) {
    message.error('Email and Password are required')
  } else if (password !== password2) {
    message.error('Passwords must be the same')
  } else {
    axios.post('api/register', { email, name, password, isSeller }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'LOAD_USER', payload: res.data.user })
        message.success('Welcome')
      } else {
        message.error(res.data.message)
      }
    })
  }
}
