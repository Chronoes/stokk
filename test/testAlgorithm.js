import {expect} from 'chai';
import {euclideanDistance, nearestNeighbours, normaliseValues} from '../server/algorithm';

describe('K-nearest neighbour algorithm', () => {
  context('#euclideanDistance()', () => {
    it('should calculate vector distance', () => {
      expect(euclideanDistance([0, 0], [0, 0])).to.be.closeTo(0, 0.00001);
      expect(euclideanDistance([2, 1], [1, 2])).to.be.closeTo(Math.sqrt(2), 0.0001);
      expect(euclideanDistance([5, 2, 1], [2, 2, 5])).to.be.closeTo(5, 0.0001);
    });
  });

  context('#nearestNeighbours()', () => {
    it('should return k most similar indexes of training set to the test value', () => {
      const trainingSet = [[2, 2, 2], [4, 4, 4]];
      expect(nearestNeighbours(trainingSet, [5, 5, 5], 1)).to.deep.equal([1]);
    });
  });

  context('#normaliseValues()', () => {
    it('should return normalised values between 0 and 1 of random data', () => {
      expect(normaliseValues([0, 10, 2, 4])).to.deep.equal([0, 1, 0.2, 0.4]);
    });
  });
});
