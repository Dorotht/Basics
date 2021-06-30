const { BinarySearchTree } = require('../utils/index.js');

const list = [19, 27, 40, 35, 25, 10, 5, 17, 13, 7, 8];
const bt = new BinarySearchTree();

bt.init(list);

function getTreeMax(node) {
  if (!node.rightChild) return node.data

  return getTreeMax(node.rightChild)
}

const ret = getTreeMax(bt.getRoot())

console.log(ret)
