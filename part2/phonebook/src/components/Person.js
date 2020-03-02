import React from 'react';

const Person = ({ person, onPersonDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => onPersonDelete(person.id, person.name)}>
        Delete
      </button>
    </div>
  );
};

export default Person;
