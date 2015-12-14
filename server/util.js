import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import axios from 'axios';

import app from '../app';
import database from './database';
import {getStockBySymbol, getStockByDate} from './queries';
import {development, stockQueryTimeLimit, stockHistoryTimeLimit} from './conf';
import * as algorithm from './algorithm';

export function genSaltyHash(password) {
  return bcrypt.hash(password, 10);
}

export function compareSaltyHash(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload) {
  return jwt.sign(payload, app.get('secret'), {
    expiresIn: 3600 * 24 * 30,
  });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) =>
    jwt.verify(token, app.get('secret'), (err, decoded) =>
      err ? reject(new Error('Token is invalid.')) : resolve(decoded)));
}

export function verifyAuthorization(authHeader) {
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    return verifyToken(token);
  }
  return Promise.reject(new Error('No Authorization header.'));
}

function isStockUpdateNeeded(stock) {
  return stock.currentPrice === null || moment.utc(stock.updatedAt) < moment.utc().subtract(stockQueryTimeLimit);
}

export function bulkUpdateDatabase(stocks) {
  const stocksToUpdate = stocks.filter(isStockUpdateNeeded);
  if (stocksToUpdate.length) {
    return getStockBySymbol(stocksToUpdate.map(stock => stock.symbol))
      .then(results =>
        Promise.all(stocksToUpdate.map((stock, i) => stock.update(results[i]))));
  }
  return Promise.resolve(stocks);
}

export function updateDatabase(stock) {
  if (isStockUpdateNeeded(stock)) {
    return getStockBySymbol(stock.symbol)
      .then(result => stock.update(result));
  }
  return Promise.resolve(stock);
}

function weekdaysCount(startDate, endDate) {
  const start = moment(startDate);
  const end = moment(endDate);
  const weekdays = moment.duration();
  while (end.isAfter(start)) {
    const day = start.isoWeekday();
    if (day !== 6 && day !== 7) {
      weekdays.add(1, 'days');
    }
    start.add(1, 'days');
  }
  return weekdays.days();
}

function isHistoryUpdateNeeded(history, startDate, endDate) {
  const weekdays = weekdaysCount(startDate, endDate);
  return history.length < weekdays;
}

export function formatDates(dateList) {
  return dateList.map(date => date.format('YYYY-MM-DD'));
}

export function getHistory(stock, between, sorted = true) {
  return stock.getHistory({where: {date: {$between: formatDates(between)}}})
  .then(history => {
    if (sorted) {
      history.sort((a, b) => moment(a.date).isBefore(b.date, 'day') ? -1 : 1);
    }
    return Promise.resolve(history);
  });
}

export function bulkUpdateHistory(stocks, betweenDates) {
  const formattedDates = formatDates(betweenDates);
  return Promise.all(stocks.map(stock => getHistory(stock, betweenDates, false)))
  .then(histories => {
    if (histories.some(history => isHistoryUpdateNeeded(history, ...formattedDates))) {
      return getStockByDate(stocks.map(stock => stock.symbol), ...formattedDates)
        .then(results => database.transaction(act =>
            Promise.all(stocks.map((stock, i) => {
              const historyDates = histories[i].map(object => moment(object.date));
              return results[stock.symbol]
                .filter(result => !historyDates.some(date => date.isSame(result.date, 'day')))
                .map(result => stock.createHistory(result, {transaction: act}));
            }))));
    }
    return Promise.resolve(histories);
  });
}

export function updateHistory(stock, betweenDates) {
  const formattedDates = formatDates(betweenDates);
  return getHistory(stock, betweenDates, false)
  .then(history => {
    if (isHistoryUpdateNeeded(history, ...formattedDates)) {
      return getStockByDate(stock.symbol, ...formattedDates)
        .then(results => database.transaction(act => {
          const historyDates = history.map(object => moment(object.date));
          return Promise.all(results[stock.symbol]
            .filter(result => !historyDates.some(date => date.isSame(result.date, 'day')))
            .map(result => stock.createHistory(result, {transaction: act})));
        }));
    }
    return Promise.resolve(history);
  });
}

export function reloadFromDatabase(items) {
  return Array.isArray(items) ? Promise.all(items.map(item => item.reload())) : items.reload();
}

export function average(values) {
  return values.reduce((acc, next) => acc + next, 0) / values.length;
}

export function predictStockPositiveChange(stock) {
  return getHistory(stock, [moment().subtract(stockHistoryTimeLimit), moment()])
  .then(history => {
    const historyData = history.map(point => [point.close]);
    const testValue = [stock.currentPrice];
    const normalisedData = algorithm.normaliseValues(historyData).map(value => value >= 0.5 ? 1 : 0);
    const neighbours = algorithm.nearestNeighbours(historyData, testValue, 10).map(idx => normalisedData[idx]);
    return average(neighbours) >= 0.5;
  });
}

/* istanbul ignore next */
export function getDataFromDropbox(link) {
  return new Promise((resolve, reject) => {
    axios.get(link)
    .then(response => resolve(response.data))
    .catch(reject);
  });
}

/* istanbul ignore next */
export function isDev() {
  return app.get('env') === development.NODE_ENV || process.env.NODE_ENV === development.NODE_ENV;
}
