import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newTerm, setNewTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  }, []);

  const checkPersonExists = input => {
    return persons.some(person => person.name === input);
  };

  const filterPhonebook = term => {
    return persons.filter(person =>
      person.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (checkPersonExists(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  };

  const onNameChange = e => setNewName(e.target.value);
  const onNumberChange = e => setNewNumber(e.target.value);
  const onTermChange = e => setNewTerm(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onTermChange={onTermChange} term={newTerm} />
      <h3>Add New</h3>
      <Form
        onFormSubmit={onFormSubmit}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        name={newName}
        number={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filterPhonebook(newTerm)} />
    </div>
  );
};

export default App;
