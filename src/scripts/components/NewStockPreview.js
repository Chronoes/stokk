import React, {Component} from 'react';

import {addNewStockWithToken} from '../actions/UserStocksActions';

class NewStockPreview extends Component {

  onAddStockSubmit() {
    addNewStockWithToken(this.props.stock.symbol, this.props.token);
  }

  render() {
    const {stock} = this.props;
    const {symbol, name} = stock;
    return (
      <div className="stock-preview">
        <div className="stock-preview__symbol">{symbol}</div>
        <span className="stock-preview__name">
          {name}
        </span>
        <button
          onClick={this.onAddStockSubmit.bind(this)}
          className="stock-preview__add-button btn btn-primary-outline">
          add
        </button>
      </div>
    );
  }
}

export default NewStockPreview;
