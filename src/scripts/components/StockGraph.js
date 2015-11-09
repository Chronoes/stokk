import React from 'react';
import {Line as LineChart} from 'react-chartjs';

const StockGraph = ({dataSet}) => {
  const chartData = {
    labels: dataSet.map(() => ''),
    datasets: [{
      label: 'history',
      data: dataSet,
      strokeColor: '#1ca8dd',
      fillColor: 'rgba(28,168,221,0.03)',
      pointColor: 'transparent',
      pointStrokeColor: 'transparent',
    }],
  };
  const chartOptions = {
    scaleFontFamily: 'SanFranciscoRegular',
    scaleShowGridLines: false,
    showScale: false,
    toolTipEvents: ['mouseover', 'mousemove', 'touchstart', 'touchmove'],
    pointHitDetectionRadius: 3,
  };
  return (
    <LineChart
      data={chartData}
      options={chartOptions} />
  );
};

export default StockGraph;
