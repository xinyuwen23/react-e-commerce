import axios from 'axios'

export const getCart = () => dispatch => {
  axios.get('cart/get_cart').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_CART', payload: res.data.cart })
    }
  })
}

export const updateCart = (item, quantity) => dispatch => {
  axios.post('cart/update_cart', { item, quantity }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_CART', payload: res.data.cart })
    }
  })
}
