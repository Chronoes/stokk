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
    currentPrice: parseFloat(data.LastTradePriceOnly),
    daysLow: parseFloat(data.DaysLow),
    daysHigh: parseFloat(data.DaysHigh),
    yearLow: parseFloat(data.YearLow),
    yearHigh: parseFloat(data.YearHigh),
  };
}

function stockFilter(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key] === null) {
      return false;
    }
  }
  return true;
}

export function getStockBySymbol(symbol) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.quote where symbol in (${arrayToString(symbol)})`);
    return new Promise((resolve, reject) => {
      query.exec((error, response) => {
        if (error) return reject(error);
        const results = response.query.results;
        if (results === null) return reject(null);
        const data = results.quote;
        if (Array.isArray(data)) {
          const filteredData = data.filter(stockFilter).map(resolveData);
          return filteredData.length ? resolve(filteredData) : reject(null);
        }
        return stockFilter(data) ? resolve(resolveData(data)) : reject(null);
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
            open: parseFloat(object.Open),
            high: parseFloat(object.High),
            low: parseFloat(object.Low),
            close: parseFloat(object.Close),
          });
          return grouped;
        }, {}));
      });
    });
  }
  return Promise.reject(null);
}
