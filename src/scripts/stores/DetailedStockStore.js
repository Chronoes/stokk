import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import DetailedStockActions from '../actions/DetailedStockActions';

@alt.createStore
@immutable
class DetailedStockStore {
  static displayName = 'DetailedStockStore';

  constructor() {
    this.bindActions(DetailedStockActions);
    this.state = new Map({
      stock: {},
      isLoading: true,
      errorMessage: '',
      amountOfDaysShown: 10,
      checkboxes: new Map({
        high: true,
        low: true,
        close: true,
      }),
    });
  }

  onGetStock() {
    this.setState(this.state
      .set('stock', null)
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

  onAdjustDaysShown(days) {
    this.setState(this.state.set('amountOfDaysShown', days));
  }

  onCheckboxClick(checkbox) {
    this.setState(this.state.updateIn(['checkboxes', checkbox], value => !value));
  }
}
export default DetailedStockStore;
