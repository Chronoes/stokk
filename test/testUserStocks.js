import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';

import app from '../app';
import User from '../server/models/User';
import Stock from '../server/models/Stock';

chai.use(supertestChai.httpAsserts);

describe('User stock handler', () => {
  const makeRoute = id => `/api/users/${id}/stocks`;

  let server;
  before(() => {
    server = app.listen(1338);
  });

  context('"any" request', () => {
    it('should deny access with unknown ID', done => {
      const route = makeRoute(15);

      request(server)
        .get(route)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(403);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });

    it('should deny access with non-integer ID', done => {
      const route = makeRoute('iamnotaninteger');

      request(server)
        .get(route)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(403);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });
  });

  context('GET request', () => {
    it('should return an array of stocks based on ID', done => {
      const route = makeRoute(1);

      request(server)
        .get(route)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(200);
          const {message, stocks} = res.body;
          expect(message).to.have.length.above(0);
          expect(stocks).to.be.an('array');
          expect(stocks).to.have.length.of.at.least(1);
          expect(stocks[0]).to.be.an('object');
          expect(stocks[0]).to.have.any.keys('symbol', 'name', 'currentPrice', 'user_stock');
          done();
        });
    });
  });

  context('POST request', () => {
    it('should add a new stock to user', done => {
      const route = makeRoute(2);
      const mockRequest = {
        symbol: 'GOOG',
      };

      const waitRequest = new Promise((resolve, reject) => {
        request(server)
          .post(route)
          .send(mockRequest)
          .end((err, res) => {
            if (err) {
              return reject(err);
            }
            expect(res).to.have.status(200);
            expect(res.body.message).to.have.length.above(0);
            resolve();
          });
      });

      waitRequest
        .then(() =>
          User.findById(2))
        .then(user =>
          user.getStocks({where: {symbol: mockRequest.symbol}}))
        .then(stocks => {
          expect(stocks).to.be.an('array');
          expect(stocks).to.have.length(1);
          done();
        })
        .catch(done);
    });

    it('should return Bad Request when adding stock with unknown symbol', done => {
      const route = makeRoute(3);
      const mockRequest = {
        symbol: 'JBOYS',
      };

      request(server)
        .post(route)
        .send(mockRequest)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(400);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });
  });

  context('DELETE request', () => {
    it('should delete stock for user', done => {
      const route = makeRoute(1);
      const mockRequest = {
        symbol: 'YHOO',
      };

      const waitRequest = new Promise((resolve, reject) => {
        request(server)
          .del(route)
          .send(mockRequest)
          .end((err, res) => {
            if (err) {
              return reject(err);
            }
            expect(res).to.have.status(200);
            expect(res.body.message).to.have.length.above(0);
            resolve();
          });
      });

      waitRequest
        .then(() =>
          User.findById(1))
        .then(user =>
          Stock.findOne({where: {symbol: mockRequest.symbol}})
            .then(stock => user.hasStock(stock)))
        .then(exists => {
          expect(exists).to.be.false;
          done();
        })
        .catch(done);
    });

    it('should return Not Found when stock does not exist for user', done => {
      const route = makeRoute(3);
      const mockRequest = {
        symbol: 'GOOG',
      };

      request(server)
        .del(route)
        .send(mockRequest)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(404);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });
  });

  after(() => {
    server.close();
  });
});
