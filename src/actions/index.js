export const setState = payload => dispatch => {
  dispatch({ type: 'SET_STATE', payload })
}
