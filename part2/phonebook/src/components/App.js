import React, { useState } from 'react';
import Person from './Person';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newTerm, setNewTerm] = useState('');

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
      <form onSubmit={onFormSubmit}>
        <div>
          Name: <input onChange={onNameChange} value={newName} />
        </div>
        <div>
          Number: <input onChange={onNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {filterPhonebook(newTerm).map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
