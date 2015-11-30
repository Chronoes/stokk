import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import DetailedStocksActions from '../actions/DetailedStockActions';

@alt.createStore
@immutable
class DetailedStockStore {
  static displayName = 'DetailedStockStore';

  constructor() {
    this.bindActions(DetailedStocksActions);
    this.state = new Map({
      stock: {},
      isLoading: false,
      errorMessage: '',
    });
  }

  onGetStock() {
    this.setState(this.state
      .set('isLoading', true)
      .set('errorMessage', ''));
  }

  onGetStockSuccess(stock) {
    this.setState(this.state
      .set('stock', stock)
      .set('isLoading', false)
      .set('errorMessage', ''));
  }

  onGetStockError(errorMessage) {
    this.setState(this.state
      .set('isLoading', false)
      .set('errorMessage', errorMessage));
  }

  onSetStock(stock) {
    this.setState(this.state.set('stock', stock));
  }
}

export default DetailedStockStore;
