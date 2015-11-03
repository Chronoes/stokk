import Stock from '../../models/Stock';

export default (req, res) => {
  if (req.stock) {
    return res.status(200).json({
      message: `Retrieved "${req.symbol}".`,
      stock: req.stock,
    });
  }
  return Stock.findAll()
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
