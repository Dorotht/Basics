const { Queue } = require('../utils/index.js')


function printYangHui(n) {
  const queue = new Queue()

  queue.enqueue(1)

  // 第一层for循环控制打印几层
  for (let i = 1; i <= n; i++) {
    let line = ''
    let pre = 0

    // 第二层for循环控制打印第 i 层
    for (let j = 0; j < i; j++) {
      let row = queue.dequeue()

      line += row + '   '

      // 计算下一行的内容
      const value = row + pre

      pre = row

      queue.enqueue(value)
    }

    // 每一层最后一个数字是1, 上面的for循环没有计算最后一个数
    queue.enqueue(1)

    console.log(line)
  }

  const size = queue.size()

  for (let i = 0; i < size; i++) {
    console.log(' -> ', queue.dequeue())
  }
}

printYangHui(2)
