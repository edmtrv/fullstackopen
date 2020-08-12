import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const notification = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (loginDetails) => {
    try {
      const user = await loginService.login(loginDetails);

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (err) {
      showNotification(err.response.data.error, true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleAddBlog = async (blogData) => {
    try {
      const createdBlog = await blogService.create(blogData);

      setBlogs(blogs.concat(createdBlog).sort((a, b) => b.likes - a.likes));
      // setNotification({
      //   message: 'Successfully added new blog',
      //   type: 'success',
      // });

      // setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      showNotification(err.response.data.error, true);
    }
  };

  const handleAddLike = async (blog) => {
    const newLikes = blog.likes + 1;
    const newBlog = { ...blog, likes: newLikes };
    try {
      const updatedBlog = await blogService.update(newBlog, blog.id);

      const newBlogs = blogs
        .map((b) => (updatedBlog.id !== b.id ? b : updatedBlog))
        .sort((a, b) => b.likes - a.likes);

      setBlogs(newBlogs);
    } catch (err) {
      showNotification(err.response.data.error, true);
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      await blogService.remove(id);

      setBlogs(blogs.filter((b) => b.id !== id));

      // setNotification({ message: 'Removed successfully', type: 'success' });

      // setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      showNotification(err.response.data.error, true);
    }
  };

  const showNotification = (message, error = false) => {
    dispatch(setNotification(message, error));

    setTimeout(() => dispatch(setNotification(null)), 5000);
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
