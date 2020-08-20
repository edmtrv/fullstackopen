import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.data;
    case 'LOGOUT_USER':
      return null;
    case 'INIT_USER':
      return action.data;
    default:
      return state;
  }
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch({
        type: 'LOGIN_USER',
        data: user,
      });
    } catch (err) {
      dispatch(setNotification(err.response.data.error, true));
    }
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedInUser');
  return {
    type: 'LOGOUT_USER',
  };
};

export const initializeUser = (loggedInUser) => {
  return async (dispatch) => {
    const user = JSON.parse(loggedInUser);
    blogService.setToken(user.token);
    dispatch({
      type: 'INIT_USER',
      data: user,
    });
  };
};

export default userReducer;
