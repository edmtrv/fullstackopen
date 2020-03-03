import React, { useState, useEffect } from 'react';
import Form from './Form';
import Persons from './Persons';
import Filter from './Filter';
import Notification from './Notification';
import phonebook from '../services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    phonebook.getAll().then(data => setPersons(data));
  }, []);

  const onNameChange = e => setNewName(e.target.value);
  const onNumberChange = e => setNewNumber(e.target.value);
  const onTermChange = e => setNewTerm(e.target.value);

  const onFormSubmit = e => {
    e.preventDefault();

    if (checkPersonExists(newName)) {
      updatePerson();
    } else {
      addPerson();
    }

    setNewName('');
    setNewNumber('');
  };

  const addPerson = () => {
    const newPerson = { name: newName, number: newNumber };
    phonebook.create(newPerson).then(data => {
      setPersons(persons.concat(data));
      showNotification(`Added ${newName}`);
    });
  };

  const updatePerson = () => {
    if (
      window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      )
    ) {
      const person = persons.find(p => p.name === newName);
      const updatedPerson = { ...person, number: newNumber };

      phonebook
        .updatePerson(person.id, updatedPerson)
        .then(data => {
          setPersons(persons.map(p => (p.id !== person.id ? p : data)));
          showNotification(`Updated number for ${newName}`);
        })
        .catch(() => {
          showNotification(
            `Information of ${newName} has already been removed from server`,
            'error'
          );
        });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebook.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
    }
  };

  const checkPersonExists = input => {
    return persons.some(person => person.name === input);
  };

  const filterPhonebook = () => {
    return persons.filter(person =>
      person.name.toLowerCase().includes(newTerm.toLowerCase())
    );
  };

  const showNotification = (message, type = 'success') => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage(null);
      setType('');
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
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
      <Persons persons={filterPhonebook()} onPersonDelete={deletePerson} />
    </div>
  );
};

export default App;
