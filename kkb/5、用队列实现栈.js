const { Queue } = require('../utils/index.js')

function Stack() {
  const queue_1 = new Queue()
  const queue_2 = new Queue()

  let dataQueue = null
  let emptyQueue = null

  const handleInitQueue = function () {
    if (queue_1.isEmpty() && queue_2.isEmpty()) {
      dataQueue = queue_1
      emptyQueue = queue_2
    } else if (queue_1.isEmpty()) {
      dataQueue = queue_2
      emptyQueue = queue_1
    } else {
      dataQueue = queue_1
      emptyQueue = queue_2
    }
  }

  this.push = function (item) {
    handleInitQueue()

    dataQueue.enqueue(item)
  }

  this.top = function () {
    handleInitQueue()
    return dataQueue.tail()
  }

  this.pop = function () {
    handleInitQueue()

    while (dataQueue.size() > 1) {
      emptyQueue.enqueue(dataQueue.dequeue())
    }

    return dataQueue.dequeue()
  }

  this.size = function () {
    handleInitQueue()

    return dataQueue.size()
  }

  this.isEmpty = function () {
    handleInitQueue()

    return dataQueue.isEmpty()
  }

  this.clear = function () {
    handleInitQueue()

    dataQueue.clear()
  }
}

const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)

console.log(stack.pop())

console.log(stack.top())

console.log(stack.isEmpty())

console.log(stack.size())
