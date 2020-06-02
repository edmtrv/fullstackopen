import React from 'react';

const BlogDetails = ({ blog, name, display, addLike }) => {
  return (
    <div style={{ display }}>
      {blog.url}
      <br />
      Likes: {blog.likes} <button onClick={() => addLike(blog)}>Like</button>
      <br />
      {name}
    </div>
  );
};

export default BlogDetails;
