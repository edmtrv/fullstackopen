import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import Country from './Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [term, setTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  const onTermChange = e => {
    setTerm(e.target.value);
    setSelectedCountry(null);
  };

  const onCountrySelect = country => setSelectedCountry(country);

  const filterCountries = () => {
    const newCountries = countries.filter(country =>
      country.name.toLowerCase().includes(term.toLowerCase())
    );

    if (newCountries.length === 1) {
      setSelectedCountry(newCountries[0]);
    }

    return newCountries;
  };

  const showDetails = () => {
    if (selectedCountry) {
      return <Country country={selectedCountry} />;
    }

    const countries = filterCountries();

    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else {
      return (
        <div>
          {countries.map(country => (
            <div key={country.alpha2Code}>
              {country.name}
              <button onClick={() => onCountrySelect(country)}>Show</button>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <Search onTermChange={onTermChange} term={term} />
      {showDetails()}
    </div>
  );
};

export default App;
