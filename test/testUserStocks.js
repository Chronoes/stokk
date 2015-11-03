import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';
import jwt from 'jsonwebtoken';

import app from '../app';
import User from '../server/models/User';
import Stock from '../server/models/Stock';

import {signToken} from '../server/util';

chai.use(supertestChai.httpAsserts);

describe('User stock handler', () => {
  const makeRoute = id => `/api/users/${id}/stocks`;
  const tokens = {1: '', 2: '', 3: '', 15: '', 'iamnotaninteger': ''};

  let server;
  before(() => {
    Object.keys(tokens)
      .map(key => tokens[key] = signToken({id: key}));
    server = app.listen(1338);
  });

  context('"any" request', () => {
    it('should deny access with unknown ID', done => {
      const id = 15;
      const route = makeRoute(id);
      const token = tokens[id];

      request(server)
        .get(route)
        .set('Authorization', `Bearer ${token}`)
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
      const id = 'iamnotaninteger';
      const route = makeRoute(id);
      const token = tokens[id];

      request(server)
        .get(route)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(403);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });

    it('should return Unauthorized if token is invalid', done => {
      const id = 3;
      const route = makeRoute(id);
      const token = jwt.sign({id}, 'shhhhh...');

      request(server)
        .get(route)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(401);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });

    it('should return Unauthorized if Authorization header is not set', done => {
      const route = makeRoute(3);

      request(server)
        .get(route)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(401);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });
  });

  context('GET request', () => {
    it('should return an array of stocks based on ID', done => {
      const id = 1;
      const route = makeRoute(id);
      const token = tokens[id];

      request(server)
        .get(route)
        .set('Authorization', `Bearer ${token}`)
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
      const id = 2;
      const route = makeRoute(id);
      const token = tokens[id];
      const mockRequest = {
        symbol: 'GOOG',
      };

      const waitRequest = new Promise((resolve, reject) => {
        request(server)
          .post(route)
          .set('Authorization', `Bearer ${token}`)
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
          User.findById(id))
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
      const id = 3;
      const route = makeRoute(id);
      const token = tokens[id];
      const mockRequest = {
        symbol: 'JBOYS',
      };

      request(server)
        .post(route)
        .set('Authorization', `Bearer ${token}`)
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
      const id = 1;
      const route = makeRoute(id);
      const token = tokens[id];
      const mockRequest = {
        symbol: 'YHOO',
      };

      const waitRequest = new Promise((resolve, reject) => {
        request(server)
          .del(route)
          .set('Authorization', `Bearer ${token}`)
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
          User.findById(id))
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
      const id = 3;
      const route = makeRoute(id);
      const token = tokens[id];
      const mockRequest = {
        symbol: 'GOOG',
      };

      request(server)
        .del(route)
        .set('Authorization', `Bearer ${token}`)
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
