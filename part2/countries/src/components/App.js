import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  const onTermChange = e => setTerm(e.target.value);

  const filterCountries = () => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  return (
    <div>
      <Search onTermChange={onTermChange} term={term} />
      <Countries countries={filterCountries()} />
    </div>
  );
};

export default App;
