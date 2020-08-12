import React from 'react';

const Notification = ({ notification, error }) => {
  const color = error ? 'red' : 'green';
  return (
    <div className="notification" style={{ borderColor: color }}>
      <h2 style={{ color }}>{notification}</h2>
    </div>
  );
};

export default Notification;
