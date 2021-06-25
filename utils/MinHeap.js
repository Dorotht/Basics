/**
 * 最小堆
 *
 *    数据集合有序，能够为各种操作带来便利，但有些应用并不要求所有数据都是有序的，
 * 或者在操作开始之前就变得完全有序。一些应用需要先收集一部分数据，从中挑选出最大
 * 或者最小的关键码记录开始处理，后续会收集更多数据但始终处理数据集中有最小或最大
 * 关键码的记录，比如优先级队列，优先级队列并不满足先进先出的特性，它能做到高优先
 * 级的先出队列，在优先级队列的各种实现中，堆是最高效的一种数据结构。
 *
 * 数组中的索引从0开始，元素个数为n, 在堆中给定索引为i的节点时：
 *   · 如果i=0, 节点i是根节点，否则节点i的父节点为(i-1)/2
 *   · 如果2*i + 1 > n-1, 则节点i无左子女，否则节点i的左子女为2*i + 1
 *   · 如果2*i + 2 > n-1, 则节点i无右子女，否则节点i的右子女为2*i + 2
 *
 *
 * @class MinHeap
 */
class MinHeap {
  constructor(maxSize) {
    // 数组
    this._heap = [];
    // 当前堆的大小
    this._currSize = 0;
    // 堆最大容量
    this._maxSize = maxSize;
  }

  /**
   * 传入一个数组调整为最小堆
   *
   *    初始化并不是一个最小堆，我们需要将其调整为最小堆。调整的过程自下而上，先保证局部是一个最小堆，
   * 然后从局部到整体，逐步扩大，直到将整棵树都调整为最小堆。调整算法的基本思想是找到所有的分支节点，
   * 然后根据这些分支节点的索引从大到小依次进行调整，每次调整时，从该分支节点向下进行调整，使得这个
   * 分支节点和它的子孙节点构成一个最小堆，假设数组的大小为n，则最后一个分支节点的索引是（n-2）/2，
   * 第一个分支节点的索引是0。
   *
   *    在局部进行调整时，如果父节点的关键码小于等于两个子女中的最小关键码，说明，不需要调整了，否则，
   * 将父节点和拥有最小关键码的子女进行位置互换，并继续向下比较调整。
   *
   * @param {Array} array
   * @memberof MinHeap
   */
  init(array) {
    this._currSize = array.length;

    this._heap = new Array(array.length);

    // 填充 this._heap, 目前还不是一个堆
    for (let i = 0; i < this._currSize; i++) {
      this._heap[i] = array[i];
    }

    // 这是堆的最后一个分支节点
    let currPos = Math.floor((this._currSize - 2) / 2);

    while (currPos >= 0) {
      // 局部自上向下下滑调整
      this.__shifDown(currPos, this._currSize - 1);

      // 调整下一个节点分支
      currPos--;
    }
  }

  // 打印
  print() {
    console.log('print --- >', this._heap);
  }

  // 返回当前堆的大小
  size() {
    return this._currSize;
  }

  // 返回堆顶数据
  getMim() {
    return this._currSize > 0 ? this._heap[0] : null;
  }

  /**
   * 插入
   *
   *    insert方法，将新的元素插入到最小堆中，由于此前，最小堆已经建好，
   * 那么就可以从下向上，与父节点的关键码进行比较，对调。
   *
   * @param {*} item
   * @returns
   * @memberof MinHeap
   */
  insert(item) {
    // 堆满了不能再放入元素了
    if (this._currSize === this._maxSize) return false;

    // 插入到堆的最后一个位置
    this._heap[this._currSize] = item;

    // 排序
    this.__shifUp(this._currSize);

    // 堆的数量加一
    this._currSize++;

    return true;
  }

  /**
   * 删除掉最小堆的最小值，用用后一个元素取代堆顶元素，取代后，最小堆被破坏，使用 __shifDown方法向下做调整。
   *
   * @memberof MinHeap
   */
  removeMin() {
    if (this._currSize <= 0) return null;

    const minValue = this._heap[0];
    this._heap[0] = this._heap[this._currSize - 1];

    this._currSize--;

    this.__shifDown(0, this._currSize - 1);

    return minValue;
  }

  // 向下调整
  __shifDown(start, m) {
    // 从start位置开始，向下滑动调整
    // start室当前局部节点的父节点
    let parentIndex = start;
    // 一定有左孩子，先让minChildIndex等于左孩子的索引
    let minChildIndex = parentIndex * 2 + 1;

    while (minChildIndex <= m) {
      // minChildIndex + 1 是右孩子的索引，左孩子大于有孩子
      // minChildIndex 永远指向值小的那个孩子
      if (
        minChildIndex < m &&
        this._heap[minChildIndex] > this._heap[minChildIndex + 1]
      ) {
        minChildIndex += 1;
      }

      // 循环结束不需要调整
      if (this._heap[parentIndex] <= this._heap[minChildIndex]) break;

      // 父节点和子节点互换
      let tmp = this._heap[parentIndex];
      this._heap[parentIndex] = this._heap[minChildIndex];
      this._heap[minChildIndex] = tmp;

      // 最小子节点改为父节点
      parentIndex = minChildIndex;
      // 子节点查找当前子节点的左孩子
      minChildIndex = minChildIndex * 2 + 1;
    }
  }

  // 向上调整
  __shifUp(start) {
    // 当前节点是叶节点
    let childIndex = start;
    // 找到父节点
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (childIndex > 0) {
      // 子节点大于父节点就不用调整了
      if (this._heap[childIndex] >= this._heap[parentIndex]) break;

      // 子节点和父节点交换
      const tmp = this._heap[parentIndex];
      this._heap[parentIndex] = this._heap[childIndex];
      this._heap[childIndex] = tmp;

      childIndex = parentIndex;

      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
  }
}

module.exports = MinHeap;

// const arr = [53, 17, 78, 9, 45, 65, 87, 23];
// const arr = [0.12, 0.4, 0.15, 0.08, 0.25];

// const minHeap = new MinHeap(arr.length + 10);
// minHeap.init(arr);
// minHeap.insert(11)
// minHeap.insert(12)
// minHeap.print()
