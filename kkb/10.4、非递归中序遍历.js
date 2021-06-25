const { Stack, BinaryTree } = require('../utils/index.js');

const bt = new BinaryTree();
bt.init('A(B(D,E(G,)),C(,F))#');
const rootNode = bt.getRoot();
bt.inOrder(rootNode);

console.log('-------------------------------------------');

function inOrder(node) {
  const stack = new Stack();

  let currNode = node;

  while (true) {
    while (currNode) {
      stack.push(currNode);
      currNode = currNode.leftChild;
    }

    const item = stack.pop();

    console.log('inOrder ---> ', item.data);

    currNode = item.rightChild

    if (!currNode && stack.isEmpty()) break;
  }
}

inOrder(rootNode);
