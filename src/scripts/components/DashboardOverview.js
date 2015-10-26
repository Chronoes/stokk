import React from 'react';

const DashboardOverview = ({email, stockAmount}) => {
  return (
    <div className="col-xs-12">
      <div className="dashboard-panel">
        <h4 className="dashboard-overview-heading">
          Welcome back, {email}
        </h4>
        <p className="base-text">
          You have {stockAmount} currently selected stocks.
        </p>
      </div>
    </div>
  );
};

DashboardOverview.displayName = 'DashboardOverview';

export default DashboardOverview;
