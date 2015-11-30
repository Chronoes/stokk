import React, {Component, PropTypes as Types} from 'react';
import {List} from 'immutable';

import Alert from './Alert';
import NewStockPreview from './NewStockPreview';

class NewStockList extends Component {
  static displayName = 'NewStockList';
  static propTypes = {
    userStocks: Types.instanceOf(List).isRequired,
    stocks: Types.instanceOf(List).isRequired,
    errorMessage: Types.string.isRequired,
    token: Types.string.isRequired,
    isLoading: Types.oneOfType([Types.string, Types.bool]),
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.stocks.size > 0 || nextProps.errorMessage.length > 0;
  }

  render() {
    const {stocks, token, errorMessage, userStocks, isLoading} = this.props;
    return (
      <div>
        {errorMessage ? <Alert message={errorMessage} type="warning" margin="top" /> : ''}
        {stocks.map((stock, index) => (
          <NewStockPreview
            key={index}
            stock={stock}
            token={token}
            isLoading={isLoading === stock.symbol}
            stockExists={userStocks.some(element => element.symbol === stock.symbol)}/>
          ))}
      </div>
    );
  }
}

export default NewStockList;
