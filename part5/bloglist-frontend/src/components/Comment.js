import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
    <div>
      <h4>Comments</h4>
      <form onSubmit={addComment}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button>Add Comment</button>
      </form>
      {blog.comments ? (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        'No comments yet'
      )}
    </div>
  );
};

export default Comment;
