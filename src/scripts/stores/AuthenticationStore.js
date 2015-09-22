import {createStore} from '../altInstance';
import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

@createStore
@immutable
class AuthenticationStore {
  static displayName = 'AuthenticationStore';

  constructor() {
    this.state = new Map({
      token: '',
    });
  }
}

export default AuthenticationStore;
