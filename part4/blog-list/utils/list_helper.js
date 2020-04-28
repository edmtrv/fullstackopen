const _ = require('lodash');

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

const mostBlogs = (array) => {
  if (array.length === 0) return {};

  const [author, blogs] = _.chain(array)
    .countBy((blog) => blog.author)
    .toPairs()
    .sortBy((blog) => blog[1])
    .last()
    .value();

  return { author, blogs };
};

const mostLikes = (array) => {
  if (array.length === 0) return {};

  return _.chain(array)
    .groupBy('author')
    .map((objs, key) => ({ author: key, likes: _.sumBy(objs, 'likes') }))
    .sortBy('likes')
    .last()
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
