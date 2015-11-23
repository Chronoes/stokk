import {Router} from 'express';

import allStocksHandler from './stocks/allStocks';
import queryStocksHandler from './stocks/queryStocks';

const stocks = Router();

stocks.get('/', allStocksHandler);
stocks.get('/:searchString', queryStocksHandler);

export default stocks;
