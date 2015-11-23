import React, {Component} from 'react';

import Preloader from './Preloader';
import {addNewStockWithToken} from '../actions/UserStocksActions';
import {deleteUserStockWithToken} from '../actions/UserStocksActions';

class NewStockPreview extends Component {

  render() {
    const {stock, stockExists, token, isLoading} = this.props;
    const {symbol, name} = stock;

    const addButton = (
      <button
        onClick={() => addNewStockWithToken(symbol, token)}
        className="stock-preview__button btn btn-primary"
        ref="stockPreviewButton"
        onFocus={() => this.refs.stockPreviewButton.blur()}>
        {isLoading ? <Preloader /> : 'add'}
      </button>
    );
    const removeButton = (
      <button
        onClick={() => deleteUserStockWithToken(symbol, token)}
        className="stock-preview__button btn btn-primary"
        ref="stockPreviewButton"
        onFocus={() => this.refs.stockPreviewButton.blur()}>
        {isLoading ? <Preloader /> : 'remove'}
      </button>
    );
    return (
      <div className="stock-preview">
        <div className="stock-preview__symbol">{symbol}</div>
        <span className="stock-preview__name">
          {name}
        </span>
        {stockExists ? removeButton : addButton}
      </div>
    );
  }
}

export default NewStockPreview;
