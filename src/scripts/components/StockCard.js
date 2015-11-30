import React, {Component, PropTypes as Types} from 'react';
import {Link} from 'react-router';

import StockGraph from './StockGraph';
import {deleteUserStockWithToken} from '../actions/UserStocksActions';

class StockCard extends Component {
  static displayName = 'StockCard';
  static propTypes = {
    stock: Types.object.isRequired,
    token: Types.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isHovering: false};
  }

  startHovering() {
    this.setState({isHovering: true});
  }

  endHovering() {
    this.setState({isHovering: false});
  }

  render() {
    const {stock, token} = this.props;
    const {symbol, currentPrice, change, name, history} = stock;
    const {isHovering} = this.state;
    const isPositive = change.charAt(0) === '+';
    const dataset = history.map(dataPoint => dataPoint.close).reverse();
    return (
      <div
        className="stock-card"
        onMouseOver={() => this.startHovering()}
        onMouseOut={() => this.endHovering()}>
        <button
          className="stock-card__close-button"
          onClick={() => deleteUserStockWithToken(symbol, token)}>
        </button>
        <Link to={`/stock/${stock.id}`} className="stock-card__link">
          {isHovering ? name : symbol}
          <br />
          <span className="stock-card__price-text">
            {currentPrice}
          </span>
          <span className={`change-label --aligned-in-card --${isPositive ? 'increase' : 'decrease'}`}>
            {change}
          </span>
        </Link>
        <StockGraph dataset={dataset} />
      </div>
    );
  }
}

export default StockCard;
