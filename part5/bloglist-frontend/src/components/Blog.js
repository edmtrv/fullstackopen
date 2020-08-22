import React from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog, login }) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  if (!blog || !login) {
    return null;
  }

  return (
    <div className="blog">
      <p>
        {blog.title} {blog.author}
      </p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        Likes: <span className="blog-likes">{blog.likes}</span>{' '}
        <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
      </p>
      <p>{blog.user.name}</p>
      {blog.user.username === login.username && (
        <button onClick={confirmDelete}>Remove</button>
      )}
    </div>
  );
};

export default Blog;
