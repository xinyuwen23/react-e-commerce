import axios from 'axios'
import browserCookies from 'browser-cookies'
import { message } from 'antd'

export const getCart = () => dispatch => {
  axios.get('cart/get_cart').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_CART', payload: res.data.cart })
    }
  })
}

export const updateCart = (item, quantity) => dispatch => {
  if (!browserCookies.get('_id')) {
    message.warning('Please login')
    dispatch({ type: 'SET_STATE', payload: { isLoginModalVisible: true } })
  } else {
    axios.post('cart/update_cart', { item, quantity }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch({ type: 'GET_CART', payload: res.data.cart })
      }
    })
  }
}

export const emptyCart = () => dispatch => {
  axios.get('cart/empty_cart').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_CART', payload: res.data.cart })
    }
  })
}
