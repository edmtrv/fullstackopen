import React, { useState, useEffect } from 'react';
import Form from './Form';
import Persons from './Persons';
import Filter from './Filter';
import phonebook from '../services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newTerm, setNewTerm] = useState('');

  useEffect(() => {
    phonebook.getAll().then(data => setPersons(data));
  }, []);

  const addPerson = e => {
    e.preventDefault();

    if (checkPersonExists(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      phonebook.create(newPerson).then(p => setPersons(persons.concat(p)));
    }

    setNewName('');
    setNewNumber('');
  };

  const checkPersonExists = input => {
    return persons.some(person => person.name === input);
  };

  const filterPhonebook = () => {
    return persons.filter(person =>
      person.name.toLowerCase().includes(newTerm.toLowerCase())
    );
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
        onFormSubmit={addPerson}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        name={newName}
        number={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filterPhonebook()} />
    </div>
  );
};

export default App;
