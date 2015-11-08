import YQL from 'yql';

export function symbolCheck(symbol) {
  const pattern = /^[^'"]+[a-z.-]+$/i;
  return pattern.test(symbol);
}

export function arrayToString(symbol) {
  if (Array.isArray(symbol)) {
    return symbol.map(element => `'${element}'`).join(',');
  }
  return `'${symbol}'`;
}

function resolveData(data) {
  return {
    symbol: data.Symbol,
    name: data.Name,
    change: data.Change,
    currentPrice: data.LastTradePriceOnly,
    daysLow: data.DaysLow,
    daysHigh: data.DaysHigh,
    yearLow: data.YearLow,
    yearHigh: data.YearHigh,
  };
}

export function getStockBySymbol(symbol) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.quote where symbol in (${arrayToString(symbol)})`);
    return new Promise((resolve, reject) => {
      query.exec((error, response) => {
        if (error) return reject(error);
        const results = response.query.results;
        if (results === null || results.quote.Name === null) return reject(null);
        const data = results.quote;
        return Array.isArray(data) ? resolve(data.map(resolveData)) : resolve(resolveData(data));
      });
    });
  }
  return Promise.reject(null);
}

export function getStockByDate(symbol, startDate, endDate) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.historicaldata where symbol in (${arrayToString(symbol)}) and startDate = "${startDate}" and endDate = "${endDate}"`);
    return new Promise((resolve, reject) => {
      query.exec((error, response) => {
        if (error) return reject(error);
        const results = response.query.results;
        if (results === null) return reject(null);
        resolve(results.quote.reduce((grouped, object) => {
          if (!grouped[object.Symbol]) {
            grouped[object.Symbol] = [];
          }
          grouped[object.Symbol].push({
            date: object.Date,
            open: object.Open,
            high: object.High,
            low: object.Low,
            close: object.Close,
          });
          return grouped;
        }, {}));
      });
    });
  }
  return Promise.reject(null);
}
