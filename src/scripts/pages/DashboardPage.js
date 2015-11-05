import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {decode} from 'jsonwebtoken';

import SearchStocksStore from '../stores/SearchStocksStore';

import DashboardOverview from '../components/DashboardOverview';
import DashboardStocks from '../components/DashboardStocks';
import NewStockForm from '../components/NewStockForm';

@connectToStores
class DashboardPage extends Component {
  static getStores() {
    return [SearchStocksStore];
  }

  static getPropsFromStores() {
    return {searchStocksState: SearchStocksStore.getState()};
  }

  render() {
    const {authState, searchStocksState} = this.props;
    const {email} = decode(authState.get('token'));

    return (
      <div className="container-fluid">
        <DashboardOverview
          email={email}
          stockAmount={0} />
        <DashboardStocks />
        <NewStockForm searchStocksState={searchStocksState} authState={authState}/>
      </div>
    );
  }
}

export default DashboardPage;
