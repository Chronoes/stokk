import Stock from '../../models/Stock';

export default (req, res) => {
  const {searchString} = req.params;
  return Stock.findAll({
    attributes: ['symbol', 'name'],
    where: {
      $or: {
        symbol: {$like: `${searchString.toUpperCase()}%`},
        name: {$like: `%${searchString}%`},
      },
    },
    order: `CASE WHEN \`symbol\` LIKE '${searchString.toUpperCase()}%' THEN 1 ELSE 2 END`,
    limit: 10,
  })
  .then(stocks => {
    if (stocks.length !== 0) {
      return res.status(200).json({
        message: `Retrieved ${stocks.length} stocks`,
        stocks,
      });
    }
    return res.status(404).json({
      message: `Stock "${searchString}" does not exist.`,
    });
  })
  .catch(() =>
    res.status(500).json({
      message: 'Something happened.',
    }));
};
