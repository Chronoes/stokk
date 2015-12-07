import React, {Component, PropTypes as Types} from 'react';

import fuckAlt from '../services/fuckAlt';
import {getStock, setStock} from '../actions/DetailedStockActions';
import UserStocksStore from '../stores/UserStocksStore';
import DetailedStockStore from '../stores/DetailedStockStore';

import SingleStockOverview from '../components/SingleStockOverview';
import Preloader from '../components/Preloader';

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
    const {detailedStockState, userStocksState} = this.state;
    const {params} = this.props;
    const id = parseInt(params.id, 10);
    if (id !== detailedStockState.get('stock').id) {
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
    const {detailedStockState} = this.state;
    const isLoading = detailedStockState.get('isLoading');
    const stock = detailedStockState.get('stock');
    const preloader = (
      <div className="row">
        <div className="col-xs-12">
          <div className="dashboard__section" style={{textAlign: 'center'}}>
            <Preloader />
          </div>
        </div>
      </div>
    );
    const page = isLoading ? preloader : <SingleStockOverview stock={stock} />;
    return (
      <div className="container-fluid">
        {page}
      </div>
    );
  }
}

export default StockPage;
