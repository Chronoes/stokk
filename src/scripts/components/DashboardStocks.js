import React from 'react';

import StrikedText from './StrikedText';

const DashboardStocks = () => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <StrikedText>
          Your stocks
        </StrikedText>
        <div className="dashboard-section base-text">
          Your stocks will appear here
          {/* TODO: show stocks here */}
        </div>
      </div>
    </div>
  );
};

DashboardStocks.displayName = 'DashboardStocks';

export default DashboardStocks;
