import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Votes = ({ count }) => <p>Has {count} votes</p>;

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <Votes count={votes} />
    </div>
  );
};

const Button = ({ onButtonClick, text }) => {
  return <button onClick={onButtonClick}>{text}</button>;
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));
  const [highest, setHighest] = useState(0);

  const onSelectAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * props.anecdotes.length);

    setSelected(randomNumber);
  };

  const onVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
    setHighest(
      updatedVotes.findIndex(vote => vote === Math.max(...updatedVotes))
    );
  };

  return (
    <div>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <Button onButtonClick={onVote} text="Vote" />
      <Button onButtonClick={onSelectAnecdote} text="Random Anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote text={props.anecdotes[highest]} votes={votes[highest]} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
