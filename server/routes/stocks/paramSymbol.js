import Stock from '../../models/Stock';

export default (req, res, next, symbol) => {
  return Stock.findAll({
    attributes: ['symbol', 'name'],
    where: {
      $or: {
        symbol: {$like: `${symbol.toUpperCase()}%`},
        name: {$like: `%${symbol}%`},
      },
    },
    order: `CASE WHEN \`symbol\` LIKE '${symbol.toUpperCase()}%' THEN 1 ELSE 2 END`,
    limit: 10,
  })
  .then(foundStocks => {
    if (foundStocks.length !== 0) {
      req.stocks = foundStocks;
      next();
    } else {
      res.status(404).json({
        message: `Stock "${symbol}" does not exist.`,
      });
    }
  })
  .catch(() =>
    res.status(500).json({
      message: 'Something happened.',
    }));
};
