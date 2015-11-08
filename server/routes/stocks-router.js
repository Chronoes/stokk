import {Router} from 'express';

import allStocksHandler from './stocks/allStocks';
import queryStocksHandler from './stocks/queryStocks';
import queryStocksHistoryHandler from './stocks/queryStocksHistory';
import paramDateHandler from './stocks/paramDate';

const stocks = Router();

stocks.param('startDate', paramDateHandler);
stocks.param('endDate', paramDateHandler);

stocks.get('/', allStocksHandler);
stocks.get('/:searchString', queryStocksHandler);
stocks.get('/:symbol', queryStocksHistoryHandler);
stocks.get('/:symbol/:startDate', queryStocksHistoryHandler);
stocks.get('/:symbol/:startDate/:endDate', queryStocksHistoryHandler);

export default stocks;
