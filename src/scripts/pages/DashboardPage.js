import React, {Component, PropTypes as Types} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {decode} from 'jsonwebtoken';
import {Map} from 'immutable';

import SearchStocksStore from '../stores/SearchStocksStore';
import UserStocksStore from '../stores/UserStocksStore';

import {getUserStocksWithToken} from '../actions/UserStocksActions';

import DashboardOverview from '../components/DashboardOverview';
import DashboardStocks from '../components/DashboardStocks';
import NewStockForm from '../components/NewStockForm';

@connectToStores
class DashboardPage extends Component {
  static displayName = 'DashboardPage';
  static propTypes = {
    authState: Types.instanceOf(Map).isRequired,
    searchStocksState: Types.instanceOf(Map).isRequired,
    userStocksState: Types.instanceOf(Map).isRequired,
  };

  static getStores() {
    return [SearchStocksStore, UserStocksStore];
  }

  static getPropsFromStores() {
    return {
      searchStocksState: SearchStocksStore.getState(),
      userStocksState: UserStocksStore.getState(),
    };
  }

  componentDidMount() {
    const token = this.props.authState.get('token');
    getUserStocksWithToken(token);
  }

  render() {
    const {
      authState,
      searchStocksState,
      userStocksState,
    } = this.props;
    const token = authState.get('token');
    const {email} = decode(token);
    const stocks = userStocksState.get('stocks');
    const isLoading = userStocksState.get('isLoading');

    const stockAverage = stocks.reduce((acc, current) => (
        acc + parseFloat(current.change)
      ), 0) / stocks.size;
    return (
      <div className="dashboard container-fluid">
        <DashboardOverview
          email={email}
          stockAmount={stocks.size}
          stockAverage={stockAverage} />
        <DashboardStocks
          stocks={stocks}
          token={token}
          isLoading={isLoading}
          />
        <NewStockForm
          searchStocksState={searchStocksState}
          userStocks={stocks}
          isLoading={isLoading}
          token={token}/>
      </div>
    );
  }
}

export default DashboardPage;
