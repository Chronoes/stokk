import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import UserStocksActions from '../actions/UserStocksActions';

@alt.createStore
@immutable
class UserStocksStore {
  static displayName = 'UserStocksStore';

  constructor() {
    this.bindActions(UserStocksActions);
    this.state = new Map({
      stocks: [],
      errorMessage: '',
      isLoading: false,
    });
  }

  onGetUserStocksWithToken() {
    this.setState(this.state.set('errorMessage', '').set('isLoading', true));
  }

  onGetUserStocksSuccess(stocks) {
    this.setState(this.state.set('stocks', stocks).set('errorMessage', '').set('isLoading', false));
  }

  onGetUserStocksError(errorMessage) {
    this.setState(this.state.set('errorMessage', errorMessage).set('isLoading', false));
  }
}

export default UserStocksStore;
