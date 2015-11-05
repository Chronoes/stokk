import chai, {expect} from 'chai';

import {symbolCheck, getStockBySymbol, getStockByDate} from '../server/queries';

chai.should();

describe('Stock queries', () => {
  it('should return true if symbol is valid', () => {
    expect(symbolCheck('AAPL')).to.be.true;
    expect(symbolCheck('aapl')).to.be.true;
    expect(symbolCheck('aa-s')).to.be.true;
    expect(symbolCheck('aa.s')).to.be.true;
    expect(symbolCheck('AS.s')).to.be.true;
  });

  it('should return false if symbol is invalid', () => {
    expect(symbolCheck('1234')).to.be.false;
    expect(symbolCheck('aas\'asd')).to.be.false;
    expect(symbolCheck('¹@££@£')).to.be.false;
  });

  it('should return symbolCheck boolean value', () => {
    expect(symbolCheck('AAPL')).to.be.a('boolean');
    expect(symbolCheck('aapl')).to.be.a('boolean');
    expect(symbolCheck('aa-s')).to.be.a('boolean');
    expect(symbolCheck('aa.s')).to.be.a('boolean');
    expect(symbolCheck('1234')).to.be.a('boolean');
    expect(symbolCheck('aas\'asd')).to.be.a('boolean');
    expect(symbolCheck('¹@££@£')).to.be.a('boolean');
  });

  it('should return stock by symbol', done => {
    getStockBySymbol('AAPL')
      .then(data => {
        expect(data.symbol).to.be.equal('AAPL');
        done();
      })
      .catch(done);
  });

  it('should return stock by date and symbol', () => {
    getStockByDate('YHOO', '2009-09-11', '2010-03-10', function(history) {
      expect(history.quote[0].Symbol).to.be.equal('YHOO');
      expect(history.quote[0].Date).to.be.equal('2010-03-10');
    });
  });

  it('should return null if symbol is not correct or does', () => {
    getStockBySymbol('1234', (data) => {
      expect(data).to.be.null;
    });
    getStockByDate('1234', '2009-09-11', '2010-03-10', function(history) {
      expect(history).to.be.null;
    });
  });
});
