import React from 'react';

const reducer = (state = 'Anecdote added successfully', action) => {
  return state;
};

export const showNotification = () => {
  return {
    type: 'SHOW_NOTIFICATION',
  };
};

export default reducer;
