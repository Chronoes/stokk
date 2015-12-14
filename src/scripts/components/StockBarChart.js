import React, {PropTypes as Types} from 'react';
import {Bar as BarChart, Line as LineChart} from 'react-chartjs';
import {adjustDaysShown} from '../actions/DetailedStockActions';

const StockBarChart = ({dataset, daysShown, typeLine}) => {
  const history = dataset.history.slice(0, daysShown).reverse();
  const chartData = {
    labels: history.map((data) => data.date.substring(0, 10)),
    datasets: [{
      label: 'High',
      fillColor: typeLine ? 'rgba(27, 201, 142, 0.03)' : '#1bc98e',
      strokeColor: typeLine ? '#1bc98e' : 'rgba(27, 201, 142, 0.03)',
      data: history.map((data) => data.high),
    }, {
      label: 'Low',
      fillColor: typeLine ? 'rgba(66, 165, 245, 0.03)' : '#42a5f5',
      strokeColor: typeLine ? '#42a5f5' : 'rgba(66, 165, 245, 0.03)',
      data: history.map((data) => data.low),
    }],
  };
  const chartOptions = {
    scaleFontFamily: 'SanFranciscoRegular',
    scaleFontColor: '#a9aebd',
    scaleShowGridLines: true,
    scaleGridLineColor: '#4d5053',
    showScale: true,
    toolTipEvents: ['mouseover', 'mousemove', 'touchstart', 'touchmove'],
    multiTooltipTemplate: typeLine ? '<%= value %>' : '<%if (fillColor === "#42a5f5"){%><%="low" %>: <%} else {%><%="high" %>: <%}%><%= value + " $" %>',
    tooltipFontSize: 14,
    tooltipFillColor: 'rgba(26,28,38,0.8)',
    pointHitDetectionRadius: typeLine ? 20 : 2,
    responsive: true,
    bezierCurve: false,
  };
  return (
    <div>
      <div className="range range-primary">
        <input className="slider"
          type="range"
          value={daysShown}
          min="0"
          max="100"
          onInput=""
          onChange={(event) => {adjustDaysShown(event.target.value);}}
          step="1" />
      </div>
      <h4 className="base-text">{daysShown + ' day highs and lows'}</h4>
      {typeLine ? <LineChart data={chartData} options={chartOptions} /> : <BarChart data={chartData} options={chartOptions} />}
    </div>
  );
};

StockBarChart.displayName = 'StockBarChart';
StockBarChart.propTypes = {
  dataset: Types.object.isRequired,
  daysShown: Types.number.isRequired,
  typeLine: Types.bool.isRequired,
};

export default StockBarChart;
