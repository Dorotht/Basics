const { BinaryTree } = require('../utils/index.js');

function lowestCommonAncestor(rootNode, node1, node2) {
  if (!rootNode || rootNode.data === node1.data || rootNode.data === node2.data) return rootNode;

  const ret1 = lowestCommonAncestor(rootNode.leftChild, node1, node2);
  const ret2 = lowestCommonAncestor(rootNode.rightChild, node1, node2);
  console.log(111, ret2)

  return ret1 && ret2 ? rootNode : ret1 || ret2
}

const bt = new BinaryTree();
bt.init('A(B(D,E(G,)),C(,F))#');
const rootNode = bt.getRoot();
const node1 = bt.find('G');
const node2 = bt.find('F');

console.time('time');
const ancestor = lowestCommonAncestor(rootNode, node1, node2);
console.timeEnd('time');

// 程序最终输出结果 B
console.log(ancestor.data);
