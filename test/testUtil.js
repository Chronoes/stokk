import {expect} from 'chai';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import * as util from '../server/util';

describe('Utility functions', () => {
  context('#verifyToken()', () => {
    it('should return payload with correct token', done => {
      const token = util.signToken({id: 1, email: 'ayy@lm.ao'});
      util.verifyToken(token)
      .then(payload => {
        expect(payload).to.be.an('object');
        expect(payload).to.have.any.keys('id', 'email');
        expect(payload.id).to.equal(1);
        expect(payload.email).to.equal('ayy@lm.ao');
        done();
      })
      .catch(done);
    });

    it('should reject with error on incorrect token', done => {
      const token = jwt.sign({id: 1, email: 'ayy@lm.ao'}, 'shhhhh');
      util.verifyToken(token)
      .then(() => done(new Error('This path shouldn\'t be taken')))
      .catch(err => {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('Token is invalid.');
        done();
      });
    });
  });

  context('#verifyAuthorization()', () => {
    it('should return with token if Authorization header exists', done => {
      const token = util.signToken({id: 1, email: 'ayy@lm.ao'});
      const authHeader = `Bearer ${token}`;
      util.verifyAuthorization(authHeader)
      .then(payload => {
        expect(payload).to.be.an('object');
        expect(payload).to.have.any.keys('id', 'email');
        expect(payload.id).to.equal(1);
        expect(payload.email).to.equal('ayy@lm.ao');
        done();
      })
      .catch(done);
    });

    it('should reject with error on missing header', done => {
      util.verifyAuthorization('')
      .then(() => done(new Error('This path shouldn\'t be taken')))
      .catch(err => {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('No Authorization header.');
        done();
      });
    });
  });

  context('#updateDatabase()', () => {
    it('should update info in database if no data yet', done => {
      const mockStock = {
        symbol: 'GOOG',
        updatedAt: 0,
        currentPrice: null,
        update: result => Promise.resolve({
          symbol: result.symbol,
          updatedAt: 0,
          currentPrice: result.currentPrice,
        }),
      };

      util.updateDatabase(mockStock)
      .then(updatedStock => {
        expect(updatedStock).to.have.all.keys('symbol', 'updatedAt', 'currentPrice');
        expect(updatedStock.symbol).to.equal(mockStock.symbol);
        expect(updatedStock.currentPrice).to.be.ok;
        done();
      })
      .catch(done);
    });

    it('should update info in database if data is old', done => {
      const mockStock = {
        symbol: 'JBOY$$',
        updatedAt: moment.utc().subtract(2, 'days'),
        currentPrice: 'novalue',
        update: () => Promise.resolve({
          symbol: 'JBOY$$',
          updatedAt: moment(),
          currentPrice: '715.23',
        }),
      };

      util.updateDatabase(mockStock)
      .then(updatedStock => {
        expect(updatedStock).to.have.all.keys('symbol', 'updatedAt', 'currentPrice');
        expect(updatedStock.symbol).to.equal(mockStock.symbol);
        expect(updatedStock.currentPrice).to.not.equal(mockStock.currentPrice);
        expect(updatedStock.updatedAt).to.be.above(mockStock.updatedAt);
        done();
      })
      .catch(done);
    });

    it('should not update if data is current', done => {
      const mockStock = {
        symbol: 'JBOY$$',
        updatedAt: moment(),
        currentPrice: '715.23',
        update: () => Promise.resolve({
          symbol: 'JBOY$$',
          updatedAt: moment(),
          currentPrice: '715.23',
        }),
      };

      util.updateDatabase(mockStock)
      .then(updatedStock => {
        expect(updatedStock).to.deep.equal(mockStock);
        done();
      })
      .catch(done);
    });
  });

  context('#bulkUpdateDatabase()', () => {
    it('should update info in database if no data yet or is old', done => {
      const mockStocks = [
        {
          symbol: 'GOOG',
          updatedAt: 0,
          currentPrice: null,
          update: result => Promise.resolve({
            symbol: result.symbol,
            updatedAt: 0,
            currentPrice: result.currentPrice,
          }),
        }, {
          symbol: 'MSFT',
          updatedAt: moment.utc().subtract(2, 'days'),
          currentPrice: '300.00',
          update: result => Promise.resolve({
            symbol: result.symbol,
            updatedAt: moment(),
            currentPrice: result.currentPrice,
          }),
        },
      ];

      util.bulkUpdateDatabase(mockStocks)
      .then(updatedStocks => {
        expect(updatedStocks).to.be.an('array');
        expect(updatedStocks).to.have.length(2);
        expect(updatedStocks[0]).to.have.all.keys('symbol', 'updatedAt', 'currentPrice');
        expect(updatedStocks[0].symbol).to.equal(mockStocks[0].symbol);
        expect(updatedStocks[1].symbol).to.equal(mockStocks[1].symbol);
        expect(updatedStocks[0].currentPrice).to.be.ok;
        expect(updatedStocks[1].updatedAt).to.be.above(mockStocks[1].updatedAt);
        done();
      })
      .catch(done);
    });

    it('should not update if data is current', done => {
      const mockStocks = [
        {
          symbol: 'GOOG',
          updatedAt: moment(),
          currentPrice: '232.23',
          update: () => Promise.resolve({
            symbol: 'GOOG',
            updatedAt: moment(),
            currentPrice: '232.23',
          }),
        }, {
          symbol: 'MSFT',
          updatedAt: moment(),
          currentPrice: '300.00',
          update: () => Promise.resolve({
            symbol: 'MSFT',
            updatedAt: moment(),
            currentPrice: '300.00',
          }),
        },
      ];

      util.bulkUpdateDatabase(mockStocks)
      .then(updatedStocks => {
        expect(updatedStocks).to.deep.equal(mockStocks);
        done();
      })
      .catch(done);
    });
  });

  context('#updateHistory()', () => {
    it('should return history of stock if no data yet', done => {
      const mockStock = {
        symbol: 'GOOG',
        getHistory: () => Promise.resolve([]),
        createHistory: result => Promise.resolve(result),
      };
      const betweenDates = [moment('2015-11-05'), moment('2015-11-06')];

      util.updateHistory(mockStock, betweenDates)
      .then(history => {
        expect(history).to.be.an('array');
        expect(history).to.have.length(2);
        expect(history[0]).to.have.all.keys('date', 'open', 'close', 'high', 'low');
        expect(history[0].date).to.equal(betweenDates[1].format('YYYY-MM-DD'));
        done();
      })
      .catch(done);
    });

    it('should return history of stock if no data yet', done => {
      const originalHistory = [
        {
          date: '2015-11-06',
          open: 121.1101,
          close: 121.0598,
          low: 121.8008,
          high: 120.62,
        }, {
          date: '2015-11-05',
          open: 111.321,
          close: 131.123,
          low: 140.08,
          high: 109.23,
        },
      ];

      const mockStock = {
        symbol: 'AAPL',
        getHistory: () => Promise.resolve(originalHistory),
        createHistory: () => Promise.resolve(),
      };
      const betweenDates = [moment('2015-11-05'), moment('2015-11-06')];

      util.updateHistory(mockStock, betweenDates)
      .then(history => {
        expect(history).to.deep.equal(originalHistory);
        done();
      })
      .catch(done);
    });
  });

  context('#bulkUpdateHistory', () => {
    it('should return all histories from stock array', done => {
      const mockStocks = [
        {
          symbol: 'GOOG',
          getHistory: () => Promise.resolve([]),
          createHistory: result => Promise.resolve(result),
        }, {
          symbol: 'MSFT',
          getHistory: () => Promise.resolve([]),
          createHistory: result => Promise.resolve(result),
        },
      ];
      const betweenDates = [moment('2015-11-05'), moment('2015-11-06')];

      util.bulkUpdateHistory(mockStocks, betweenDates)
      .then(histories => {
        expect(histories).to.be.an('array');
        expect(histories).to.have.length(2);
        Promise.all(histories[0])
          .then(newHistory => {
            expect(newHistory).to.be.an('array');
            expect(newHistory[0]).to.have.all.keys('date', 'open', 'close', 'high', 'low');
            expect(newHistory[0].date).to.equal(betweenDates[1].format('YYYY-MM-DD'));
            done();
          });
      })
      .catch(done);
    });
  });

  context('#formatDates()', () => {
    it('should return an array of formatted dates', () => {
      const originalDates = ['2015-11-11', '2015-07-23'];
      const momentDates = originalDates.map(date => moment(date));
      expect(util.formatDates(momentDates)).to.deep.equal(originalDates);
    });
  });

  context('#average()', () => {
    it('should return the arithmetic average of an array', () => {
      expect(util.average([1, 9, 6, 4, 5, 2, 7, 8, 3])).to.equal(5);
    });
  });

  context('#predictStockPositiveChange()', () => {
    const stock = {
      getHistory: () => Promise.resolve([
        119.300003,
        118.779999,
        117.290001,
        113.690002,
        114.18,
        110.339996,
        115.720001,
        116.110001,
        116.769997,
        117.75,
        114.18,
        117.809998,
        114.029999,
        112.879997,
        116.300003,
        115.199997,
        116.279999,
        117.339996,
      ].map(value => {return {close: value};})),
    };

    it('should return true if knn-algorithm shows positive', done => {
      stock.currentPrice = 117.5;

      util.predictStockPositiveChange(stock)
      .then(isPositive => {
        expect(isPositive).to.be.true;
        done();
      })
      .catch(done);
    });

    it('should return false if knn-algorithm shows negative', done => {
      stock.currentPrice = 113.3;

      util.predictStockPositiveChange(stock)
      .then(isPositive => {
        expect(isPositive).to.be.false;
        done();
      })
      .catch(done);
    });
  });
});
