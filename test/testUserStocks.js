import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';
import app from '../app';

chai.use(supertestChai.httpAsserts);

describe('User stock handler', () => {
  const makeRoute = id => `/api/users/${id}/stocks`;

  let server;
  before(() => {
    server = app.listen(1338);
  });

  it('should return an array of stocks based on ID', done => {
    const route = makeRoute(1);

    request(server)
      .get(route)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const {message, stocks} = res.body;
        expect(res).to.have.status(200);
        expect(message).to.have.length.above(0);
        expect(stocks).to.be.an('array');
        expect(stocks).to.have.length(4);
        expect(stocks[0]).to.be.an('object');
        expect(stocks[0]).to.have.any.keys('symbol', 'name', 'currentPrice');
        done();
      });
  });

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

  after(() => {
    server.close();
  });
});
