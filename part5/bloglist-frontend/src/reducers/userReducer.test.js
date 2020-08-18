import userReducer from './userReducer';

describe('userReducer', () => {
  test('returns new state with action LOGIN_USER', () => {
    const state = null;
    const action = {
      type: 'LOGIN_USER',
      data: {
        username: 'emil',
        password: 'asd',
      },
    };

    const newState = userReducer(state, action);

    expect(newState).not.toBeNull();
    expect(newState).toMatchObject({ username: 'emil' });
  });
});
