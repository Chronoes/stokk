import React from 'react';
import moment from 'moment';

const SingleStockOverview = ({stock}) => {
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
      </div>
    </div>
  );
};

SingleStockOverview.displayName = 'SingleStockOverview';

export default SingleStockOverview;
