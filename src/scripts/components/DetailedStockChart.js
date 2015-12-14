import React, {PropTypes as Types} from 'react';
import {Line as LineChart} from 'react-chartjs';

const DetailedStockChart = ({dataset, daysShown, checkboxes}) => {
  const chartDatasets = [
    {
      label: 'high',
      pointColor: '#1bc98e',
      fillColor: 'rgba(27, 201, 142, 0.03)',
      strokeColor: '#1bc98e',
      data: dataset.history.slice(-daysShown).map((data) => data.high),
    },
    {
      label: 'low',
      pointColor: '#f54242',
      fillColor: 'rgba(66, 165, 245, 0.03)',
      strokeColor: '#f54242',
      data: dataset.history.slice(-daysShown).map((data) => data.low),
    },
    {
      label: 'close',
      pointColor: '#42a5f5',
      fillColor: 'rgba(66, 165, 245, 0.03)',
      strokeColor: '#42a5f5',
      data: dataset.history.slice(-daysShown).map((data) => data.close),
    },
  ];
  const chartDataAndLabels = {
    labels: dataset.history.slice(-daysShown).map((data) => data.date.substring(0, 10)),
    datasets: chartDatasets.filter(chartData => checkboxes.get(chartData.label)),
  };
  const tooltipTemplate = '<%if (fillColor == "#42a5f5"){%><%="close" %>: <%} else if (fillColor == "#f54242"){%><%="low" %>: <%} else {%><%="high" %>: <%}%><%= value + " $" %>';
  const chartOptions = {
    scaleFontFamily: 'SanFranciscoRegular',
    scaleFontColor: '#a9aebd',
    scaleShowGridLines: true,
    scaleGridLineColor: '#4d5053',
    showScale: true,
    toolTipEvents: ['mouseover', 'mousemove', 'touchstart', 'touchmove'],
    multiTooltipTemplate: tooltipTemplate,
    tooltipFontSize: 14,
    tooltipFillColor: 'rgba(26,28,38,0.8)',
    pointHitDetectionRadius: 30,
    responsive: true,
    bezierCurve: false,
  };
  return (
    <div className="dashboard__section">
      <LineChart data={chartDataAndLabels} options={chartOptions} redraw/>
    </div>
  );
};

DetailedStockChart.displayName = 'DetailedStockChart';
DetailedStockChart.propTypes = {
  dataset: Types.object.isRequired,
  daysShown: Types.number.isRequired,
  checkboxes: Types.object.isRequired,
};

export default DetailedStockChart;
