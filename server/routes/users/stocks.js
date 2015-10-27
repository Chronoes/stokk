export default (req, res) => {
  const {user} = req;
  return user.getStocks()
    .then(stocks => {
      res.status(200).json({
        stocks,
      });
    });
};
