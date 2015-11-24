import React, {Component} from 'react';

import {deleteUserStockWithToken, addNewStockWithToken} from '../actions/UserStocksActions';

class NewStockPreview extends Component {
  render() {
    const {stock, stockExists, token, isLoading} = this.props;
    const {symbol, name} = stock;
    const loader = (
      <span className="new-stock-form__preloader --background"></span>
    );
    const addButton = (
      <button
        onClick={() => addNewStockWithToken(symbol, token)}
        className="stock-preview__button btn btn-primary"
        ref="stockPreviewButton"
        onFocus={() => this.refs.stockPreviewButton.blur()}>
        {isLoading ? loader : 'add'}
      </button>
    );
    const removeButton = (
      <button
        onClick={() => deleteUserStockWithToken(symbol, token)}
        className="stock-preview__button btn btn-primary"
        ref="stockPreviewButton"
        onFocus={() => this.refs.stockPreviewButton.blur()}>
        {isLoading ? loader : 'remove'}
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
