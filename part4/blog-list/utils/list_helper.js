const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => {
    return total + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((b) => b.likes), 0);

  return (
    blogs
      .map((blog) => {
        return { title: blog.title, author: blog.author, likes: blog.likes };
      })
      .find((blog) => blog.likes === mostLikes) || {}
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
