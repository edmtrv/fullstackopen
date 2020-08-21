import React from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const BlogDetails = ({ blog, user, display }) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  console.log('blog', blog, 'user: ', blog.user.username, user.username);
  return (
    <div className="blog-details" style={{ display }}>
      {blog.url}
      <br />
      Likes: <span className="blog-likes">{blog.likes}</span>{' '}
      <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
      <br />
      {user.name}
      <br />
      {blog.user.username === user.username && (
        <button onClick={confirmDelete}>Remove</button>
      )}
    </div>
  );
};

export default BlogDetails;
