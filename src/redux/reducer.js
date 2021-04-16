const initialState = {
  isLoginModalVisible: false,
  isRegisterModalVisible: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload }

    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
      }

    default:
      return state
  }
}

export default reducer
