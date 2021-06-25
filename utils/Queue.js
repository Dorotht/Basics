/**
 * 队列
 *
 */
function Queue() {
  let items = [];

  // 从队列尾部添加一个元素
  this.enqueue = function (item) {
    items.push(item);
  };

  // 从队列头部删除一个元素
  this.dequeue = function () {
    return items.shift();
  };

  // 返回头部元素
  this.head = function () {
    return items[0];
  };

  // 返回队列大小
  this.size = function () {
    return items.length;
  };

  // 清空队列
  this.clear = function () {
    items = [];
  };

  // 判断队列是否为空
  this.isEmpty = function () {
    return items.length === 0;
  };

  // 返回队列尾节点
  this.tail = function () {
    return items[items.length - 1];
  };
}

module.exports = Queue;
