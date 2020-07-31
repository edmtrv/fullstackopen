import anecdoteService from '../services/anecdotes';

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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id },
  };
};

export default reducer;
