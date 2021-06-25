const { Stack } = require("../utils/index.js");

function Queue() {
  const stack_1 = new Stack();
  const stack_2 = new Stack();

  let dataStack = null;
  let emptyStack = null;

  function handleInitStack() {
    if (stack_1.isEmpty() && stack_2.isEmpty()) {
      dataStack = stack_1;
      emptyStack = stack_2;
    } else if (stack_1.isEmpty()) {
      dataStack = stack_2;
      emptyStack = stack_1;
    } else {
      dataStack = stack_1;
      emptyStack = stack_2;
    }
  }

  this.enqueue = function (item) {
    handleInitStack();

    dataStack.push(item);
  };

  this.dequeue = function () {
    handleInitStack();

    while (dataStack.size() > 1) {
      emptyStack.push(dataStack.pop());
    }

    return dataStack.pop();
  };

  this.head = function () {
    handleInitStack();

    while (!dataStack.isEmpty()) {
      emptyStack.push(dataStack.pop());
    }

    return emptyStack.top();
  };

  this.size = function () {
    handleInitStack();

    return dataStack.size();
  };

  this.clear = function () {
    handleInitStack();

    return dataStack.clear();
  };

  this.isEmpty = function () {
    handleInitStack();

    return dataStack.isEmpty();
  };

  this.tail = function () {
    return dataStack.top();
  };
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);

console.log("res", queue.tail());
