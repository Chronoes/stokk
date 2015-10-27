import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';
import app from '../app';
import fs from 'fs';
import jwt from 'jsonwebtoken';

chai.use(supertestChai.httpAsserts);

describe('Registration handler', () => {
  const route = '/api/users/register';

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
      .post(route)
      .send(mockRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body.message).to.have.length.above(0);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });

  it('should respond with valid token after registering', done => {
    const secret = fs.readFileSync('./server/secret', 'utf8');
    const mockRequest = {
      email: 'testasdasd123@stokk.io',
      password: 'testingpass1',
    };

    request(server)
      .post(route)
      .send(mockRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body.message).to.have.length.above(0);
        expect(mockRequest.email).to.equal(jwt.verify(res.body.token, secret).email);
        done();
      });
  });

  it('should fail to create a new user if exists', done => {
    const mockRequest = {
      email: 'test1@stokk.io',
      password: '45tR0nGPa$$w0rD',
    };

    request(server)
      .post(route)
      .send(mockRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(409);
        expect(res.body.message).to.have.length.above(0);
        done();
      });
  });

  it('should respond with Bad Request on empty request', done => {
    const emptyRequest = {};
    request(server)
      .post(route)
      .send(emptyRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should respond with Bad Request on empty email', done => {
    const emptyEmailRequest = {
      email: '',
      password: '45tR0nGPa$$w0rD',
    };

    request(server)
      .post(route)
      .send(emptyEmailRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should respond with Bad Request on empty password', done => {
    const emptyPwRequest = {
      email: 'emptypw@stokk.io',
      password: '',
    };

    request(server)
      .post(route)
      .send(emptyPwRequest)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should fail with incorrect email', done => {
    const mockRequest = {
      email: 'stokk.io',
      password: '45tR0nGPa$$w0rD',
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

  after(() => {
    server.close();
  });
});
