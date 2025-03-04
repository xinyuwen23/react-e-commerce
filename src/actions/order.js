import { message } from 'antd'
import axios from 'axios'

export const getOrders = () => dispatch => {
  axios.get('order/get_orders').then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_ORDER_LIST', payload: res.data.orderList })
    }
  })
}

export const getOrder = _id => dispatch => {
  axios.post('order/get_order', { _id }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: 'GET_ORDER', payload: res.data.order })
    }
  })
}

export const createOrder =
  ({ history, price, items, shippingCost, address }) =>
  dispatch => {
    if (!address) {
      message.error('Please select your address')
    } else {
      axios.post('order/create_order', { price, items, shippingCost, address }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch({
            type: 'CREATE_ORDER',
            payload: {  cart: res.data.cart },
          })
          message.success('Thank you! Your order has been placed.')
          history.push('/orderplaced')
        }
      })
    }
  }
