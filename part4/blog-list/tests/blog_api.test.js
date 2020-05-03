const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
});

describe('when viewing a list of blogs', () => {
  test('it returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('it returns all blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier of blogs is named id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('blog post creation', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Goodbye, Clean Code',
      author: 'Dan Abramov',
      url: 'https://overreacted.io/goodbye-clean-code/',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).toContain('Goodbye, Clean Code');
  });
});

describe('correct handling of properties', () => {
  test('likes property has a default value of 0', async () => {
    const newBlog = {
      title: 'Goodbye, Clean Code',
      author: 'Dan Abramov',
      url: 'https://overreacted.io/goodbye-clean-code/',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('title and url properites are required', async () => {
    const newBlog = {
      author: 'Dan Abramov',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog entry', () => {
  test('succeedes with status code 204 if valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('update of blog information', () => {
  test('succeeds changing the amount of likes for a blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedLikes = {
      likes: 8,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];

    expect(updatedBlog.likes).toEqual(8);
    expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
