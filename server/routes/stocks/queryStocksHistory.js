import moment from 'moment';
import Stock from '../../models/Stock';
import {stockHistoryTimeLimit} from '../../conf';

export default (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const betweenDates = [moment.utc().subtract(stockHistoryTimeLimit), moment.utc()];
  return Stock.findOne({where: {symbol}})
  .then(stock => {
    if (stock !== null) {
      return stock.getHistory({
        where: {date: {$between: betweenDates.map(date => date.format('YYYY-MM-DD'))}},
      })
      .then(history => {
        if (history.length < stockHistoryTimeLimit.days()) {
          return res.status(501).json({
            message: `Need to update history: count ${history.length}, limit ${stockHistoryTimeLimit.days()}`,
          });
        }
        return res.status(200).json({
          message: `Retrieved ${history.length} days of data.`,
          history,
        });
      });
    }
    return res.status(404).json({
      message: `Stock "${symbol}" does not exist.`,
    });
  })
  .catch(() =>
    res.status(500).json({
      message: 'Something happened.',
    }));
};
