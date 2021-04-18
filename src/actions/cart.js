import axios from 'axios'

export const getCart = user => dispatch => {
  axios.post('cart/get_cart', { user }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_CART', payload: res.data.cart })
    }
  })
}
