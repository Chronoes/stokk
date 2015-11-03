import chai, {expect} from 'chai';

import {symbolCheck, getStockBySymbol, getStockByDate} from '../server/queries';

chai.should();

describe('Stock queries', () => {
  it('should return true if symbol is valid', () => {
    symbolCheck('AAPL').should.be.true;
    symbolCheck('aapl').should.be.true;
    symbolCheck('aa-s').should.be.true;
    symbolCheck('aa.s').should.be.true;
    symbolCheck('ASa.s').should.be.true;
  });

  it('should return false if symbol is invalid', () => {
    symbolCheck('1234').should.be.false;
    symbolCheck('aas\'asd').should.be.false;
    symbolCheck('¹@££@£').should.be.false;
  });

  it('should return symbolCheck boolean value', () => {
    symbolCheck('AAPL').should.be.a('boolean');
    symbolCheck('aapl').should.be.a('boolean');
    symbolCheck('aa-s').should.be.a('boolean');
    symbolCheck('aa.s').should.be.a('boolean');
    symbolCheck('1234').should.be.a('boolean');
    symbolCheck('aas\'asd').should.be.a('boolean');
    symbolCheck('¹@££@£').should.be.a('boolean');
  });

  it('should return stock by symbol', () => {
    getStockBySymbol('AAPL', (data) => {
      (data.results.quote.symbol).should.be.equal('AAPL');
    });
    getStockBySymbol('GOOG', (data) => {
      (data.results.quote.symbol).should.be.equal('GOOG');
    });
  });

  it('should return stock by date and symbol', () => {
    getStockByDate('YHOO', '2009-09-11', '2010-03-10', function(history) {
      expect(history.results.quote[0].Symbol).to.be.equal('YHOO');
      expect(history.results.quote[0].Date).to.be.equal('2010-03-10');
    });
  });

  it('should return null if symbol is not correct or does', () => {
    getStockBySymbol('1234', (data) => {
      (data).should.be.null;
    });
    getStockByDate('1234', '2009-09-11', '2010-03-10', function(history) {
      (history).should.be.null;
    });
  });
});
