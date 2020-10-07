const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', { content: 1 });

  response.json(allBlogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!(blog.user._id.toString() === decodedToken.id)) {
    return response
      .status(401)
      .json({ error: 'User unauthorized to delete this resource' });
  }

  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', { content: 1 });

  response.json(updatedBlog);
});

blogsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id });

  response.json(comments);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;

  const blog = await Blog.findById(request.params.id);
  const comment = new Comment({
    content: body.content,
    blog: request.params.id,
  });
  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = blogsRouter;
