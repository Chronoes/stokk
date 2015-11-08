import {Router} from 'express';

import allStocksHandler from './stocks/allStocks';
import queryStocksHandler from './stocks/queryStocks';
import queryStocksHistoryHandler from './stocks/queryStocksHistory';

const stocks = Router();

stocks.get('/', allStocksHandler);
stocks.route('/:symbol')
  .get(queryStocksHandler)
  .post(queryStocksHistoryHandler);

export default stocks;
