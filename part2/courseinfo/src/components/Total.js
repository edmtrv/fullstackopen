import React from 'react';

const Total = ({ parts }) => {
  return (
    <div>Total: {parts.reduce((total, part) => total + part.exercises, 0)}</div>
  );
};

export default Total;
