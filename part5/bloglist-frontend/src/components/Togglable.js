import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisliblity = () => setVisible(!visible);

  return (
    <div>
      <button onClick={toggleVisliblity} style={hideWhenVisible}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisliblity}>Cancel</button>
      </div>
    </div>
  );
};

Togglable.PropTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
