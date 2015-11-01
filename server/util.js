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

export function isDev() {
  return app.get('env') === development.NODE_ENV;
}
