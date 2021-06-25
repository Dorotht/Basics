const { Queue } = require('../utils/index.js')

const list = []

for (let i = 0; i < 100; i++) {
  list.push(i)
}

function dleRing(array) {
  const queue = new Queue()

  // 把元素放入队列
  for (let i = 0; i < array.length; i++) {
    queue.enqueue(array[i])
  }

  let index = 1

  // 保留最后一个
  while (queue.size() !== 1) {
    // 弹出
    let item = queue.dequeue()

    // 每隔两个删除一个, 不是被删除的将重新放回队列尾部
    if (index % 3 !== 0) {
      queue.enqueue(item)
    }

    index++
  }

  return queue.head()
}


console.log('res -> ', dleRing(list))
