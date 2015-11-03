import chai, {expect} from 'chai';
import supertestChai, {request} from 'supertest-chai';

import app from '../app';
import User from '../server/models/User';
import Stock from '../server/models/Stock';

chai.use(supertestChai.httpAsserts);

describe('User stock handler', () => {
  const route = '/api/stocks';

  let server;
  before(() => {
    server = app.listen(1338);
  });

  context('GET request', () => {
    it('should get all stocks in database');

    it('should get stock by given symbol');

    it('should return Bad Request with unknown symbol');
  });

  after(() => {
    server.close();
  });
});
