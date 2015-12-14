import React from 'react';
import moment from 'moment';
import StockBarChart from './StockBarChart';

const SingleStockOverview = ({stock}) => {
  const {change, name, currentPrice, symbol, updatedAt, isPositiveChange} = stock;
  const isPositive = change.charAt(0) === '+';
  const updatedAgo = moment(updatedAt).fromNow();
  const positiveChangeResult = isPositiveChange ?
    'We predict that the stock is going up' :
    'We predict that the stock is going down';
  const changeClassModifier = isPositiveChange ? 'increase' : 'decrease';
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
          <span className={`direction-label --${changeClassModifier}`}>
            <i className={`direction-label__icon --${changeClassModifier}`}></i>
            {positiveChangeResult}
          </span>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <StockBarChart dataset={stock} days={10} typeLine/>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <StockBarChart dataset={stock} days={10} typeLine={false}/>
        </div>
      </div>
    </div>
  );
};

SingleStockOverview.displayName = 'SingleStockOverview';

export default SingleStockOverview;
