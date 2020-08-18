import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      dispatch(initializeUser(loggedInUser));
    }
  }, [dispatch]);

  const handleLogin = (loginDetails) => {
    dispatch(loginUser(loginDetails));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddBlog = (blogData) => {
    try {
      dispatch(createBlog(blogData));
      showNotification('Successfully added new blog');
    } catch (err) {
      showNotification(err.response.data.error, true);
    }
  };

  const handleAddLike = async (blog) => {
    try {
      dispatch(likeBlog(blog));
    } catch (err) {
      showNotification(err.response.data.error, true);
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      dispatch(removeBlog(id));

      showNotification('Removed successfully');
    } catch (err) {
      showNotification(err.response.data.error, true);
    }
  };

  const showNotification = (message, error = false) => {
    dispatch(setNotification(message, error));
  };

  if (user === null) {
    return (
      <div>
        {notification && <Notification {...notification} />}
        <LoginForm userLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        {notification && <Notification {...notification} />}
        <p>
          {user.name} logged in<button onClick={handleLogout}>Logout</button>
        </p>

        <Togglable buttonLabel="New Blog">
          <BlogForm addBlog={handleAddBlog} />
        </Togglable>
        <div id="blog-list">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              addLike={handleAddLike}
              removeBlog={handleRemoveBlog}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default App;
