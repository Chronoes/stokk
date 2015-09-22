var expect = require('chai').expect;
// Delete this file later

function sum(n1, n2) {
  return n1 + n2;
}

describe('sum', function() {
  it('should return sum of two numbers', function() {
    expect(sum(1, 1)).to.equal(2);
  })
});
