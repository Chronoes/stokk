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
      checkboxes: [true, true, true],
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

  onSetStock(stock) {
    this.setState(this.state
      .set('stock', stock)
      .set('isLoading', false)
      .set('errorMessage', ''));
  }

  onAdjustDaysShown(days) {
    this.setState(this.state.set('amountOfDaysShown', days));
  }

  onCheckboxClick(checkbox) {
    const checkboxes = this.state.get('checkboxes');
    if (checkbox === 'high') this.setState(this.state.set('checkboxes', [!checkboxes[0], checkboxes[1], checkboxes[2]]));
    if (checkbox === 'low' ) this.setState(this.state.set('checkboxes', [checkboxes[0], !checkboxes[1], checkboxes[2]]));
    if (checkbox === 'close') this.setState(this.state.set('checkboxes', [checkboxes[0], checkboxes[1], !checkboxes[2]]));
  }
}
export default DetailedStockStore;
