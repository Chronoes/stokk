import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export function genSaltyHash(password) {
  return bcrypt.hash(password, 10);
}

export function compareSaltyHash(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload) {
  try {
    const secret = fs.readFileSync('./server/secret', 'utf8');
    return jwt.sign(payload, secret, {
      expiresIn: 3600 * 24 * 30,
    });
  } catch (err) {
    /* eslint-disable */
    console.log('Go make your own secret file at ./server/');
    /* eslint-enable */
    throw err;
  }
}

export function renderReactIsomorphic(html, reactString) {
  const targetNameDev = '<div id="target">';
  const targetNameMin = '<div id=target>';
  const isDev = html.indexOf(targetNameDev) !== -1;
  const targetName = isDev ? targetNameDev : targetNameMin;
  const target = html.indexOf(targetName) + targetName.length;
  const start = html.slice(0, target);
  const end = html.slice(target);
  return start + reactString + end;
}
