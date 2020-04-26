import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from 'store';
import App from 'App';
import 'styles/core.scss';
import * as serviceWorker from './serviceWorker';
import { getAuthData } from 'utils/storage';

axios.interceptors.request.use((config) => {
  const authData = getAuthData();

  if (!config) {
    config = {};
  }
  if (authData) {
    config.headers['Authorization'] = `jwt ${authData.token}`;
  }
  return config;
});

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
