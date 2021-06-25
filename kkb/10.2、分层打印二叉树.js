const { BinaryTree, Queue } = require('../utils/index.js');

const bt = new BinaryTree();
bt.init('A(B(D,E(G,)),C(,F))#');
const rootNode = bt.getRoot();

function levelOrder(node) {
  if (node === null) return;

  const queue = new Queue();

  queue.enqueue(node);

  // 用0做分割，每一层的结尾都是0
  queue.enqueue(0);

  let str = '';

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue();

    if (currentNode === 0) {
      console.log(str);

      str = '';

      if (queue.isEmpty()) break;

      queue.enqueue(0);

      continue;
    }

    str = str + ' ' + currentNode.data;

    if (currentNode.leftChild) {
      queue.enqueue(currentNode.leftChild);
    }

    if (currentNode.rightChild) {
      queue.enqueue(currentNode.rightChild);
    }
  }
}

console.time('time');
levelOrder(rootNode);
console.timeEnd('time');
