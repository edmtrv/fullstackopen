import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser, logoutUser } from './reducers/loginReducer';
import { initUsers } from './reducers/userReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Users from './components/Users';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();

  const { notification, login, blogs, users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initUsers());
    dispatch(initializeBlogs());

    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      dispatch(initializeUser(loggedInUser));
    }
  }, [dispatch]);

  const match = useRouteMatch('/users/:id');
  const user = match ? users.find((u) => u.id === match.params.id) : null;

  if (login === null) {
    return (
      <div>
        {notification && <Notification {...notification} />}
        <LoginForm />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        {notification && <Notification {...notification} />}
        <p>
          {login.name} logged in
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </p>

        <Switch>
          <Route path="/users/:id">{user && <User user={user} />}</Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/">
            <BlogList blogs={blogs} user={login} />
          </Route>
        </Switch>
      </div>
    );
  }
};

export default App;
