import notificationReducer from './notificationReducer';

describe('notificationReducer', () => {
  test('returns new state with SHOW_NOTIFICATION', () => {
    const state = null;
    const action = {
      type: 'SHOW_NOTIFICATION',
      data: {
        notification: 'Blog post successfully added',
        error: false,
      },
    };

    const newState = notificationReducer(state, action);
    expect(newState).toEqual(action.data);
  });
});
