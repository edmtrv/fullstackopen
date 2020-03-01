import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import Country from './Country';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [term, setTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  useEffect(() => {
    if (country) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`
        )
        .then(response => setWeather(response.data));
    }
  }, [country]);

  const onTermChange = e => {
    setCountry(null);
    setTerm(e.target.value);
  };

  const onCountrySelect = country => setCountry(country);

  const filterCountries = () => {
    const newCountries = countries.filter(country =>
      country.name.toLowerCase().includes(term.toLowerCase())
    );

    if (newCountries.length === 1) {
      setCountry(newCountries[0]);
    }

    return newCountries;
  };

  const showDetails = () => {
    if (country) {
      return <Country country={country} weather={weather} />;
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
