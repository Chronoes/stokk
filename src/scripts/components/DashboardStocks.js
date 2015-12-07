import React, {PropTypes as Types} from 'react';
import {List} from 'immutable';

import StrikedText from './StrikedText';
import StockCard from './StockCard';
import Alert from './Alert';
import Preloader from './Preloader';

const DashboardStocks = ({stocks, token, isLoading}) => {
  const stockNodes = stocks.map(stock => (
    <StockCard
      stock={stock}
      token={token}
      key={stock.id} />
  )).toArray();

  const loadingResponse = (
    <div className="dashboard__info-alert">
      {!stocks.size && isLoading ? <Preloader /> : <Alert message="No stocks added yet, add one below." type="info" />}
    </div>
  );

  return (
    <div className="row">
      <div className="col-xs-12">
        <StrikedText>
          Your stocks
        </StrikedText>
        <div className="dashboard__section">
          {stocks.size ? stockNodes : loadingResponse}
        </div>
      </div>
    </div>
  );
};

DashboardStocks.displayName = 'DashboardStocks';

DashboardStocks.propTypes = {
  stocks: Types.instanceOf(List).isRequired,
  token: Types.string.isRequired,
  isLoading: Types.oneOfType([Types.string, Types.bool]),
};

export default DashboardStocks;
