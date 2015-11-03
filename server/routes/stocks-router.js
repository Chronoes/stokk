import {Router} from 'express';
import Stock from '../models/Stock';
import getStocks from './stocks/getStocks';

const stocks = Router();

stocks.param('symbol', (req, res, next, symbol) => {
  return Stock.findOne({where: {symbol}})
    .then(stock => {
      if (stock !== null) {
        req.stock = stock;
        req.symbol = symbol;
        return next();
      }
      return res.status(400).json({
        message: `Stock "${symbol}" does not exist.`,
      });
    })
    .catch(() =>
      res.status(500).json({
        message: 'Something happened.',
      }));
});

stocks.get('/', getStocks);
stocks.get('/:symbol', getStocks);

export default stocks;
