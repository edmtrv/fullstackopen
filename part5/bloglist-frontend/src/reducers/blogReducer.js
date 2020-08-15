import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'REMOVE_BLOG':
      return state.filter((b) => b.id !== action.data.id);
    case 'LIKE_BLOG':
      return state.map((b) => (action.data.id !== b.id ? b : action.data));
    default:
      return state;
  }
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);
    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id },
    });
  };
};

export const likeBlog = (blog) => {
  const newLikes = blog.likes + 1;
  const newBlog = { ...blog, likes: newLikes };

  return async (dispatch) => {
    const updatedBlog = await blogService.update(newBlog, blog.id);
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export default blogReducer;
