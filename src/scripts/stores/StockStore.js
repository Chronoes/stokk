import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import StockActions from '../actions/StockActions';

@alt.createStore
@immutable
class StockStore {
  static displayName = 'StockStore';

  constructor() {
    this.bindActions(StockActions);
    this.state = new Map({
      stock: '',
      errorMessage: '',
      isLoading: false,
    });
  }

  onSearchStocks() {
    this.setState(this.state.set('errorMessage', '').set('isLoading', true));
  }

  onSearchSuccess(stock) {
    this.setState(this.state.set('stock', stock).set('errorMessage', '').set('isLoading', false));
  }

  onSearchError(errorMessage) {
    this.setState(this.state.set('errorMessage', errorMessage).set('isLoading', false));
  }
}

export default StockStore;
