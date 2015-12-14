import React from 'react';
import moment from 'moment';

const SingleStockOverview = ({stock}) => {
  const {change, name, currentPrice, symbol, updatedAt, isPositiveChange} = stock;
  const isPositive = change.charAt(0) === '+';
  const updatedAgo = moment(updatedAt).fromNow();
  const positiveChangeResult = isPositiveChange ?
    'We predict that the stock price will rise' :
    'We predict that the stock price will fall';
  const changeClassModifier = isPositiveChange ? 'increase' : 'decrease';
  return (
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
      <span className={`direction-label --${changeClassModifier}`}>
        <i className={`direction-label__icon --${changeClassModifier}`} />
        {positiveChangeResult}
      </span>
    </div>
  );
};

SingleStockOverview.displayName = 'SingleStockOverview';

export default SingleStockOverview;
