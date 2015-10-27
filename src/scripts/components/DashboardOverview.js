import React from 'react';

const DashboardOverview = ({email, stockAmount}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="dashboard-section">
          <h4 className="dashboard-heading">
            Welcome back, {email}
          </h4>
          <p className="base-text">
            You have {stockAmount} currently selected stocks.
          </p>
        </div>
      </div>
    </div>
  );
};

DashboardOverview.displayName = 'DashboardOverview';

export default DashboardOverview;
