import immutable from 'alt/utils/ImmutableUtil';
import {Map, List} from 'immutable';

import alt from '../altInstance';
import UserStocksActions from '../actions/UserStocksActions';

@alt.createStore
@immutable
class UserStocksStore {
  static displayName = 'UserStocksStore';

  constructor() {
    this.bindActions(UserStocksActions);
    this.state = new Map({
      stocks: new List(),
      errorMessage: '',
      isLoading: '',
    });
  }

  onGetUserStocksWithToken() {
    this.setState(this.state
      .set('errorMessage', '')
      .set('isLoading', true));
  }

  onGetUserStocksSuccess(stocks) {
    this.setState(this.state
      .set('stocks', new List(stocks))
      .set('errorMessage', '')
      .set('isLoading', false));
  }

  onGetUserStocksError(errorMessage) {
    this.setState(this.state
      .set('errorMessage', errorMessage)
      .set('isLoading', false));
  }

  onDeleteUserStockWithToken(symbol) {
    this.setState(this.state
      .set('errorMessage', '')
      .set('isLoading', symbol));
  }

  onDeleteUserStockSuccess(symbol) {
    this.setState(this.state
      .update('stocks', stocks => stocks.delete(stocks.findIndex(stock => stock.symbol === symbol)))
      .set('errorMessage', '')
      .set('isLoading', false));
  }

  onDeleteUserStockError(errorMessage) {
    this.setState(this.state
      .set('errorMessage', errorMessage)
      .set('isLoading', false));
  }

  onAddNewStockWithToken(symbol) {
    this.setState(this.state
      .set('errorMessage', '')
      .set('isLoading', symbol));
  }

  onAddNewStockSuccess(stock) {
    this.setState(this.state
      .update('stocks', currentStocks => {
        const index = currentStocks.findIndex(oldStock => stock.id === oldStock.id);
        return index === -1 ? currentStocks.unshift(stock) : currentStocks.delete(index).unshift(stock);
      })
      .set('errorMessage', '')
      .set('isLoading', false));
  }

  onAddNewStockError(errorMessage) {
    this.setState(this.state
      .set('errorMessage', errorMessage)
      .set('isLoading', false));
  }
}

export default UserStocksStore;
