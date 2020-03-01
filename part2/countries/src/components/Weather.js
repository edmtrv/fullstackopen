import React from 'react';

const Weather = ({ data }) => {
  return (
    <div>
      <h3>Weather in {data.location.name}</h3>
      <p>Temperature: {data.current.temperature} celsius</p>
      <img
        src={data.current.weather_icons[0]}
        alt={`${data.current.weather_descriptions[0]} in ${data.location.name}`}
      />
      <p>
        {`Wind: ${data.current.wind_speed} km/h ${data.current.wind_dir}  direction`}
      </p>
    </div>
  );
};

export default Weather;
