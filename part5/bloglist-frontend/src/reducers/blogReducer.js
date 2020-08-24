import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

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
    case 'ADD_COMMENT':
      return state.map((b) =>
        action.data.blog === b.id
          ? { ...b, comments: b.comments.concat(action.data) }
          : b
      );
    default:
      return state;
  }
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(content);
      dispatch({
        type: 'NEW_BLOG',
        data: blog,
      });
      dispatch(setNotification('Blog successfully added'));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, true));
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id },
      });
      dispatch(setNotification('Blog deleted successfully'));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, true));
    }
  };
};

export const likeBlog = (blog) => {
  const newLikes = blog.likes + 1;
  const newBlog = { ...blog, likes: newLikes };

  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(newBlog, blog.id);
      dispatch({
        type: 'LIKE_BLOG',
        data: updatedBlog,
      });
    } catch (err) {
      dispatch(setNotification(err.response.data.error, true));
    }
  };
};

export const createComment = (content, id) => {
  return async (dispatch) => {
    const comment = await blogService.addComment(content, id);

    dispatch({
      type: 'ADD_COMMENT',
      data: comment,
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
