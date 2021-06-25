const { BinaryTree } = require('../utils/index.js');

const bt = new BinaryTree();
bt.init('A(B(D,E(G,)),C(,F))#');
const rootNode = bt.getRoot();

function mirror(node) {
  if (!node) return;

  // 临时存储右子树
  const rightChild = node.rightChild;

  // 完成左右互换
  node.rightChild = node.leftChild;
  node.leftChild = rightChild;

  // 底归对左右子节点完成互换
  mirror(node.leftChild);
  mirror(node.rightChild);
}

mirror(rootNode);

// 程序最终输出结果 F C A E G B D
bt.inOrder(rootNode);
