const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_RESULTS':
      return action.filter;
    default:
      return state;
  }
};

export const filterResults = (filter) => {
  return {
    type: 'FILTER_RESULTS',
    filter,
  };
};

export default filterReducer;
