import axios from 'axios'
import { message } from 'antd'
import validator from 'validator'
import browserCookies from 'browser-cookies'

export const getUser = () => dispatch => {
  axios.get('auth/get_user').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'LOAD_USER', payload: res.data.user })
    }
  })
}

export const login = ({ email, password }) => dispatch => {
  if (!email || !password) {
    message.error('Email and Password are required')
  } else {
    axios.post('auth/login', { email, password }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch({ type: 'LOAD_USER', payload: res.data.user })
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    })
  }
}

export const register = ({ email, name, password, password2, isSeller }) => dispatch => {
  if (!email || !password) {
    message.error('Email and Password are required')
  } else if (!validator.isEmail(email)) {
    message.error('You must enter an email address')
  } else if (password !== password2) {
    message.error('Passwords must be the same')
  } else {
    axios.post('auth/register', { email, name, password, isSeller }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch({ type: 'LOAD_USER', payload: res.data.user })
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    })
  }
}

export const logout = history => dispatch => {
  browserCookies.erase('_id')
  dispatch({ type: 'LOGOUT' })
  history.push('/')
  message.info('Logged out')
}
