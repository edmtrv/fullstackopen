import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm />
      </Togglable>
      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
