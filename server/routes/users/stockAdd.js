import Stock from '../../models/Stock';
import {updateDatabase} from '../../util';

export default (req, res) => {
  const {user} = req;
  const {symbol} = req.body;
  return Stock.findOne({where: {symbol}})
  .then(stock => {
    if (stock !== null) {
      return updateDatabase(stock)
      .then(updatedStock => user.addStock(updatedStock))
      .then(() =>
        res.status(200).json({
          message: `Stock "${symbol}" added successfully.`,
        }));
    }
    return res.status(400).json({
      message: `Stock "${symbol}" does not exist.`,
    });
  })
  .catch(err =>
    res.status(500).json({
      message: 'Something happened.' + err,
    })
  );
};
