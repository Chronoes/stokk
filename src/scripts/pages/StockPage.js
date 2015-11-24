import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';

import {getStock, setStock} from '../actions/DetailedStockActions';
import UserStocksStore from '../stores/UserStocksStore';
import DetailedStockStore from '../stores/DetailedStockStore';

@connectToStores
class StockPage extends Component {
  static displayName = 'StockPage';

  static getStores() {
    return [UserStocksStore, DetailedStockStore];
  }

  static getPropsFromStores() {
    return {
      userStocksState: UserStocksStore.getState(),
      detailedStockState: DetailedStockStore.getState(),
    };
  }

  componentDidMount() {
    const {userStocksState, detailedStockState, params} = this.props;
    if (detailedStockState.get('stock').id !== params.id) {
      const stock = userStocksState
        .get('stocks')
        .find(currentStock => currentStock.id === params.id, null, -1);
      if (stock !== -1) {
        setStock(stock);
      } else {
        getStock(parseInt(params.id, 10));
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