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

export const createOrder = ({ history, price, items, shippingCost, address }) => dispatch => {
  axios.post('order/create_order', { price, items, shippingCost, address }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch({
        type: 'CREATE_ORDER',
        payload: { orderList: res.data.orderList, cart: res.data.cart },
      })
      history.push('/checkout-done')
    }
  })
}
