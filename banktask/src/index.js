import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/rootReducer';
// import './mocks/backend'; // Uncomment this to work with the mock.

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);