import React from 'react';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ blogs }) => {
  const blogStyles = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm />
      </Togglable>
      <div className="blogs">
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyles}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
