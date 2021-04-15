import { message } from 'antd'

export const handleLogin = value => dispatch => {
  const email = value.email
  const password = value.password
  if (!email || !password) {
    message.error('Email and Password are required')
  } else {
    axios.post('api/auth/login', { email, password }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch({ type: 'set_user', value: res.data.user })
        history.push('/settings')
        message.success('Logged in')
      } else {
        message.error(res.data.message)
      }
    })
  }
}
