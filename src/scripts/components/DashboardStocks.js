import React from 'react';

import StrikedText from './StrikedText';
import DashboardStock from './DashboardStock';

const DashboardStocks = ({stocks}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <StrikedText>
          Your stocks
        </StrikedText>
        <div className="dashboard__section">
          {stocks.map(stock => (<DashboardStock stock={stock} key={stock.id} />))}
        </div>
      </div>
    </div>
  );
};

DashboardStocks.displayName = 'DashboardStocks';

export default DashboardStocks;
