import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
  createBlog,
} from './reducers/blogReducer';
import { initializeUser, logoutUser, loginUser } from './reducers/loginReducer';
import { initUsers } from './reducers/userReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Users from './components/Users';

const App = () => {
  const { notification, login, blogs, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initUsers());

    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      dispatch(initializeUser(loggedInUser));
    }
  }, [dispatch]);

  const handleCreateBlog = (blogDetails) => {
    dispatch(createBlog(blogDetails));
  };

  const addLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const deleteBlog = (id) => {
    dispatch(removeBlog(id));
  };

  const handleUserLogin = (credetials) => {
    dispatch(loginUser(credetials));
  };

  if (login === null) {
    return (
      <div>
        {notification && <Notification {...notification} />}
        <LoginForm onUserLogin={handleUserLogin} />
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

        <Router>
          <Switch>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/">
              <BlogList
                blogs={blogs}
                user={login}
                addLike={addLike}
                deleteBlog={deleteBlog}
                onCreateBlog={handleCreateBlog}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
};

export default App;
