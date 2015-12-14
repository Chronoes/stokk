import React, {PropTypes as Types} from 'react';
import {Bar as BarChart, Line as LineChart} from 'react-chartjs';
import {adjustDaysShown} from '../actions/DetailedStockActions';

const DetailedStockChart = ({dataset, daysShown, typeLine}) => {
  const chartData = {
    labels: dataset.history.slice(-daysShown).map((data) => data.date.substring(0, 10)),
    datasets:
      [
        {
          label: 'High',
          pointColor: '#1bc98e',
          fillColor: typeLine ? 'rgba(27, 201, 142, 0.03)' : '#1bc98e',
          strokeColor: typeLine ? '#1bc98e' : 'rgba(27, 201, 142, 0.03)',
          data: dataset.history.slice(-daysShown).map((data) => data.high),
        },
        {
          label: 'Low',
          pointColor: '#f54242',
          fillColor: typeLine ? 'rgba(66, 165, 245, 0.03)' : '#f54242',
          strokeColor: typeLine ? '#f54242' : 'rgba(66, 165, 245, 0.03)',
          data: dataset.history.slice(-daysShown).map((data) => data.low),
        },
        {
          label: 'Open',
          pointColor: '#42a5f5',
          fillColor: typeLine ? 'rgba(66, 165, 245, 0.03)' : '#42a5f5',
          strokeColor: typeLine ? '#42a5f5' : 'rgba(66, 165, 245, 0.03)',
          data: dataset.history.slice(-daysShown).map((data) => data.open),
        },
      ],
  };
  const lineTooltipTemplate = '<%if (fillColor == "#42a5f5"){%><%="open" %>: <%} else if (fillColor == "#f54242"){%><%="low" %>: <%} else {%><%="high" %>: <%}%><%= value + " $" %>';
  const barTooltipTemplate = '<%if (fillColor == "#42a5f5"){%><%="open" %>: <%} else if (fillColor == "#f54242"){%><%="low" %>: <%} else {%><%="high" %>: <%}%><%= value + " $" %>';
  const chartOptions = {
    scaleFontFamily: 'SanFranciscoRegular',
    scaleFontColor: '#a9aebd',
    scaleShowGridLines: true,
    scaleGridLineColor: '#4d5053',
    showScale: true,
    toolTipEvents: ['mouseover', 'mousemove', 'touchstart', 'touchmove'],
    multiTooltipTemplate: typeLine ? lineTooltipTemplate : barTooltipTemplate,
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
          defaultValue={daysShown}
          min="2"
          max={dataset.history.length}
          onInput=""
          onChange={event => adjustDaysShown(parseInt(event.target.value, 10))}
          step="1" />
      </div>
      <h4 className="base-text">{daysShown + ' day highs and lows'}</h4>
      {typeLine ? <LineChart data={chartData} options={chartOptions} redraw/> : <BarChart data={chartData} options={chartOptions} redraw/>}
    </div>
  );
};

DetailedStockChart.displayName = 'DetailedStockChart';
DetailedStockChart.propTypes = {
  dataset: Types.object.isRequired,
  daysShown: Types.number.isRequired,
  typeLine: Types.bool.isRequired,
};

export default DetailedStockChart;
