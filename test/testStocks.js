import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';

import app from '../app';

chai.use(supertestChai.httpAsserts);

describe('Stock handler', () => {
  const route = '/api/stocks';
  const symbolRoute = symbol => `/api/stocks/${symbol}`;

  let server;
  before(() => {
    server = app.listen(1338);
  });

  context('GET request', () => {
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

    it('should get stock by given symbol', done => {
      request(server)
        .get(symbolRoute('GOOG'))
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

    it('should return Not Found with no results', done => {
      request(server)
        .get(symbolRoute('JBOYS'))
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
