import React, {Component} from 'react';

import {addNewStockWithToken} from '../actions/UserStocksActions';

class NewStockPreview extends Component {

  onAddStockSubmit() {
    addNewStockWithToken(this.props.stock.symbol, this.props.authState.get('token'));
  }

  render() {
    const {stock} = this.props;
    const {symbol, name} = stock;
    return (
      <div className="stock-preview">
        {`${symbol} ${name}`}
        <button
          onClick={this.onAddStockSubmit.bind(this)}
          className="stock-preview__add-button">
          add
        </button>
      </div>
    );
  }
}

export default NewStockPreview;
