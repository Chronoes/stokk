import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import AuthenticationActions from '../actions/AuthenticationActions';

@immutable
class AuthenticationStore {
  static displayName = 'AuthenticationStore';

  constructor() {
    this.bindActions(AuthenticationActions);
    this.state = new Map({
      token: '',
      errorMessage: '',
      isLoading: false,
    });
  }

  onLogin() {
    this.setState(this.state.set('isLoading', true));
  }

  onLoginSuccess() {
    this.setState(this.state.set('token', 'place_holder').set('errorMessage', '').set('isLoading', false));
  }

  onLoginError(errorMessage) {
    this.setState(this.state.set('errorMessage', errorMessage).set('isLoading', false));
  }
}

export default alt.createStore(AuthenticationStore);
