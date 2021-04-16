import axios from 'axios'

export const setState = payload => dispatch => {
  dispatch({ type: 'SET_STATE', payload })
}

export const test = () => () => {
  axios.get('auth/get_user').then(res => {
    console.log(res.data)
  })
}
