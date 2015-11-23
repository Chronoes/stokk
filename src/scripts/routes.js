import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StockPage from './pages/StockPage';

import AuthenticationStore from './stores/AuthenticationStore';
import AuthenticationActions from './actions/AuthenticationActions';

function requireAuth(nextState, replaceState) {
  AuthenticationActions.getTokenFromStorage();
  if (!AuthenticationStore.getState().get('token').length) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashboardPage} onEnter={requireAuth} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="stock/:id" component={StockPage} onEnter={requireAuth} />
  </Route>
);
