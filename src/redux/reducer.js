const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set_state':
      return { ...state, ...action.value };

    default:
      return state;
  }
};

export default reducer;
