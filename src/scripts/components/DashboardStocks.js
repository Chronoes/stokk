import React from 'react';

import StrikedText from './StrikedText';
import StockCard from './StockCard';

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
          {stockNodes}
        </div>
      </div>
    </div>
  );
};

DashboardStocks.displayName = 'DashboardStocks';

export default DashboardStocks;
