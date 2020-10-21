import React, { FC } from 'react';
import { CoursePart } from './index';

const Total: FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
