import React, { useState } from 'react';
import BlogDetails from './BlogDetails';

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyles = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyles}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'View'}
      </button>
      <BlogDetails
        display={visible ? '' : 'none'}
        blog={blog}
        user={user}
        addLike={addLike}
        removeBlog={removeBlog}
      />
    </div>
  );
};

export default Blog;
