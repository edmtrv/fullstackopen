const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.text;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      text,
    });
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export default reducer;
