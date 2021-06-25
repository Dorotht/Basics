/**
 * 最小栈
 *
 */
function MinStack() {
  // 常规栈
  const dataStack = new Stack();
  // 专门存储最小值
  const minStack = new Stack();

  // push 的时候两个栈都要操作
  this.push = function (item) {
    // 常规栈操作
    dataStack.push(item);

    // 如果 minStack栈为空，item 为最小元素放入栈顶
    // 这样做的目的是保证minStack栈栈顶始终保持最小元素
    if (minStack.isEmpty() || minStack.top() > item) {
      minStack.push(item);
    } else {
      // 如果minStack栈顶元素大与item，把minStack栈顶元素再放入一次
      // minStack元素个数要和dataStack保持一直
      minStack.push(minStack.top());
    }
  };

  // pop 的时候两个栈都要pop
  this.pop = function () {
    dataStack.pop();
    minStack.pop();
  };

  // 直接取出最小栈顶元素
  this.min = function () {
    return minStack.top();
  };

  // 返回栈顶元素
  this.top = function () {
    return dataStack.top();
  };
}

module.exports = MinStack;
