const initialState = {
  isLoginModalVisible: false,
  isRegisterModalVisible: false,
  user: {},

  isUploadModalVisible: false,
  item: {},
  allItems: {},
  itemList: [],
  sellerItemList: [],
  searchText: '',

  cart: '',

  isAddressModalVisible: false,
  addressList: [],

  orderList: [],
  order: '',

  isHelpModalVisible: false,
  isHelpContentVisible: false,
  help: '',
  helpList: [],
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
      return { ...state, user: {}, cart: { items: [] } }

    case 'GET_ALL_ITEMS':
      return { ...state, allItems: action.payload }

    case 'GET_ITEM_LIST':
      return { ...state, itemList: action.payload }

    case 'GET_SELLER_ITEM_LIST':
      return { ...state, sellerItemList: action.payload }

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
      return { ...state, cart: action.payload.cart }

    case 'GET_HELP_LIST':
      return { ...state, helpList: action.payload, isHelpContentVisible: false }

    case 'GET_HELP':
      return { ...state, help: action.payload }

    case 'CREATE_HELP':
      return { ...state, isHelpModalVisible: false }

    default:
      return state
  }
}

export default reducer
