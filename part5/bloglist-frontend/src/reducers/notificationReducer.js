const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification, error = false) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification,
      error,
    },
  };
};

export default notificationReducer;
