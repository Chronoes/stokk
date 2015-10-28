import chai from 'chai';

import symbolCheck from '../server/queries';

describe('Stock queries', () => {
  chai.should();
  it('should return true if symbol is valid', done => {
    symbolCheck('AAPL').should.equal(true);
    symbolCheck('aapl').should.equal(true);
    symbolCheck('aa-s').should.equal(true);
    symbolCheck('aa.s').should.equal(true);
    done();
  });

  it('should return symbolCheck boolean value', done => {
    symbolCheck('AAPL').should.be.a('boolean');
    symbolCheck('aapl').should.be.a('boolean');
    symbolCheck('aa-s').should.be.a('boolean');
    symbolCheck('aa.s').should.be.a('boolean');
    done();
  });

  it('should stock by symbol', done => {
    done();
  });

  it('should return stock by date and symbol', done => {
    done();
  });

  it('should return false if symbol is not correct', done => {
    done();
  });
});
