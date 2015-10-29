import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import AuthenticationActions from '../actions/AuthenticationActions';
import RegistrationActions from '../actions/RegistrationActions';

@alt.createStore
@immutable
class AuthenticationStore {
  static displayName = 'AuthenticationStore';

  constructor() {
    this.bindActions(AuthenticationActions);
    this.bindActions(RegistrationActions);
    this.state = new Map({
      token: '',
      errorMessage: '',
      isLoading: false,
    });
  }

  onLogout() {
    this.setState(this.state.set('token', ''));
  }

  onGetTokenFromStorage(token) {
    if (token) {
      this.setState(this.state.set('token', token));
    }
  }

  onLogin() {
    this.setState(this.state.set('errorMessage', '').set('isLoading', true));
  }

  onLoginSuccess(token) {
    this.setState(this.state.set('token', token).set('errorMessage', '').set('isLoading', false));
  }

  onLoginError(errorMessage) {
    this.setState(this.state.set('errorMessage', errorMessage).set('isLoading', false));
  }

  onRegister() {
    this.setState(this.state.set('errorMessage', '').set('isLoading', true));
  }

  onRegistrationSuccess(token) {
    this.setState(this.state.set('token', token).set('errorMessage', '').set('isLoading', false));
  }

  onRegistrationError(errorMessage) {
    this.setState(this.state.set('errorMessage', errorMessage).set('isLoading', false));
  }
}

export default AuthenticationStore;
