import {Router} from 'express';

import Stock from '../models/Stock';
import allStocksHandler from './stocks/allStocks';
import queryStocksHandler from './stocks/queryStocks';

const stocks = Router();

stocks.param('symbol', (req, res, next, symbol) => {
  return Stock.findAll({
    attributes: ['symbol', 'name'],
    where: {
      $or: {
        symbol: {$like: `${symbol.toUpperCase()}%`},
        name: {$like: `%${symbol}%`},
      },
    },
  })
  .then(foundStocks => {
    if (foundStocks.length !== 0) {
      req.stocks = foundStocks;
      next();
    } else {
      res.status(404).json({
        message: `Stock "${symbol}" does not exist.`,
      });
    }
  })
  .catch(() =>
    res.status(500).json({
      message: 'Something happened.',
    }));
});

stocks.get('/', allStocksHandler);
stocks.get('/:symbol', queryStocksHandler);

export default stocks;
