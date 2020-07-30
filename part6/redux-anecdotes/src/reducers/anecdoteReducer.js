const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD_VOTE':
      return state.map((an) =>
        an.id === action.data.id ? { ...an, votes: an.votes + 1 } : an
      );
    default:
      return state;
  }
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export const createAnecdote = (data) => {
  return {
    type: 'CREATE_ANECDOTE',
    data,
  };
};

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id },
  };
};

export default reducer;
