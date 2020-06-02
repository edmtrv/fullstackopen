import React, { useState } from 'react';
import BlogDetails from './BlogDetails';

const Blog = ({ blog, name }) => {
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
      <BlogDetails display={visible ? '' : 'none'} blog={blog} name={name} />
    </div>
  );
};

export default Blog;
