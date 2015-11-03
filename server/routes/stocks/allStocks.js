import Stock from '../../models/Stock';

export default (req, res) =>
  Stock.findAll()
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
