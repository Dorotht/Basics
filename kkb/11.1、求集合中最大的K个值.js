const { MinHeap } = require('../utils/index.js');

/**
 * 一个非常大的数据集合有n个整数，求集合中最大的K个值。
 *    用最小堆来算，非常简单，初始化一个大小为k的最小堆，先放入k个数，这时，堆顶元素最小，
 * 集合中剩余的数依次和堆顶元素比较，如果比堆顶元素大，则删除堆顶元素，并放入新的元素，
 * 全部比较以后，堆里的元素就是最大的k个值
 *
 * @param {*} array
 * @param {*} k
 */
function topK(array, k) {
  const minHeap = new MinHeap(k);
  for (var i = 0; i < k; i++) {
    minHeap.insert(array[i]);
  }

  for (let i = k; i < array.length; i++) {
    const item = array[i];

    if (item > minHeap.getMim()) {
      minHeap.removeMin();

      minHeap.insert(item);
    }
  }

  minHeap.print();
}

const arr = [53, 17, 78, 9, 45, 65, 87, 23];

console.time('time');
topK(arr, 3);
console.timeEnd('time');
