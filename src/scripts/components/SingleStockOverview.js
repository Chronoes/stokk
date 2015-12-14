import React from 'react';
import moment from 'moment';
import StockBarChart from './StockBarChart';

const SingleStockOverview = ({stock, daysShown}) => {
  const {change, name, currentPrice, symbol, updatedAt} = stock;
  const isPositive = change.charAt(0) === '+';
  const updatedAgo = moment(updatedAt).fromNow();
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="dashboard__section">
          <h4 className="dashboard__heading">
            {symbol} - {name}
          </h4>
          <span className="base-text">
            {currentPrice} $
          </span>
          <span className={`change-label --${isPositive ? 'increase' : 'decrease'}`}>
            {change}
          </span>
          <span className="base-text">
            {' '} last updated {updatedAgo}
          </span>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <StockBarChart dataset={stock} days={daysShown} typeLine/>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <StockBarChart dataset={stock} days={daysShown} typeLine={false}/>
        </div>
      </div>
    </div>
  );
};

SingleStockOverview.displayName = 'SingleStockOverview';

export default SingleStockOverview;
