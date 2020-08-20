import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({ blogs, user, addLike, deleteBlog, onCreateBlog }) => {
  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm onCreateBlog={onCreateBlog} />
      </Togglable>
      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            addLike={addLike}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
