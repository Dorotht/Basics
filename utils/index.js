const Stack = require('./Stack.js');
const MinStack = require('./MinStack.js');
const MaxHeap = require('./MaxHeap.js');
const Queue = require('./Queue.js');
const LinkedList = require('./LinkedList.js');
const DoubleLinkList = require('./DoubleLinkList.js');
const BitMap = require('./BitMap.js');
const BoolmFilter = require('./BoolmFilter.js');
const BinaryTree = require('./BinaryTree.js');
const MinHeap = require('./MinHeap.js');
const HuffmanTree = require('./HuffmanTree.js');
const BinarySearchTree = require('./BinarySearchTree.js');

/**
 * 生成睡随机数字
 *
 * @param {Number} min 最大值
 * @param {Number} max 最小值
 * @returns
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  random,
  Stack,
  MinStack,
  Queue,
  LinkedList,
  DoubleLinkList,
  BitMap,
  BoolmFilter,
  BinaryTree,
  MinHeap,
  MaxHeap,
  HuffmanTree,
  BinarySearchTree,
};
