import YQL from 'yql';

export function symbolCheck(symbol) {
  const pattern = /[a-z.-]+/i;
  return pattern.test(symbol);
}

export function getStockBySymbol(symbol) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.quote where symbol in (\"${symbol}\")`);
    query.exec((error, response) => {
      console.log(response.query.results);
      return response.query.results;
    });
  }
  return false;
}

export function getStockByDate(symbol, startDate, endDate) {
  if (symbolCheck(symbol)) {
    const query = new YQL(`select * from yahoo.finance.historicaldata where symbol = \"${symbol}\" and startDate = \"${startDate}\" and endDate = \"${endDate}\"`);
    query.exec((error, response) => {
      return response.query.results;
    });
  }
  return false;
}
