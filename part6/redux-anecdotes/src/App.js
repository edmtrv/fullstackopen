import React from 'react';
import { useSelector } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdotesList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <div>
      {notification && <Notification />}
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
