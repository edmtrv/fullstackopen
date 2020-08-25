import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { loginUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ username, password }));

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Form inline onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label className="mb-2 mr-sm-2" htmlFor="username">
            Username
          </Form.Label>
          <Form.Control
            className="mb-2 mr-sm-2"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mb-2 mr-sm-2" htmlFor="password">
            Password
          </Form.Label>
          <Form.Control
            className="mb-2 mr-sm-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" id="login-button" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
