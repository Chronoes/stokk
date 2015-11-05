import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import SearchStocksActions from '../actions/SearchStocksActions';

@alt.createStore
@immutable
class SearchStocksStore {
  static displayName = 'SearchStocksStore';

  constructor() {
    this.bindActions(SearchStocksActions);
    this.state = new Map({
      stock: [],
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

export default SearchStocksStore;
