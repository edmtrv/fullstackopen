import React from 'react';
import { connect } from 'react-redux';
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

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.addVote(anecdote);
    props.setNotification(
      `Vote successfully added for anecdote: '${anecdote.content}'`,
      5
    );
  };

  return (
    <div>
      {props.anecdotes
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((an) =>
      an.content.toLowerCase().includes(state.filter)
    ),
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { addVote, setNotification })(
  AnecdoteList
);
