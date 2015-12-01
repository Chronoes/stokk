import moment from 'moment';
import Stock from '../../models/Stock';
import {updateDatabase, reloadFromDatabase, updateHistory, getHistory} from '../../util';
import {stockHistoryTimeLimit} from '../../conf';

export default (req, res) => {
  const {user} = req;
  const {symbol} = req.body;
  const betweenDates = [moment.utc().subtract(stockHistoryTimeLimit), moment.utc()];
  return Stock.findOne({where: {symbol}})
  .then(stock => {
    if (stock !== null) {
      return user.addStock(stock)
      .then(() => updateDatabase(stock))
      .then(() => updateHistory(stock, betweenDates))
      .then(() => reloadFromDatabase(stock))
      .then(updatedStock => getHistory(updatedStock, betweenDates)
        .then(history => {
          const stockWithHistory = updatedStock.toJSON();
          stockWithHistory.history = history;
          delete stockWithHistory.createdAt;
          return res.status(200).json({
            message: `Stock "${symbol}" added successfully.`,
            stock: stockWithHistory,
          });
        }));
    }
    return res.status(404).json({
      message: `Stock "${symbol}" does not exist.`,
    });
  })
  .catch(() =>
    res.status(500).json({
      message: 'Something happened.',
    })
  );
};
