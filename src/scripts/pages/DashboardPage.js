import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {decode} from 'jsonwebtoken';

import StockStore from '../stores/StockStore';

import DashboardOverview from '../components/DashboardOverview';
import DashboardStocks from '../components/DashboardStocks';
import NewStockForm from '../components/NewStockForm';

@connectToStores
class DashboardPage extends Component {
  static getStores() {
    return [StockStore];
  }

  static getPropsFromStores() {
    return {stockState: StockStore.getState()};
  }

  render() {
    const {authState} = this.props;
    const {stockState} = this.props;
    const {email} = decode(authState.get('token'));

    return (
      <div className="container-fluid">
        <DashboardOverview
          email={email}
          stockAmount={0} />
        <DashboardStocks />
        <NewStockForm stockState={stockState} />
      </div>
    );
  }
}

export default DashboardPage;
