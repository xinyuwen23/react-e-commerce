import axios from 'axios'
import browserCookies from 'browser-cookies'

export const setState = payload => dispatch => {
  dispatch({ type: 'SET_STATE', payload })
}

export const test = () => () => {
  console.log(browserCookies.get('_id'))
  axios.get('auth/get_user').then(res => {
    console.log(res.data)
  })
}
