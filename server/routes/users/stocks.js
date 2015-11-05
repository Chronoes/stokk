import {bulkUpdateDatabase} from '../../util';

export default (req, res) => {
  const {user} = req;
  return user.getStocks()
    .then(stocks => bulkUpdateDatabase(stocks)
      .then(() =>
        Promise.all(stocks.map(stock => stock.reload()))))
    .then(stocks =>
      res.status(200).json({
        message: `Retrieved ${stocks.length} stocks.`,
        stocks,
      }))
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      })
    );
};
