import React, { useState } from 'react';
import Person from './Person';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const checkPersonExists = input => {
    return persons.some(person => person.name === input);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (checkPersonExists(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
  };

  const onNameChange = e => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          Name: <input onChange={onNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
