import React, {Component} from 'react';

import StockGraph from './StockGraph';

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
    const {symbol, currentPrice, change, name, histories} = this.props.stock;
    const {isHovering} = this.state;
    const isPositive = change.charAt(0) === '+';
    const dataset = histories.map(history => history.close).reverse();
    return (
      <div
        className="stock-card"
        onMouseOver={() => this.startHovering()}
        onMouseOut={() => this.endHovering()}>
        {isHovering ? name : symbol}
        <button className="stock-card__close-button">
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
