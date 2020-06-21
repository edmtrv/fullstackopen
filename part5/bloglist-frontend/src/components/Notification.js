import React from 'react';

const Notification = ({ message, type }) => {
  const color = type === 'error' ? 'red' : 'green';
  return (
    <div className="notification" style={{ borderColor: color }}>
      <h2 style={{ color }}>{message}</h2>
    </div>
  );
};

export default Notification;
