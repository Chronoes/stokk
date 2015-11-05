import React from 'react';

const DashboardStock = ({stock}) => {
  return (
    <div>
      I am a DashboardStock with {JSON.stringify(stock)}
    </div>
  );
};

DashboardStock.displayName = 'DashboardStock';
export default DashboardStock;
