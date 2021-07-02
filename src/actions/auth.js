import axios from 'axios'
import { message } from 'antd'
import validator from 'validator'
import browserCookies from 'browser-cookies'

export const openLoginModal = () => dispatch => {
  dispatch({
    type: 'SET_STATE',
    payload: { isLoginModalVisible: true, isRegisterModalVisible: false },
  })
}

export const closeLoginModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isLoginModalVisible: false } })
}

export const openRegisterModal = () => dispatch => {
  dispatch({
    type: 'SET_STATE',
    payload: { isRegisterModalVisible: true, isLoginModalVisible: false },
  })
}

export const closeRegisterModal = () => dispatch => {
  dispatch({ type: 'SET_STATE', payload: { isRegisterModalVisible: false } })
}

export const getUser = () => dispatch => {
  axios.get('auth/get_user').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_USER', payload: { user: res.data.user, cart: res.data.cart } })
    }
  })
}

export const login =
  ({ email, password }) =>
  dispatch => {
    if (!email || !password) {
      message.error('Email and Password are required')
    } else {
      axios.post('auth/login', { email, password }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch({ type: 'GET_USER', payload: { user: res.data.user, cart: res.data.cart } })
          message.success(res.data.message)
        } else {
          message.error(res.data.message)
        }
      })
    }
  }

export const register =
  ({ email, name, password, password2, isSeller }) =>
  dispatch => {
    if (!email || !password) {
      message.error('Email and Password are required')
    } else if (!validator.isEmail(email)) {
      message.error('You must enter an email address')
    } else if (password !== password2) {
      message.error('Passwords must be the same')
    } else {
      axios.post('auth/register', { email, name, password, isSeller }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch({ type: 'GET_USER', payload: { user: res.data.user, cart: res.data.cart } })
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

export const handleGoogleLogin = googleData => dispatch => {
  axios.post('auth/googleLogin', { tokenId: googleData.tokenId }).then(res => {
    dispatch({ type: 'GET_USER', payload: { user: res.data.user, cart: res.data.cart } })
    message.success(res.data.message)
  })
}
