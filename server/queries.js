import YQL from 'yql';

export function symbolCheck(symbol) {
  const pattern = /^[^'"]+[a-z.-]+$/i;
  return pattern.test(symbol);
}

export function getStockBySymbol(symbol, callback) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.quote where symbol in ("${symbol}")`);
    query.exec((error, response) => {
      if (typeof callback === 'function') callback(response.query);
    });
  }
}

export function getStockByDate(symbol, startDate, endDate, callback) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.historicaldata where symbol = "${symbol}" and startDate = "${startDate}" and endDate = "${endDate}"`);
    query.exec((error, response) => {
      if (typeof callback === 'function') callback(response.query);
    });
  }
}
