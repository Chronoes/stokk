import {expect} from 'chai';

import {symbolCheck, getStockBySymbol, getStockByDate, arrayToString} from '../server/queries';

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

  it('should return stock by date and symbol', done => {
    getStockByDate('YHOO', '2009-09-11', '2010-03-10')
      .then(history => {
        expect(history[0].symbol).to.be.equal('YHOO');
        expect(history[0].date).to.be.equal('2010-03-10');
        done();
      })
      .catch(done);
  });

  it('should return null if symbol is not correct', done => {
    getStockBySymbol('1234')
      .then(data => {
        expect(data).to.be.null;
        done();
      })
      .catch(done);
  });

  it('should return null if symbol is valid but does not exist', done => {
    getStockBySymbol('aaaaaaaa')
      .then(data => {
        expect(data).to.be.null;
        done();
      })
      .catch(done);
  });

  it('should return null when symbol with date is not valid', done => {
    getStockByDate('1234', '2009-09-11', '2010-03-10')
      .then(history => {
        expect(history).to.be.null;
        done();
      })
      .catch(done);
  });

  it('should return null when symbol with date is valid but does not exist', done => {
    getStockByDate('aaaaaaaa', '2009-09-11', '2010-03-10')
      .then(history => {
        expect(history).to.be.null;
        done();
      })
      .catch(done);
  });

  it('should return symbol if it is not array', done => {
    expect(arrayToString('AAPL')).to.be.equal('AAPL');
    done();
  });

  it('should return string of multiple symbols', done => {
    expect(arrayToString(['AAPL', 'AAPL'])).to.be.equal('\'AAPL\',\'AAPL\'');
    done();
  });

  it('should return all stocks what were asked', done => {
    getStockBySymbol(['AAPL', 'GOOG'])
      .then(data => {
        expect(data[0].symbol).to.be.equal('AAPL');
        expect(data[1].symbol).to.be.equal('GOOG');
        done();
      })
      .catch(done);
  });
});
