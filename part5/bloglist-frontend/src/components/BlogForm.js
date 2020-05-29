import React from 'react';

const BlogForm = (props) => {
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={props.handleAddBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onChange={props.handleTitle}
            value={props.title}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            onChange={props.handleAuthor}
            value={props.author}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            id="url"
            onChange={props.handleUrl}
            value={props.url}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
