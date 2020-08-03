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

let timer;

export const setNotification = (text, time) => {
  return async (dispatch) => {
    clearTimeout(timer);
    console.log(timer);
    dispatch({
      type: 'SHOW_NOTIFICATION',
      text,
    });
    timer = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export default reducer;
