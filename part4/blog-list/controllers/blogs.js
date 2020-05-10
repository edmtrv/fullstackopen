const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });

  response.json(allBlogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' });
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);
  console.log(typeof blog.user._id, typeof decodedToken.id);

  if (!(blog.user._id.toString() === decodedToken.id)) {
    return response
      .status(401)
      .json({ error: 'User unauthorized to delete this resource' });
  }

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
