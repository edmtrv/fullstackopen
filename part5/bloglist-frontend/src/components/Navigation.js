import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

const Navigation = ({ login }) => {
  const dispatch = useDispatch();

  const navItem = {
    display: 'inline-block',
    paddingRight: '10px',
  };

  return (
    <nav>
      <ul
        style={{ listStyle: 'none', backgroundColor: 'grey', padding: '10px' }}
      >
        <li style={navItem}>
          <Link to="/">Blogs</Link>
        </li>
        <li style={navItem}>
          <Link to="/users">Users</Link>
        </li>
        <li style={navItem}>{login.name} logged in</li>
        <li style={navItem}>
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
