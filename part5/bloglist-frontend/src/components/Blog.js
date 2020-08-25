import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import Comment from './Comment';

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
        <Button onClick={() => dispatch(likeBlog(blog))}>Like</Button>
      </p>
      <p>{blog.user.name}</p>
      {blog.user.username === login.username && (
        <Button variant="danger" onClick={confirmDelete}>
          Remove
        </Button>
      )}
      <Comment blog={blog} />
    </div>
  );
};

export default Blog;
