import axios from 'axios'
import { message } from 'antd'

export const login = ({ email, password }) => dispatch => {
  if (!email || !password) {
    message.error('Email and Password are required')
  } else {
    console.log(`Login | Email: ${email} | Password: ${password}`)
    axios.post('api/login', { email, password }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'LOAD_USER', payload: res.data.user })
        message.success('Logged in')
      } else {
        message.error(res.data.message)
      }
    })
  }
}

export const register = ({ email, name, password, password2, isSeller }) => dispatch => {
  if (!email || !password) {
    message.error('Email and Password are required')
  } else if (password !== password2) {
    message.error('Passwords must be the same')
  } else {
    console.log(
      `Handle Register | Email: ${email} | Name: ${name} | Password: ${password} | isSeller: ${isSeller}`
    )
    // axios.post('api/auth/login', { email, password }).then(res => {
    //   if (res.status === 200 && res.data.code === 0) {
    //     dispatch({ type: 'set_user', value: res.data.user })
    //     history.push('/settings')
    //     message.success('Logged in')
    //   } else {
    //     message.error(res.data.message)
    //   }
    // })
  }
}
