import moment from 'moment';
import Stock from '../../models/Stock';
import {updateDatabase, reloadFromDatabase, updateHistory, getHistory} from '../../util';
import {stockHistoryTimeLimit} from '../../conf';

export default (req, res, next) => {
  const {searchString} = req.params;
  const pattern = /^[0-9]+$/;
  if (!pattern.test(searchString)) {
    return next();
  }
  const stockId = parseInt(searchString, 10);
  const betweenDates = [moment.utc().subtract(stockHistoryTimeLimit), moment.utc()];
  return Stock.findById(stockId)
    .then(stock => {
      if (stock !== null) {
        return updateDatabase(stock)
        .then(() => updateHistory(stock, betweenDates))
        .then(() => reloadFromDatabase(stock))
        .then(updatedStock => getHistory(updatedStock, betweenDates)
          .then(history => {
            const stockWithHistory = updatedStock.toJSON();
            stockWithHistory.history = history;
            return res.status(200).json({
              message: `Stock "${stock.symbol}" retrieved.`,
              stock: stockWithHistory,
            });
          }));
      }
      return res.status(404).json({
        message: `Stock with ID "${stockId}" does not exist.`,
      });
    })
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      })
    );
};
