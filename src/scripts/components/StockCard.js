import React, {Component} from 'react';

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
    const {symbol, currentPrice, change, name} = this.props.stock;
    const {isHovering} = this.state;
    const isPositive = change.charAt(0) === '+';
    return (
      <div
        className="stock-card"
        onMouseOver={() => this.startHovering()}
        onMouseOut={() => this.endHovering()}>
        {isHovering ? name : symbol}
        <br />
        <span className="stock-card__price-text">
          {currentPrice}
        </span>
        <span className={`change-label --aligned-in-card --${isPositive ? 'increase' : 'decrease'}`}>
          {change}
        </span>
      </div>
    );
  }
}

export default StockCard;
