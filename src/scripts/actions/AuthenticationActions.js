import alt from '../altInstance';
import {login} from '../services/apiService';

class AuthenticationActions {
  login(email, password) {
    this.dispatch();
    const {loginError, loginSuccess} = this.actions;

    login(email, password)
      .then(loginSuccess)
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

  loginSuccess() {
    this.dispatch();
  }
}

export default alt.createActions(AuthenticationActions);
