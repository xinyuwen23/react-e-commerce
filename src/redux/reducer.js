const initialState = {
  isLoginModalVisible: false,
  isRegisterModalVisible: false,
  user: {},

  isUploadModalVisible: false,
  item: {},
  itemList: [],

  cart: { items: [] },

  isAddressModalVisible: false,
  addressList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload }

    case 'GET_USER':
      return {
        ...state,
        user: action.payload.user,
        cart: action.payload.cart,
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
      }

    case 'LOGOUT':
      return { ...state, user: {}, cart: {} }

    case 'GET_ITEM_LIST':
      return { ...state, itemList: action.payload }

    case 'GET_ITEM':
      return { ...state, item: action.payload }

    case 'UPLOAD_ITEM':
      return { ...state, isUploadModalVisible: false }

    case 'GET_CART':
      return { ...state, cart: action.payload }

    case 'GET_ADDRESS':
      return { ...state, address: action.payload, isAddressModalVisible: false }

    case 'GET_ADDRESS_LIST':
      return { ...state, addressList: action.payload }

    default:
      return state
  }
}

export default reducer
