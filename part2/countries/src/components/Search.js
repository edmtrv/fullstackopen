import React from 'react';

const Search = ({ onTermChange, term }) => {
  return (
    <div>
      Search Countries: <input onChange={onTermChange} value={term} />
    </div>
  );
};

export default Search;
