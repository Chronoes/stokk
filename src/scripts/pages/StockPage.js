import React, {Component, PropTypes as Types} from 'react';

import fuckAlt from '../services/fuckAlt';
import {getStock} from '../actions/DetailedStockActions';
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
    const {detailedStockState} = this.state;
    const {params} = this.props;
    const id = parseInt(params.id, 10);
    if (id !== detailedStockState.get('stock').id) {
      getStock(id);
    }
  }

  render() {
    const {detailedStockState} = this.state;
    const isLoading = detailedStockState.get('isLoading');
    const stock = detailedStockState.get('stock');
    const daysShown = detailedStockState.get('amountOfDaysShown');
    const checkboxes = detailedStockState.get('checkboxes');
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
          <SingleStockOverview stock={stock} />
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
