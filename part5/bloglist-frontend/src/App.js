import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const handleUsername = ({ target }) => setUsername(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (err) {
      setNotification({ message: err.response.data.error, type: 'error' });

      setTimeout(() => setNotification(null), 5000);
    }
  };

  const loginFormProps = {
    username,
    password,
    handleUsername,
    handlePassword,
    handleLogin,
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleTitle = ({ target }) => setTitle(target.value);
  const handleAuthor = ({ target }) => setAuthor(target.value);
  const handleUrl = ({ target }) => setUrl(target.value);

  const handleAddBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const createdBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(createdBlog));
      setTitle('');
      setAuthor('');
      setNotification({
        message: 'Succesfully added new blog',
        type: 'success',
      });

      setTimeout(() => setNotification(null), 5000);
      setUrl('');
    } catch (err) {
      setNotification({ message: err.response.data.error, type: 'error' });

      setTimeout(() => setNotification(null), 5000);
    }
  };

  const blogFormProps = {
    handleAddBlog,
    handleTitle,
    handleAuthor,
    handleUrl,
    title,
    author,
    url,
  };

  if (user === null) {
    return (
      <div>
        {notification && <Notification {...notification} />}
        <LoginForm {...loginFormProps} />
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

        <Togglable btnLabel="New Note">
          <BlogForm {...blogFormProps} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
