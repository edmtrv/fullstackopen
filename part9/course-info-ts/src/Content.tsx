import React, { FC } from 'react';
import { CoursePart } from './index';

const Content: FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
