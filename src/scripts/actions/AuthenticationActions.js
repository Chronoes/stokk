import alt from '../altInstance';
import {login} from '../services/apiService';
import routerContainer from '../routerContainer';

class AuthenticationActions {
  login(email, password) {
    this.dispatch();
    const {loginError, loginSuccess} = this.actions;

    login(email, password)
      .then(response => loginSuccess(response.data.token))
      .catch(response => {
        if (response instanceof Error) {
          loginError(response.message);
        } else {
          if (response.data.message) {
            loginError(response.data.message);
          } else {
            loginError('Something went wrong. Please try again.');
          }
        }
      });
  }

  loginError(error) {
    this.dispatch(error);
  }

  loginSuccess(token) {
    localStorage.setItem('token', token);
    this.dispatch(token);
    routerContainer.transitionTo('/');
  }

  getTokenFromStorage() {
    const token = localStorage.getItem('token');
    if (token) this.dispatch(token);
  }
}

export default alt.createActions(AuthenticationActions);
