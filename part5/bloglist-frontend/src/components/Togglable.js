import React, { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisliblity = () => setVisible(!visible);

  return (
    <div>
      <button onClick={toggleVisliblity} style={hideWhenVisible}>
        {props.openButtonLabel}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisliblity}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
