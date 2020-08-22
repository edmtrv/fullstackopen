import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser, logoutUser } from './reducers/loginReducer';
import { initUsers } from './reducers/userReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';

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

  const userMatch = useRouteMatch('/users/:id');
  const user = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

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
          <Route path="/users/:id">
            <User user={user} />
          </Route>
          <Route path="/blogs/:id">
            <Blog blog={blog} login={login} />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/">
            <Blogs blogs={blogs} />
          </Route>
        </Switch>
      </div>
    );
  }
};

export default App;
