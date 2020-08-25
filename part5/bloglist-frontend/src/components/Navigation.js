import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { logoutUser } from '../reducers/loginReducer';

const Navigation = ({ login }) => {
  const dispatch = useDispatch();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav.Item className="mr-3">
          <Link to="/">Blogs</Link>
        </Nav.Item>
        <Nav.Item className="mr-auto">
          <Link to="/users">Users</Link>
        </Nav.Item>
        <Nav.Item className="mr-3">
          <Button variant="dark" onClick={() => dispatch(logoutUser())}>
            Logout
          </Button>
        </Nav.Item>
        <Nav.Item>{login.name} logged in</Nav.Item>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
