import YQL from 'yql';

export function symbolCheck(symbol) {
  const pattern = /^[^'"]+[a-z.-]+$/i;
  return pattern.test(symbol);
}

export function getStockBySymbol(symbol) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.quote where symbol in ("${symbol}")`);
    return new Promise((resolve, reject) => {
      query.exec((error, response) => {
        if (error) reject(error);
        const data = response.query.results.quote;
        resolve({
          symbol: data.Symbol,
          name: data.Name,
          change: data.Change,
          currentPrice: data.LastTradePriceOnly,
          daysLow: data.DaysLow,
          daysHigh: data.DaysHigh,
          yearLow: data.YearLow,
          yearHigh: data.YearHigh,
        });
      });
    });
  }
}

export function getStockByDate(symbol, startDate, endDate) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.historicaldata where symbol = "${symbol}" and startDate = "${startDate}" and endDate = "${endDate}"`);
    return new Promise((resolve, reject) => {
      query.exec((error, response) => {
        if (error) reject(error);
        resolve(response.query.results.quote);
      });
    });
  }
}
