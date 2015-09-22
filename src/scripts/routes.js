import React from 'react';
import {Route, Redirect} from 'react-router';

import App from './components/App';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

import AuthenticationStore from './stores/AuthenticationStore';

function requireAuth(nextState, replaceState) {
  if (!AuthenticationStore.getState().get('token').length) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

export default (
  <Route path="/" component={App}>
    <Redirect from="/" to="/dashboard" />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
    <Route path="login" component={LoginPage} />
  </Route>
);
