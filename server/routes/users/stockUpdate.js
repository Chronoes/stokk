export default (req, res) => {
  const {user} = req;
  const {symbol, status} = req.body;
  return user.getStocks({where: {symbol}})
    .then(stocks => {
      if (stocks.length === 0) {
        return res.status(400).json({
          message: `Stock "${symbol}" does not exist for user."`,
        });
      }
      return stocks[0].user_stock.update({status});
    })
    .then(() =>
      res.status(200).json({
        message: `Stock "${symbol}" status set to "${status}"`,
      }))
    .catch(() =>
      res.status(400).json({
        message: `Status "${status}" is incorrect, should be one of ['active', 'passive'].`,
      })
    );
};
