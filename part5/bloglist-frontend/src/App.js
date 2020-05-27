import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleUsername = ({ target }) => setUsername(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log(err);
    }
  };

  const formProps = {
    username,
    password,
    handleUsername,
    handlePassword,
    handleLogin,
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user === null ? (
        <LoginForm {...formProps} />
      ) : (
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
