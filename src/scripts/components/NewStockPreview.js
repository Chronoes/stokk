import React, {PropTypes as Types} from 'react';
import {List} from 'immutable';

import {addNewStockWithToken} from '../actions/UserStocksActions';
import {deleteUserStockWithToken} from '../actions/UserStocksActions';

const NewStockPreview = ({stock, userStocks, token}) => {
  const {symbol, name} = stock;
  const isInUserStocks = userStocks.some(element =>
    element.symbol === stock.symbol
  );
  const addButton = (
    <button
      onClick={() => addNewStockWithToken(symbol, token)}
      className="stock-preview__add-button btn btn-primary-outline">
      add
    </button>
  );
  const removeButton = (
    <button
      onClick={() => deleteUserStockWithToken(symbol, token)}
      className="stock-preview__add-button btn btn-primary-outline">
      remove
    </button>
  );
  return (
    <div className="stock-preview">
      <div className="stock-preview__symbol">{symbol}</div>
      <span className="stock-preview__name">
        {name}
      </span>
      {isInUserStocks ? removeButton : addButton}
    </div>
  );
};

NewStockPreview.propTypes = {
  stock: Types.shape({
    symbol: Types.string.isRequired,
    name: Types.string.isRequired,
  }).isRequired,
  token: Types.string.isRequired,
  userStocks: Types.instanceOf(List).isRequired,
};

NewStockPreview.displayName = 'NewStockPreview';

export default NewStockPreview;
