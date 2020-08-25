import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createBlog({ title, author, url }));

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className="formDiv">
      <h2>Create New</h2>
      <Form onSubmit={onFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">Author</Form.Label>
          <Form.Control
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url">Url</Form.Label>
          <Form.Control
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
