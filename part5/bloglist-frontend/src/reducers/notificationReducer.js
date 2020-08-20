const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timer;

export const setNotification = (notification, error = false, time = 5) => {
  return async (dispatch) => {
    clearTimeout(timer);
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        notification,
        error,
      },
    });

    timer = setTimeout(
      () =>
        dispatch({
          type: 'HIDE_NOTIFICATION',
        }),
      time * 1000
    );
  };
};

export default notificationReducer;
