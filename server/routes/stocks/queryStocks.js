export default (req, res) => {
  const {stocks} = req;
  return res.status(200).json({
    message: `Retrieved ${stocks.length} stocks`,
    stocks,
  });
};
