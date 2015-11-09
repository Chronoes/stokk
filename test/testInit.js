import database from '../server/database';
import User from '../server/models/User';
import Stock from '../server/models/Stock';
import {genSaltyHash} from '../server/util';

before(done => {
  const users = [
    {
      email: 'test1@stokk.io',
      password: 'testingpass1',
    },
    {
      email: 'test2@stokk.io',
      password: 'testingpass2',
    },
    {
      email: 'test3@stokk.io',
      password: 'testingpass3',
    },
  ].map(user =>
    genSaltyHash(user.password)
    .then(hash => {
      return {email: user.email, password: hash};
    })
  );

  const stocks = [
    {
      symbol: 'YHOO',
      change: '+0.23',
      daysLow: '33.00',
      daysHigh: '33.49',
      yearLow: '27.20',
      yearHigh: '52.62',
      currentPrice: '33.40',
      name: 'Yahoo! Inc.',
    },
    {
      symbol: 'AAPL',
      change: '-3.80',
      daysLow: '114.92',
      daysHigh: '118.13',
      yearLow: '92.00',
      yearHigh: '134.54',
      currentPrice: '115.28',
      name: 'Apple Inc.',
    },
    {
      symbol: 'GOOG',
      change: '+10.78',
      daysLow: '701.26',
      daysHigh: '719.15',
      yearLow: '486.23',
      yearHigh: '730.00',
      currentPrice: '712.78',
      name: 'Alphabet Inc.',
    },
    {
      symbol: 'MSFT',
      change: '+1.38',
      daysLow: '52.50',
      daysHigh: '54.32',
      yearLow: '39.72',
      yearHigh: '54.32',
      currentPrice: '54.25',
      name: 'Microsoft Corporation',
    },
  ];

  const history = {AAPL: [
    {
      date: '2015-11-06',
      open: 121.1101,
      close: 121.0598,
      low: 121.8008,
      high: 120.62,
    },
    {
      date: '2015-11-05',
      open: 111.321,
      close: 131.123,
      low: 140.08,
      high: 109.23,
    },
    {
      date: '2015-11-06',
      open: 140.1101,
      close: 321.0598,
      low: 134.8008,
      high: 534.62,
    },
    {
      date: '2015-11-06',
      open: 332.1101,
      close: 31.0598,
      low: 42.311,
      high: 1220.34,
    },
    {
      date: '2015-11-06',
      open: 313.23,
      close: 312.43,
      low: 234.41234,
      high: 525.5435,
    },
  ]};

  database.sync({force: true})
  .then(() => Stock.bulkCreate(stocks))
  .then(() => Stock.findOne({where: {symbol: 'AAPL'}}))
  .then(stock => Promise.all(history.AAPL.map(hist => stock.createHistory(hist))))
  .then(() => Promise.all(users))
  .then(hashedUsers => User.bulkCreate(hashedUsers))
  .then(() => User.findOne({where: {email: 'test1@stokk.io'}}))
  .then(user => Stock.findAll()
    .then(userStocks => user.setStocks(userStocks)))
  .then(() => done())
  .catch(err => Array.isArray(err) ?
    done(err[0].errors) :
    done(err));
});
