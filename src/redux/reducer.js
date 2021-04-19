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

  orderList: [],
  order: {},
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

    case 'GET_ADDRESS_LIST':
      return { ...state, addressList: action.payload, isAddressModalVisible: false }

    case 'GET_ORDER_LIST':
      return { ...state, orderList: action.payload }

    case 'GET_ORDER':
      return { ...state, order: action.payload }

    case 'CREATE_ORDER':
      return { ...state, orderList: action.payload.orderList, cart: action.payload.cart }

    default:
      return state
  }
}

export default reducer
