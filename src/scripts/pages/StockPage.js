import React, {Component, PropTypes as Types} from 'react';

import fuckAlt from '../services/fuckAlt';
import {getStock} from '../actions/DetailedStockActions';
import {getUserStocksWithToken} from '../actions/UserStocksActions';
import UserStocksStore from '../stores/UserStocksStore';
import DetailedStockStore from '../stores/DetailedStockStore';

import Preloader from '../components/Preloader';
import SingleStockOverview from '../components/SingleStockOverview';
import DetailedStockForm from '../components/DetailedStockForm';
import DetailedStockChart from '../components/DetailedStockChart';

@fuckAlt
class StockPage extends Component {
  static displayName = 'StockPage';
  static propTypes = {
    params: Types.object,
    authState: Types.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      detailedStockState: DetailedStockStore.getState(),
      userStocksState: UserStocksStore.getState(),
    };
    this.onDetailedStockStateChange = this.onDetailedStockStateChange.bind(this);
    this.onUserStocksStateChange = this.onUserStocksStateChange.bind(this);

    DetailedStockStore.listen(this.onDetailedStockStateChange);
    UserStocksStore.listen(this.onUserStocksStateChange);
  }

  componentWillUnmount() {
    DetailedStockStore.unlisten(this.onDetailedStockStateChange);
    UserStocksStore.unlisten(this.onUserStocksStateChange);
  }

  onDetailedStockStateChange(newState) {
    this.state.detailedStockState = newState;
    this.setState(this.state);
  }

  onUserStocksStateChange(newState) {
    this.state.userStocksState = newState;
    this.setState(this.state);
  }

  componentWillMount() {
    const {authState} = this.props;
    const {detailedStockState, userStocksState} = this.state;
    const {params} = this.props;
    const id = parseInt(params.id, 10);
    if (id !== detailedStockState.get('stock').id) {
      getStock(id);
    }
    if (userStocksState.get('stocks').size === 0) {
      getUserStocksWithToken(authState.get('token'));
    }
  }

  render() {
    const {authState} = this.props;
    const {detailedStockState, userStocksState} = this.state;
    const isLoading = detailedStockState.get('isLoading');
    const stock = detailedStockState.get('stock');
    const daysShown = detailedStockState.get('amountOfDaysShown');
    const checkboxes = detailedStockState.get('checkboxes');
    const isUserStock = stock ? userStocksState
      .get('stocks')
      .findIndex(userStock => userStock.id === stock.id) !== -1 : false;
    const preloader = (
      <div className="row">
        <div className="col-xs-12">
          <div className="dashboard__section" style={{textAlign: 'center'}}>
            <Preloader />
          </div>
        </div>
      </div>
    );
    const page = isLoading ? preloader : (
      <div className="row">
        <div className="col-xs-12 col-md-4">
          <SingleStockOverview
            stock={stock}
            isUserStock={isUserStock}
            token={authState.get('token')}
            isLoading={userStocksState.get('stocks').size > 0 ? userStocksState.get('isLoading') : false}/>
          <DetailedStockForm historyLength={stock.history.length} daysShown={daysShown} checkboxes={checkboxes} />
        </div>
        <div className="col-xs-12 col-md-8">
          <DetailedStockChart dataset={stock} daysShown={daysShown} checkboxes={checkboxes} />
        </div>
      </div>
    );
    return (
      <div className="container-fluid">
        {page}
      </div>
    );
  }
}

export default StockPage;
