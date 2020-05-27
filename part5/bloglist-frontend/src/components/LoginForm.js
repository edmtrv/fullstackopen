import React from 'react';

const LoginForm = (props) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={props.username}
            onChange={props.handleUsername}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={props.password}
            onChange={props.handlePassword}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
