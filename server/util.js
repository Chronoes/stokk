import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import request from 'request-promise';

import app from '../app';
import {getStockBySymbol} from './queries';
import {development} from './conf';

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

export function updateDatabase(stock) {
  const updatedAt = moment.utc(stock.updatedAt);
  const limit = 1000 * 3600 * 24;
  if (stock.currentPrice === null || updatedAt < (moment() - limit)) {
    return new Promise((resolve, reject) =>
      getStockBySymbol(stock.symbol)
      .then(result => stock.update(result))
      .then(resolve)
      .catch(reject));
  }
  return Promise.resolve(stock);
}

/* istanbul ignore next */
export function getDataFromDropbox(link) {
  return new Promise((resolve, reject) => {
    request(link).then(response => {
      resolve(JSON.parse(response));
    })
    .catch(reject);
  });
}

/* istanbul ignore next */
export function isDev() {
  return app.get('env') === development.NODE_ENV || process.env.NODE_ENV === development.NODE_ENV;
}
