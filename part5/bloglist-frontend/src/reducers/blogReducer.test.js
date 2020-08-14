import deepFreeze from 'deep-freeze';
import blogReducer from './blogReducer';

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = [];
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'Test Blog 1',
        author: 'Test Author',
        url: 'http://test.url',
      },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });
});
