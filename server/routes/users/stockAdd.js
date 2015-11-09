import moment from 'moment';
import Stock from '../../models/Stock';
import {updateDatabase, reloadFromDatabase, updateHistory} from '../../util';
import {stockHistoryTimeLimit} from '../../conf';

export default (req, res) => {
  const {user} = req;
  const {symbol} = req.body;
  const betweenDates = [moment.utc().subtract(stockHistoryTimeLimit), moment.utc()];
  const formattedDates = betweenDates.map(date => date.format('YYYY-MM-DD'));
  return Stock.findOne({where: {symbol}})
  .then(stock => {
    if (stock !== null) {
      return updateDatabase(stock)
      .then(updatedStock => user.addStock(updatedStock))
      .then(() => reloadFromDatabase(stock))
      .then(() => updateHistory(stock, formattedDates)
        .then(history => {
          const stockWithHistory = stock.toJSON();
          stockWithHistory.history = history;
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
