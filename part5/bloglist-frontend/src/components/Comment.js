import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { createComment } from '../reducers/blogReducer';

const Comment = ({ blog }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const addComment = (e) => {
    e.preventDefault();
    dispatch(createComment(content, blog.id));
    setContent('');
  };

  return (
    <div className="mt-4">
      <h4>Comments</h4>
      <Form inline onSubmit={addComment}>
        <Form.Control
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className="ml-2">Add Comment</Button>
      </Form>
      {blog.comments ? (
        <ListGroup className="mt-4">
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        'No comments yet'
      )}
    </div>
  );
};

export default Comment;
