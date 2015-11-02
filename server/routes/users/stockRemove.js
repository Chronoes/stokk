export default (req, res) => {
  const {user} = req;
  const {symbol} = req.body;
  return user.getStocks({where: {symbol}})
    .then(stocks => {
      if (stocks.length === 0) {
        return res.status(404).json({
          message: `Stock "${symbol}" does not exist for user."`,
        });
      }
      return user.removeStock(stocks[0])
        .then(() =>
          res.status(200).json({
            message: `Stock "${symbol}" removed.`,
          }));
    })
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      })
    );
};
