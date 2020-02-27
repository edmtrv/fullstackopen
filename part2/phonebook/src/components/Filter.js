import React from 'react';

const Filter = ({ onTermChange, term }) => {
  return (
    <div>
      Filter Phonebook: <input onChange={onTermChange} value={term} />
    </div>
  );
};

export default Filter;
