import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';
import app from '../server';

chai.use(supertestChai.httpAsserts);

describe('Registration handler', () => {
  let server;
  before(() => {
    server = app.listen(1338);
  });

  it('should create a new user in database', done => {
    const mockRequest = {
      email: 'tester@stokk.io',
      password: '45tR0nGPa$$w0rD',
    };
    request(server)
      .post('/api/register')
      .send(mockRequest)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.have.length.above(0);
        done();
      });
  });

  it('should fail to create a new user if exists', done => {
    const mockRequest = {
      email: 'test1@stokk.io',
      password: '45tR0nGPa$$w0rD',
    };
    request(server)
      .post('/api/register')
      .send(mockRequest)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(409);
        expect(res.body.message).to.have.length.above(0);
        done();
      });
  });

  it('should fail with missing/empty arguments or empty request');

  it('should fail with incorrect email');

  after(() => {
    server.close();
  });
});

