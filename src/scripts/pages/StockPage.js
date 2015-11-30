import React, {Component, PropTypes as Types} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Map} from 'immutable';

import {getStock, setStock} from '../actions/DetailedStockActions';
import UserStocksStore from '../stores/UserStocksStore';
import DetailedStockStore from '../stores/DetailedStockStore';

@connectToStores
class StockPage extends Component {
  static displayName = 'StockPage';
  static propTypes = {
    userStocksState: Types.instanceOf(Map).isRequired,
    detailedStockState: Types.instanceOf(Map).isRequired,
    params: Types.object,
  };

  static getStores() {
    return [UserStocksStore, DetailedStockStore];
  }

  static getPropsFromStores() {
    return {
      userStocksState: UserStocksStore.getState(),
      detailedStockState: DetailedStockStore.getState(),
    };
  }

  componentWillMount() {
    const {userStocksState, detailedStockState, params} = this.props;
    const id = parseInt(params.id, 10);
    if (detailedStockState.get('stock').id !== id) {
      const stock = userStocksState
        .get('stocks')
        .find(currentStock => currentStock.id === id, null, -1);
      if (stock !== -1) {
        setStock(stock);
      } else {
        getStock(id);
      }
    }
  }

  render() {
    const {detailedStockState, params} = this.props;
    const stock = detailedStockState.get('stock');
    return (
      <div className="container-fluid">
        <h1>Welcome to battletits {params.id} {JSON.stringify(stock)}</h1>
      </div>
    );
  }
}

export default StockPage;
