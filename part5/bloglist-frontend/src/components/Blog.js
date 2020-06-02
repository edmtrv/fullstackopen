import React, { useState } from 'react';
import BlogDetails from './BlogDetails';

const Blog = ({ blog, name, addLike }) => {
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
        name={name}
        addLike={addLike}
      />
    </div>
  );
};

export default Blog;
