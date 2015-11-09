import React, {PropTypes as Types} from 'react';
import {Line as LineChart} from 'react-chartjs';

const StockGraph = ({dataset}) => {
  const chartData = {
    labels: dataset.map(() => ''),
    datasets: [{
      label: 'history',
      data: dataset,
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
    pointHitDetectionRadius: 2,
    responsive: true,
    bezierCurve: false,
  };
  return (
    <LineChart
      data={chartData}
      options={chartOptions} />
  );
};

StockGraph.propTypes = {dataset: Types.arrayOf(Types.number).isRequired};
StockGraph.displayName = 'StockGraph';

export default StockGraph;
