import React from 'react';
import moment from 'moment';

const SingleStockOverview = ({stock}) => {
  const {change, name, currentPrice, symbol, updatedAt, isPositiveChange, yearLow, yearHigh} = stock;
  const isPositive = change.charAt(0) === '+';
  const updatedAgo = moment(updatedAt).fromNow();
  const positiveChangeResult = isPositiveChange ?
    'We predict that the stock price will rise' :
    'We predict that the stock price will fall';
  const changeClassModifier = isPositiveChange ? 'increase' : 'decrease';
  return (
    <div className="dashboard__section">
      <div className="information">
        <h4 className="dashboard__heading">
          {symbol} - {name}
        </h4>
        <span className=" white base-text">
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
        <div className="statistics-container">
          <div className="statistics --element">
            <span className="statistics --number">{yearLow} $</span>
            <span className="statistics --desc">Year lowest</span>
          </div>
          <div className="statistics --element">
            <span className="statistics --number">{yearHigh} $</span>
            <span className="statistics --desc">Year highest</span>
          </div>
        </div>
      </div>
  );
};

SingleStockOverview.displayName = 'SingleStockOverview';

export default SingleStockOverview;
