import immutable from 'alt/utils/ImmutableUtil';
import {Map, List} from 'immutable';

import alt from '../altInstance';
import SearchStocksActions from '../actions/SearchStocksActions';

@alt.createStore
@immutable
class SearchStocksStore {
  static displayName = 'SearchStocksStore';

  constructor() {
    this.bindActions(SearchStocksActions);
    this.state = new Map({
      stocks: new List(),
      errorMessage: '',
      isLoading: false,
    });
  }

  onSearchStocks() {
    this.setState(this.state
      .set('errorMessage', '')
      .set('isLoading', true));
  }

  onSearchSuccess(stocks) {
    this.setState(this.state
      .set('stocks', new List(stocks))
      .set('errorMessage', '')
      .set('isLoading', false));
  }

  onSearchError(errorMessage) {
    this.setState(this.state
      .set('errorMessage', errorMessage)
      .set('isLoading', false));
  }
}

export default SearchStocksStore;
