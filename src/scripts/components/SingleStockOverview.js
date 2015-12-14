import React from 'react';
import moment from 'moment';
import DetailedStockForm from './DetailedStockForm';
import DetailedStockChart from './DetailedStockChart';

const SingleStockOverview = ({stock, daysShown, checkboxes}) => {
  const {change, name, currentPrice, symbol, updatedAt, isPositiveChange} = stock;
  const isPositive = change.charAt(0) === '+';
  const updatedAgo = moment(updatedAt).fromNow();
  const positiveChangeResult = isPositiveChange ?
    'We predict that the stock price is going up' :
    'We predict that the stock price is going down';
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
            <i className={`direction-label__icon --${changeClassModifier}`} />
            {positiveChangeResult}
          </span>
        </div>
        <div className="col-xs-12 col-xs-offset-0">
          <DetailedStockForm historyLength={stock.history.length} daysShown={daysShown} checkboxes={checkboxes} />
          <DetailedStockChart dataset={stock} daysShown={daysShown} checkboxes={checkboxes} />
        </div>
      </div>
    </div>
  );
};

SingleStockOverview.displayName = 'SingleStockOverview';

export default SingleStockOverview;
