import chai from 'chai';

import {symbolCheck} from '../server/queries';

chai.should();

describe('Stock queries', () => {
  it('should return true if symbol is valid', () => {
    symbolCheck('AAPL').should.be.true;
    symbolCheck('aapl').should.be.true;
    symbolCheck('aa-s').should.be.true;
    symbolCheck('aa.s').should.be.true;
  });

  it('should return symbolCheck boolean value', () => {
    symbolCheck('AAPL').should.be.a('boolean');
    symbolCheck('aapl').should.be.a('boolean');
    symbolCheck('aa-s').should.be.a('boolean');
    symbolCheck('aa.s').should.be.a('boolean');
  });

  it('should stock by symbol');

  it('should return stock by date and symbol');

  it('should return false if symbol is not correct');
});
