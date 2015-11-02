import Stock from '../../models/Stock';

export default (req, res) => {
  const {user} = req;
  const {symbol} = req.body;
  return Stock.findOne({where: {symbol}})
    .then(stock => stock !== null ?
        stock.addUser(user)
          .then(() =>
            res.status(200).json({
              message: `Stock "${symbol}" added successfully.`,
            })) :
        res.status(400).json({
          message: `Stock "${symbol}" does not exist.`,
        }))
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      })
    );
};
