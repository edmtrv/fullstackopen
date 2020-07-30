import React from 'react';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.text;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const showNotification = (text) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { text },
  };
};

export const hideNofitication = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  };
};

export default reducer;
