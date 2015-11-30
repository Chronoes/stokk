import React, {PropTypes as Types} from 'react';
import {List} from 'immutable';

import StrikedText from './StrikedText';
import StockCard from './StockCard';
import Alert from './Alert';

const DashboardStocks = ({stocks, token}) => {
  const stockNodes = stocks.map(stock => (
    <StockCard
      stock={stock}
      token={token}
      key={stock.id} />
  )).toArray();

  return (
    <div className="row">
      <div className="col-xs-12">
        <StrikedText>
          Your stocks
        </StrikedText>
        <div className="dashboard__section">
          {stocks.size ? stockNodes : <div className="dashboard__info-alert"><Alert message="No stocks added yet, add one below." type="info" /></div>}
        </div>
      </div>
    </div>
  );
};

DashboardStocks.displayName = 'DashboardStocks';

DashboardStocks.propTypes = {
  stocks: Types.instanceOf(List).isRequired,
  token: Types.string.isRequired,
};

export default DashboardStocks;
