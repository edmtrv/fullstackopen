import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
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
      console.log(err);
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
      setUrl('');
    } catch (err) {
      console.log(err);
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
    return <LoginForm {...loginFormProps} />;
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in<button onClick={handleLogout}>Logout</button>
        </p>
        <BlogForm {...blogFormProps} />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
