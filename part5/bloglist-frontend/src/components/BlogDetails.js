import React from 'react';

const BlogDetails = ({ blog, user, display, addLike, deleteBlog }) => {
  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog-details" style={{ display }}>
      {blog.url}
      <br />
      Likes: <span className="blog-likes">{blog.likes}</span>{' '}
      <button onClick={() => addLike(blog)}>Like</button>
      <br />
      {user.name}
      <br />
      {blog.user.username === user.username && (
        <button onClick={confirmDelete}>Remove</button>
      )}
    </div>
  );
};

export default BlogDetails;
