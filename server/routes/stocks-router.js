import {Router} from 'express';

import allStocksHandler from './stocks/allStocks';
import queryStocksHandler from './stocks/queryStocks';
import paramSymbolHandler from './stocks/paramSymbol';

const stocks = Router();

stocks.param('symbol', paramSymbolHandler);

stocks.get('/', allStocksHandler);
stocks.get('/:symbol', queryStocksHandler);

export default stocks;
