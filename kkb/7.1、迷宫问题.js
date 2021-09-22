const { Queue } = require('../utils/index.js')

// 起始点是maze_array[2][1], 终点是 maze_array[3][5]
let maze_array = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0]
];


let Node = function (x, y) {
  this.x = x;
  this.y = y;
  this.step = 0;
};

let Position = function (x, y) {
  this.x = x;
  this.y = y;
}


// 找到pos可以到达的点
function find_position(pos, maze) {
  let x = pos.x;
  let y = pos.y;
  let pos_arr = [];
  // 上面的点
  if (x - 1 >= 0) {
    pos_arr.push(new Position(x - 1, y));
  }
  // 右面的点
  if (y + 1 < maze[0].length) {
    pos_arr.push(new Position(x, y + 1));
  }
  // 下面的点
  if (x + 1 < maze.length) {
    pos_arr.push(new Position(x + 1, y));
  }
  // 左面的点
  if (y - 1 >= 0) {
    pos_arr.push(new Position(x, y - 1));
  }
  return pos_arr;
};

function print_node(maze_node) {
  for (let i = 0; i < maze_node.length; i++) {
    let arr = [];
    for (let j = 0; j < maze_node[i].length; j++) {
      arr.push(maze_node[i][j].step);
    }
    console.log(arr);
  }
}

function find_path(maze, start_pos, end_pos) {
  let maze_node = [];
  // 初始化maze_node,用于记录距离出发点的距离
  for (let i = 0; i < maze_array.length; i++) {
    let arr = maze_array[i];
    let node_arr = [];
    for (let j = 0; j < arr.length; j++) {
      let node = new Node(i, j);
      node_arr.push(node);
    }
    maze_node.push(node_arr);
  }

  console.log(maze_node)

  // 先把出发点放入到队列中
  let queue = new Queue();
  queue.enqueue(start_pos);
  let b_arrive = false;
  let max_step = 0;         // 记录从出发点到终点的距离
  while (true) {
    // 从队列中弹出一个点,计算这个点可以到达的位置
    let position = queue.dequeue();
    let pos_arr = find_position(position, maze)
    for (let i = 0; i < pos_arr.length; i++) {
      let pos = pos_arr[i];
      // 判断是否到达终点
      if (pos.x == end_pos.x && pos.y == end_pos.y) {
        b_arrive = true;
        max_step = maze_node[position.x][position.y].step;
        break;
      }

      // 起始点
      if (pos.x == start_pos.x && pos.y == start_pos.y) {
        continue;
      }
      // 不能通过
      if (maze[pos.x][pos.y] == 1) {
        continue;
      }
      // 已经标识过步数
      if (maze_node[pos.x][pos.y].step > 0) {
        continue;
      }
      // 这个点的步数加 1
      maze_node[pos.x][pos.y].step = maze_node[position.x][position.y].step + 1;
      queue.enqueue(pos);
    }
    //到达终点了
    if (b_arrive) {
      break
    }

    // 栈为空,说明找不到
    if (queue.isEmpty()) {
      break;
    }
  }

  // 方向查找路径
  let path = [];
  if (b_arrive) {
    // 能够找到路径
    path.push(end_pos);
    let old_pos = end_pos;
    let step = max_step;
    while (step > 0) {
      let pos_arr = find_position(old_pos, maze);
      for (let i = 0; i < pos_arr.length; i++) {
        let pos = pos_arr[i];

        if (maze_node[pos.x][pos.y].step == step) {
          step -= 1;
          old_pos = pos;
          path.push(pos);
          break;
        }
      }
    }
    path.push(start_pos);
  }

  // console.log(path.reverse());


};



let start_pos = new Position(2, 1);
let end_pos = new Position(3, 5);

find_path(maze_array, start_pos, end_pos);
