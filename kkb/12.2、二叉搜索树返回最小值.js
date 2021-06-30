const { BinarySearchTree } = require('../utils/index.js');

const list = [19, 27, 40, 35, 25, 10, 5, 17, 13, 7, 8];
const bt = new BinarySearchTree();

bt.init(list);

function getTreeMin(node) {
  if (!node.leftChild) return node.data

  return getTreeMin(node.leftChild)
}

const ret = getTreeMin(bt.getRoot())

console.log(ret)
