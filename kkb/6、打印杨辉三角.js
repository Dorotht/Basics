const { Queue } = require('../utils/index.js')


function printYangHui(n) {
  const queue = new Queue()

  queue.enqueue(1)

  for (let i = 1; i <= n; i++) {
    let line = ''
    let pre = 0


    for (let j = 0; j < i; j++) {
      let row = queue.dequeue()

      line += row + '   '

      const value = row + pre

      pre = row

      queue.enqueue(value)
    }

    queue.enqueue(1)

    console.log(line)
  }

  const size = queue.size()

  for (let i = 0; i < size; i++) {
    console.log(' -> ', queue.dequeue())
  }
}

printYangHui(4)
