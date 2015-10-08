import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';
import app from '../app';
import jwt from 'jsonwebtoken';
import fs from 'fs';


chai.use(supertestChai.httpAsserts);


describe('Login handler', () => {
  const route = '/api/login';

  let server;
  before(() => {
    server = app.listen(1338);
  });

  it('should return a token for valid user and password', done => {
    const secret = fs.readFileSync('./server/secret', 'utf8');
    const mockRequest = {
      email: 'test1@stokk.io',
      password: 'testingpass1',
    };

    request(server)
      .post(route)
      .send(mockRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.message).to.have.length.above(0);
        expect(mockRequest.email).to.equal(jwt.verify(res.body.token, secret).email);
        done();
      });
  });

  it('should respond with Unauthorized message (Username wrong)', done => {
    const mockRequest = {
      email: 'test11@stokk.io',
      password: '45tR0nGPa$$w0rD',
    };

    request(server)
      .post(route)
      .send(mockRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(401);
        expect(res.body.message).to.have.length.above(0);
        done();
      });
  });

  it('should respond with Unauthorized message (Password wrong)', done => {
    const mockRequest = {
      email: 'test1@stokk.io',
      password: '4GPa$$w0rD',
    };

    request(server)
      .post(route)
      .send(mockRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(401);
        expect(res.body.message).to.have.length.above(0);
        done();
      });
  });

  it('should fail with missing/empty arguments or empty request', done => {
    const mockRequest = {
      email: '',
      password: '',
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

  it('should fail with incorrect email');

  after(() => {
    server.close();
  });
});
