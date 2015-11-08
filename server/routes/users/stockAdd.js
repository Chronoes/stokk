import Stock from '../../models/Stock';
import {updateDatabase, reloadFromDatabase} from '../../util';

export default (req, res) => {
  const {user} = req;
  const {symbol} = req.body;
  return Stock.findOne({where: {symbol}})
  .then(stock => {
    if (stock !== null) {
      return updateDatabase(stock)
      .then(updatedStock => user.addStock(updatedStock))
      .then(() => reloadFromDatabase(stock))
      .then(() =>
        res.status(200).json({
          message: `Stock "${symbol}" added successfully.`,
          stock,
        }));
    }
    return res.status(404).json({
      message: `Stock "${symbol}" does not exist.`,
    });
  })
  .catch(() =>
    res.status(500).json({
      message: 'Something happened.',
    })
  );
};
