import React, {PropTypes as Types} from 'react';

const DashboardOverview = ({email, stockAmount, stockAverage}) => {
  const roundedAverage = parseFloat(stockAverage.toFixed(3));
  const hasStocksNode = (
    <span>
      You have {stockAmount} current stocks, with an average change of
      <span className={`change-label --${roundedAverage > 0 ? 'increase' : 'decrease'}`}>
        {(roundedAverage > 0 ? '+' : '-') + roundedAverage}
      </span>
    </span>
  );

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="dashboard__section">
          <h4 className="dashboard__heading">
            Welcome back, {email}
          </h4>
          <p className="base-text">
            {stockAmount ? hasStocksNode : 'You have no current stocks. Add one below!'}
          </p>
        </div>
      </div>
    </div>
  );
};

DashboardOverview.propTypes = {
  email: Types.string.isRequired,
  stockAmount: Types.number.isRequired,
  stockAverage: Types.number.isRequired,
};

DashboardOverview.displayName = 'DashboardOverview';

export default DashboardOverview;
