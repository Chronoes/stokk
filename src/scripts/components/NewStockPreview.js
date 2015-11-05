import React from 'react';

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
        <form onSubmit={this.onAddStockSubmit.bind(this)}>
        <button
          className="stock-preview__add-button"
          type="submit">
          add
        </button>
        </form>
      </div>
    );
  }
}

export default NewStockPreview;
