export function euclideanDistance(vector1, vector2) {
  return Math.sqrt(vector1.reduce((acc, next, idx) => acc + Math.pow(next - vector2[idx], 2), 0));
}

export function nearestNeighbours(trainingSet, testVector, k) {
  const distances = trainingSet.map((vector, idx) => {
    return {idx, distance: euclideanDistance(testVector, vector)};
  });
  distances.sort((curr, next) => curr.distance - next.distance);
  return distances.slice(0, k).map(vector => vector.idx);
}

export function normaliseValues(values) {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  return values.map(value => ((value - minValue) / (maxValue - minValue)));
}
