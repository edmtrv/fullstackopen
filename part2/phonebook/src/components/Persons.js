import React from 'react';
import Person from './Person';

const Persons = ({ persons, onPersonDelete }) => {
  return (
    <div>
      {persons.map(person => (
        <Person
          key={person.name}
          person={person}
          onPersonDelete={onPersonDelete}
        />
      ))}
    </div>
  );
};

export default Persons;
