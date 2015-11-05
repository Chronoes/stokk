import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {decode} from 'jsonwebtoken';

import SearchStocksStore from '../stores/SearchStocksStore';
import UserStocksStore from '../stores/UserStocksStore';

import {getUserStocksWithToken} from '../actions/UserStocksActions';

import DashboardOverview from '../components/DashboardOverview';
import DashboardStocks from '../components/DashboardStocks';
import NewStockForm from '../components/NewStockForm';

@connectToStores
class DashboardPage extends Component {
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
    const {email} = decode(authState.get('token'));

    return (
      <div className="container-fluid">
        <DashboardOverview
          email={email}
          stockAmount={0} />
        <DashboardStocks stocks={userStocksState.get('stocks')}/>
        <NewStockForm searchStocksState={searchStocksState} authState={authState}/>
      </div>
    );
  }
}

export default DashboardPage;
