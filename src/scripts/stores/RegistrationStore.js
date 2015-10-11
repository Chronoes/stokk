import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import RegistrationActions from '../actions/RegistrationActions';

@alt.createStore
@immutable
class RegistrationStore {
  static displayName = 'RegistrationStore';

  constructor() {
    this.bindActions(RegistrationActions);
    this.state = new Map({
      errorMessage: '',
      isLoading: false,
    });
  }

  onRegister() {
    this.setState(this.state.set('isLoading', true));
  }

  onRegistrationSuccess() {
    this.setState(this.state.set('errorMessage', '').set('isLoading', false));
  }

  onRegistrationError(errorMessage) {
    this.setState(this.state.set('errorMessage', errorMessage).set('isLoading', false));
  }
}

export default RegistrationStore;
