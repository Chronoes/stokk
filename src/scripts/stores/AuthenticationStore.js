import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';

@immutable
class AuthenticationStore {
  static displayName = 'AuthenticationStore';

  constructor() {
    this.state = new Map({
      token: '',
    });
  }
}

export default alt.createStore(AuthenticationStore);
