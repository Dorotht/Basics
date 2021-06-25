const { BinaryTree, Queue } = require('../utils/index.js');

const bt = new BinaryTree();
bt.init('A(B(D,E(G,)),C(,F))#');
const rootNode = bt.getRoot();

function getWidth(node, n) {
  if (!node) return 0;

  const queue = new Queue();
  queue.enqueue(node);

  // 用0做分割，每一层的结尾都是0
  queue.enqueue(0);

  let width = 1;

  let level = 0;

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue();

    if (currentNode === 0) {
      level++;

      if (level === n) {
        return width;
      }

      width = queue.size();

      if (queue.isEmpty()) break;

      queue.enqueue(0);

      continue;
    }

    if (currentNode.leftChild) {
      queue.enqueue(currentNode.leftChild);
    }

    if (currentNode.rightChild) {
      queue.enqueue(currentNode.rightChild);
    }
  }
}

console.log(getWidth(rootNode, 1));
console.log(getWidth(rootNode, 2));
console.log(getWidth(rootNode, 3));
