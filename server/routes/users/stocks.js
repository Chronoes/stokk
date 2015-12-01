import moment from 'moment';
import {bulkUpdateDatabase, bulkUpdateHistory, reloadFromDatabase, getHistory} from '../../util';
import {stockHistoryTimeLimit} from '../../conf';

export default (req, res) => {
  const {user} = req;
  const betweenDates = [moment.utc().subtract(stockHistoryTimeLimit), moment.utc()];
  return user.getStocks()
    .then(stocks => bulkUpdateDatabase(stocks)
      .then(() => bulkUpdateHistory(stocks, betweenDates)
      .then(() => reloadFromDatabase(stocks))))
    .then(stocks => Promise.all(stocks.map(stock => getHistory(stock, betweenDates)))
      .then(histories =>
        res.status(200).json({
          message: `Retrieved ${stocks.length} stocks and ${histories.length ? histories[0].length : 0} days of data.`,
          stocks: stocks.map((stock, i) => {
            const stockjson = stock.toJSON();
            if (histories[i]) {
              stockjson.history = histories[i];
            }
            delete stockjson.user_stock;
            delete stockjson.createdAt;
            return stockjson;
          }),
        })))
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      })
    );
};
