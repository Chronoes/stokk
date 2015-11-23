import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';

import app from '../app';

chai.use(supertestChai.httpAsserts);

describe('Stock handler', () => {
  const route = '/api/stocks';
  const searchRoute = searchString => `/api/stocks/${searchString}`;

  let server;
  before(() => {
    server = app.listen(1338);
  });

  context('GET request /api/stocks', () => {
    it('should get all stocks in database', done => {
      request(server)
        .get(route)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          const {message, stocks} = res.body;
          expect(message).to.have.length.above(0);
          expect(stocks).to.be.an('array');
          expect(stocks).to.have.length(4);
          expect(stocks[0]).to.have.any.keys('symbol', 'change', 'currentPrice');
          done();
        });
    });
  });
  context('GET request /api/stocks/:searchString', () => {
    it('should search stocks by given symbol', done => {
      request(server)
        .get(searchRoute('GOOG'))
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          const {message, stocks} = res.body;
          expect(message).to.have.length.above(0);
          expect(stocks).to.be.an('array');
          expect(stocks).to.have.length.of.at.least(1);
          expect(stocks[0]).to.have.all.keys('symbol', 'name');
          done();
        });
    });

    it('should get stock by ID if string is numerical', done => {
      request(server)
        .get(searchRoute('1'))
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          const {message, stock} = res.body;
          expect(message).to.have.length.above(0);
          expect(stock).to.have.any.keys('symbol', 'name', 'change', 'history');
          expect(stock.history).to.be.an('array');
          done();
        });
    });

    it('should return Not Found with no results', done => {
      request(server)
        .get(searchRoute('JBOYS'))
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(404);
          expect(res.body.message).to.have.length.above(0);
          done();
        });
    });

    it('should return Not Found with no existing ID', done => {
      request(server)
        .get(searchRoute('420'))
        .end((err, res) => {
          if (err) {
            done(err);
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
