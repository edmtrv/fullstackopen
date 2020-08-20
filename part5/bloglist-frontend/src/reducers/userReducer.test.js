import deepFreeze from 'deep-freeze';
import userReducer from './userReducer';

describe('userReducer', () => {
  test('returns new state with action INIT_USERS', () => {
    const state = [];
    const action = {
      type: 'INIT_USERS',
      data: [{ username: 'emil' }, { username: 'xxx' }],
    };

    deepFreeze(state);
    const newState = userReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(action.data[0]);
  });
});
