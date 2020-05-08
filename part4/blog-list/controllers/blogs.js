const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({});

  response.json(allBlogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog);

  response.json(updatedBlog);
});

module.exports = blogsRouter;