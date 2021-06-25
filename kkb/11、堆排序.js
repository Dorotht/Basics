const { MinHeap } = require('../utils/index.js');

function sortArr(array) {
  const minHeap = new MinHeap(array.length);
  minHeap.init(array);

  const ret = [];
  for (let index = 0; index < array.length; index++) {
    ret.push(minHeap.removeMin());
  }

  return ret;
}
const arr = [53, 17, 78, 9, 45, 65, 87, 23];

console.time('time');
const list = sortArr(arr);
console.timeEnd('time');

console.log('list', list);
