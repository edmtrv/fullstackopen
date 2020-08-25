import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="New Blog">
        <BlogForm />
      </Togglable>
      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Blogs;
