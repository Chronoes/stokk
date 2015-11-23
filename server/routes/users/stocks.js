import moment from 'moment';
import {bulkUpdateDatabase, bulkUpdateHistory, reloadFromDatabase, formatDates} from '../../util';
import {stockHistoryTimeLimit} from '../../conf';

export default (req, res) => {
  const {user} = req;
  const betweenDates = [moment.utc().subtract(stockHistoryTimeLimit), moment.utc()];
  return user.getStocks()
    .then(stocks => bulkUpdateDatabase(stocks).then(() => reloadFromDatabase(stocks)))
    .then(stocks => bulkUpdateHistory(stocks, betweenDates)
      .then(() => Promise.all(stocks.map(stock => stock.getHistory({
        where: {date: {$between: formatDates(betweenDates)}},
      }))))
      .then(histories =>
        res.status(200).json({
          message: `Retrieved ${stocks.length} stocks and ${histories.length ? histories[0].length : 0} days of data.`,
          stocks: stocks.map((stock, i) => {
            const stockjson = stock.toJSON();
            if (histories[i]) {
              stockjson.history = histories[i];
            }
            return stockjson;
          }),
        })))
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      })
    );
};
