import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './routes';
// import './styles/index.scss';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  rootEl,
);
