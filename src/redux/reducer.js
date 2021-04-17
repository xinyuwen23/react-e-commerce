const initialState = {
  isLoginModalVisible: false,
  isRegisterModalVisible: false,
  user: {},

  isUploadModalVisible: false,
  item: {},
  itemList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload }

    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
      }

    case 'LOGOUT':
      return { ...state, user: {} }

    case 'GET_ITEM_LIST':
      return { ...state, itemList: action.payload }

    case 'GET_ITEM':
      return { ...state, item: action.payload }

    case 'UPLOAD_ITEM':
      return { ...state, isUploadModalVisible: false }

    default:
      return state
  }
}

export default reducer
