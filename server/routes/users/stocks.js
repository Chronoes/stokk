export default (req, res) => {
  const {user} = req;
  return user.getStocks()
    .then(stocks => {
      return res.status(200).json({
        message: `Retrieved ${stocks.length} stocks.`,
        stocks,
      });
    })
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      })
    );
};
