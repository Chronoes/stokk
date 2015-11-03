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

    });
  }
}

export default StockStore;
