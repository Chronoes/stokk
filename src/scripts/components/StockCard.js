import React, {Component} from 'react';

import StockGraph from './StockGraph';
import {deleteUserStockWithToken} from '../actions/UserStocksActions';

class StockCard extends Component {
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
        {isHovering ? name : symbol}
        <button
          className="stock-card__close-button"
          onClick={() => deleteUserStockWithToken(symbol, token)}>
          &times;
        </button>
        <br />
        <span className="stock-card__price-text">
          {currentPrice}
        </span>
        <span className={`change-label --aligned-in-card --${isPositive ? 'increase' : 'decrease'}`}>
          {change}
        </span>
        <StockGraph dataset={dataset} />
      </div>
    );
  }
}

export default StockCard;
