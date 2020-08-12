import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import App from './App';

const store = createStore(notificationReducer);

// store.subscribe(() => {
//   const storeNow = store.getState();
//   console.log(storeNow);
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
