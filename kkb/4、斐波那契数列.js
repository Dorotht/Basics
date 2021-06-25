const { Queue } = require('../utils/index.js')

function fibonacci(n) {
  if (n <= 2) return n

  const queue = new Queue()

  queue.enqueue(1)
  queue.enqueue(1)

  let index = 0

  while (index < n - 2) {
    const delItem = queue.dequeue()

    const headItem = queue.head()

    const nextItem = delItem + headItem

    queue.enqueue(nextItem)

    index++
  }

  queue.dequeue()

  return queue.head()
}

console.log('res', fibonacci(4))
