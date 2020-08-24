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

  test('returns correct new state with action LIKE_BLOG', () => {
    const blog = {
      id: 1,
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.url',
      likes: 0,
    };
    const state = [blog];
    const action = {
      type: 'LIKE_BLOG',
      data: {
        ...blog,
        likes: 1,
      },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });

  test('returns the new state with action REMOVE_BLOG', () => {
    const state = [
      {
        id: 1,
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.url',
        likes: 0,
      },
    ];
    const action = {
      type: 'REMOVE_BLOG',
      data: { id: 1 },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(0);
  });

  test('returns new state with ADD_COMMENT action', () => {
    const state = [
      {
        id: 1,
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.url',
        likes: 0,
        comments: [],
      },
    ];
    const action = {
      type: 'ADD_COMMENT',
      data: {
        content: 'My new comment',
        blog: 1,
      },
    };

    deepFreeze(state);

    const newState = blogReducer(state, action);

    expect(newState[0].comments).toHaveLength(1);
    expect(newState[0].comments[0]).toContain(action.data.content);
  });
});
