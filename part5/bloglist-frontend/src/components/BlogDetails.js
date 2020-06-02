import React from 'react';

const BlogDetails = ({ blog, name, display }) => {
  return (
    <div style={{ display }}>
      {blog.url}
      <br />
      Likes: {blog.likes} <button>Like</button>
      <br />
      {name}
    </div>
  );
};

export default BlogDetails;
