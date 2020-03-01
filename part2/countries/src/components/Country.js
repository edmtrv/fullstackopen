import React from 'react';
import Weather from './Weather';

const Country = ({ country, weather }) => {
  const showWeather = () => {
    if (!weather) {
      return <div>Loading weather data...</div>;
    } else {
      return <Weather data={weather} />;
    }
  };

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lang => (
          <li key={lang.iso639_1}>{lang.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        style={{ width: '100px', height: 'auto' }}
      />
      {showWeather()}
    </div>
  );
};

export default Country;
