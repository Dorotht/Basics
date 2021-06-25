// const { Queue } = require('./utils/index.js')

/**
 * 队列
 *
 */
function Queue() {
  let items = []

  // 从队列尾部添加一个元素
  this.enqueue = function (item) {
    items.push(item)
  }

  // 从队列头部删除一个元素
  this.dequeue = function () {
    return items.shift()
  }

  // 返回头部元素
  this.head = function () {
    return items[0]
  }

  // 返回队列大小
  this.size = function () {
    return items.length
  }

  // 清空队列
  this.clear = function () {
    items = []
  }

  // 判断队列是否为空
  this.isEmpty = function () {
    return items.length === 0
  }

  // 返回队列尾节点
  this.tail = function () {
    return items[items.length - 1]
  }
}

// 打印标记好的迷宫地图
function handlePrint(maze) {
  maze.forEach(array => {
    array.forEach(element => {
      document.writeln(`<div>${element}</div>`)
    });

    document.writeln('<br/>')
  });

  document.writeln('<br/>')
  document.writeln('<br/>')
  document.writeln('<br/>')
}


// 初始化地图信息
const maze = [
  [0, 0, 'x', 0, 0, 0, 0],
  [0, 0, 'x', 'x', 0, 0, 0],
  [0, 0, 0, 0, 'x', 0, 0],
  [0, 0, 0, 'x', 'x', 0, 0],
  [0, 0, 0, 0, 'x', 0, 0],
  ['x', 'x', 'x', 0, 0, 0, 0],
  ['x', 'x', 'x', 0, 0, 0, 0]
]

/**
 * 元素为0，表示这个点可以同行， 元素为 x, 表示不可以通行
 * 设置起点 maze[2][1]
 * 设置终点 maze[3][5]
 *
 * 用程序计算这两个点是否相通，如果相通请输出两点之间的最短路径
 * 从起点到终点所经过的每一个点
 *
 * @param {Array} maze 迷宫地图
 * @param {Array} start 起始位置
 * @param {Array} end 结束位置
 * @returns
 */
function mazes(maze, start, end) {
  // 两点之间路径
  const route = []

  // 长度边界
  const length = maze.length

  // 队列
  const queue = new Queue()

  // 边界点，初始化边界点为终点
  // 迷宫标记完成之后 边界点为开始位置，用于查找 终点到
  let boundary = end

  // 初始化 把起始位置放入队列
  queue.enqueue(start)

  let index = 0

  // 已经查询到边界点
  function handleIsBoundary(item) {
    if (item[0] === boundary[0] && item[1] === boundary[1]) {
      queue.clear()
      return true
    }
  }

  // 一次出队列, 查询当前位置的上下左右, 如果一下点可以可以通行, 在当前位置上 加 1进行标记下一个点
  // 把可通行的坐标放入队列
  while (!queue.isEmpty()) {
    const item = queue.dequeue()

    const y = item[0]
    const x = item[1]

    index = maze[y][x] + 1

    handleUp(item[0], item[1], index)

    handleDown(item[0], item[1], index)

    handleLeft(item[0], item[1], index)

    handleRight(item[0], item[1], index)
  }

  // 向上查寻
  function handleUp(y, x, index) {
    if (handleIsBoundary([y, x])) return

    if (y - 1 >= 0 && (maze[y - 1][x]) === 0) {
      maze[y - 1][x] = index

      queue.enqueue([y - 1, x])
    }
  }

  // 向下查询
  function handleDown(y, x, index) {
    if (handleIsBoundary([y, x])) return

    if (y + 1 < length && (maze[y + 1][x]) === 0) {
      maze[y + 1][x] = index

      queue.enqueue([y + 1, x])
    }
  }

  // 向左差选
  function handleLeft(y, x, index) {
    if (handleIsBoundary([y, x])) return

    if (x - 1 >= 0 && maze[y][x - 1] === 0) {
      maze[y][x - 1] = index

      queue.enqueue([y, x - 1])
    }
  }

  // 向右查询
  function handleRight(y, x, index) {
    if (handleIsBoundary([y, x])) return

    if (x + 1 < length && maze[y][x + 1] === 0) {
      maze[y][x + 1] = index

      queue.enqueue([y, x + 1])
    }
  }

  // 把起始点还原成 0
  maze[start[0]][start[1]] = 0

  console.log('终点 ->', maze[end[0]][end[1]])

  // 打印迷宫地图
  handlePrint(maze)





  // 终点入队列用于 判断两个节点之间是否相通
  queue.enqueue(end)

  boundary = start

  while (!queue.isEmpty()) {
    const item = queue.dequeue()

    const num = maze[item[0]][item[1]] - 1

    const y = item[0]
    const x = item[1]

    handleSelectRoute(y, x, num)
  }

  function handleSelectRoute(y, x, num) {
    if (handleIsBoundary([y, x])) return

    if (y - 1 >= 0 && (maze[y - 1][x]) === num) {
      route.push([y - 1, x])

      queue.enqueue([y - 1, x])

      return
    }


    if (y + 1 < length && (maze[y + 1][x]) === num) {
      route.push([y + 1, x])

      queue.enqueue([y + 1, x])

      return
    }

    if (x - 1 >= 0 && maze[y][x - 1] === num) {
      route.push([y, x - 1])

      queue.enqueue([y, x - 1])

      return
    }

    if (x + 1 < length && maze[y][x + 1] === num) {
      route.push([y, x + 1])

      queue.enqueue([y, x + 1])

      return
    }
  }

  route.reverse()

  route.push(end)

  return route
}

console.log('res -> ', mazes(maze, [2, 1], [3, 5]))
