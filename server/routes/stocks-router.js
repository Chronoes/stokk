import {Router} from 'express';

import allStocksHandler from './stocks/allStocks';
import queryStocksHandler from './stocks/queryStocks';
import stockByIdHandler from './stocks/stockById';

const stocks = Router();

stocks.get('/', allStocksHandler);
stocks.get('/:searchString', stockByIdHandler, queryStocksHandler);

export default stocks;
