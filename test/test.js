import {expect} from 'chai';
// Delete this file later

function sum(n1, n2) {
  return n1 + n2;
}

describe('sum', () => {
  it('should return sum of two numbers', () => {
    expect(sum(1, 1)).to.equal(2);
  });
});
