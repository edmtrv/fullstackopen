import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import App from './App';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
});
const store = createStore(reducer, composeWithDevTools());

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
