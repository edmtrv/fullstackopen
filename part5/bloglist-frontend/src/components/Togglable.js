import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisliblity = () => setVisible(!visible);

  return (
    <div>
      <Button
        variant="primary"
        onClick={toggleVisliblity}
        style={hideWhenVisible}
      >
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="danger" onClick={toggleVisliblity}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
