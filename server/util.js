const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
// const fs = require('fs');

exports.genSaltyHash = password => bcrypt.hash(password, 10);

exports.compareSaltyHash = (password, hash) => bcrypt.compare(password, hash);

exports.signToken = payload => {
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
};
