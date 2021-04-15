const initialState = {
  showRegisterModal: false,
  showLoginModal: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set_state':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default reducer
