// import chai, {expect} from 'chai';
// import supertestChai, {request} from 'supertest-chai';
import app from '../app';

// chai.use(supertestChai.httpAsserts);


describe('Login handler', () => {
  // const route = '/api/login';

  let server;
  before(() => {
    server = app.listen(1338);
  });

  it('should return a token for valid user and password');

  it('should respond with Unauthorized for no user or wrong password');

  it('should fail with missing/empty arguments or empty request');

  it('should fail with incorrect email');

  after(() => {
    server.close();
  });
});
