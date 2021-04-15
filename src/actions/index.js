export const setState = payload => dispatch => {
  dispatch({ type: 'set_state', payload })
}
