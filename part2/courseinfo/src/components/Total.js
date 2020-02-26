import React from 'react';

const Total = ({ parts }) => {
  return (
    <div>
      Total of {parts.reduce((total, part) => total + part.exercises, 0)}{' '}
      exercises
    </div>
  );
};

export default Total;
