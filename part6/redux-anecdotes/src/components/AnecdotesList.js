import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((an) => an.content.toLowerCase().includes(filter));
  });

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotification('Vote successfully added', 5));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
