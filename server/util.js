import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';

import app from '../app';
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
      err ? reject('Token is invalid.') : resolve(decoded)));
}

export function verifyAuthorization(auth) {
  if (auth) {
    const token = auth.replace('Bearer ', '');
    return verifyToken(token);
  }
  return Promise.reject('No Authorization header.');
}

export function isDev() {
  return app.get('env') === development.NODE_ENV;
}
