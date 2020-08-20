import React, { useState } from 'react';
import BlogDetails from './BlogDetails';

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyles = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyles}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setVisible((prevState) => !prevState)}>
        {visible ? 'Hide' : 'View'}
      </button>
      <BlogDetails
        display={visible ? 'block' : 'none'}
        blog={blog}
        user={user}
        addLike={addLike}
        deleteBlog={deleteBlog}
      />
    </div>
  );
};

export default Blog;
