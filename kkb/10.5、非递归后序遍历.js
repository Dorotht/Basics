const { Stack, BinaryTree } = require('../utils/index.js');

const bt = new BinaryTree();
bt.init('A(B(D,E(G)),C(,F))#');
const rootNode = bt.getRoot();
bt.postOrder(rootNode);

console.log('-------------------------------------------');

class Tag{
  constructor(node, state) {
    this._node = node
    // 0表示左边已经遍历结束, 1表示右边已经遍历结束
    this._state = state
  }
}

function inOrder(node) {
  const stack = new Stack();

  let currNode = node;

  while (true) {
    while (currNode) {
      stack.push(new Tag(currNode, 0));
      currNode = currNode.leftChild;
    }

    const item = stack.pop();

    if (item._node.rightChild && item._state === 0){
      item._state = 1

      stack.push(item)

      currNode = item._node.rightChild
    } else {
      console.log(item._node.data)
    }

    if (!currNode && stack.isEmpty()) break;
  }
}

inOrder(rootNode);
