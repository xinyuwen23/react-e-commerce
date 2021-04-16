import axios from 'axios'

export const setState = payload => dispatch => {
  dispatch({ type: 'SET_STATE', payload })
}

export const test = () => () => {
  axios.get('auth/list').then(res => {
    console.log(res)
  })
}
