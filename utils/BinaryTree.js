const Stack = require('./Stack.js');

/**
 * 树的节点
 *
 * @class BinTreeNode
 */
class BinTreeNode {
  constructor(data) {
    // 数据
    this.data = data;
    // 左孩子
    this.leftChild = null;
    // 右孩子
    this.rightChild = null;
    // 父节点
    this.parentNode = null;
  }
}

/**
 * 二叉树
 *
 * @class BinaryTree
 */
class BinaryTree {
  constructor() {
    // 根节点
    this._root = null;
  }

  /**
   * 初始化一棵树
   *
   * 它接收一个广义表, 创建二叉树.
   * 如何用广义表来表示二叉树, 以广义表 A(B(D,E(G,)), C(,F))# 为例, 算法如下
   *
   * · 广义表的表名放在前面, 表示二叉树的根节点, 括号中的是跟的左右子树.
   * · 每个节点的左右子树用逗号间隔, 如果仅有右子树没有左子树, 逗号不省略.
   * · 整个广义表的最后加上特殊符号#表示输入结束
   *
   *
   * @param {*} string
   * @memberof BinaryTree
   */
  init(string) {
    // 创建一个栈
    const stack = new Stack();

    // 默认等于 0
    // 1 = 识别到左子树
    // 2 = 识别到右子树
    let k = 0;

    // 新节点
    let newNode = null;

    for (let i = 0; i < string.length; i++) {
      const item = string[i];

      if (item === '#') break;

      // 遇到左子树
      if (item === '(') {
        k = 1;
        // 节点入栈
        stack.push(newNode);
      } else if (item === ',') {
        // 遇到右子树
        k = 2;
      } else if (item === ')') {
        // 遇到右括号, 节点出栈
        stack.pop();
      } else {
        newNode = new BinTreeNode(item);

        if (this._root === null) {
          // 根节点
          this._root = newNode;
        } else if (k === 1) {
          // 左子树
          const topItem = stack.top();
          topItem.leftChild = newNode;
          newNode.parentNode = topItem;
        } else {
          // 右子树
          const topItem = stack.top();
          topItem.rightChild = newNode;
          newNode.parentNode = topItem;
        }
      }
    }
  }

  // 返回根节点
  getRoot() {
    return this._root;
  }

  // 前序遍历
  preOrder(node) {
    if (node === null) return;

    console.log('preOrder ---> ', node.data);

    this.preOrder(node.leftChild);
    this.preOrder(node.rightChild);
  }

  // 中序遍历
  inOrder(node) {
    if (node === null) return;

    this.inOrder(node.leftChild);
    console.log('inOrder ---> ', node.data);
    this.inOrder(node.rightChild);
  }

  // 后续遍历
  postOrder(node) {
    if (node === null) return;

    this.postOrder(node.leftChild);
    this.postOrder(node.rightChild);

    console.log('postOrder ---> ', node.data);
  }

  // 返回节点数量
  size() {
    return this.__treeNodeCount(this._root);
  }

  // 计算节点数量
  __treeNodeCount(node) {
    if (!node) return 0;

    // 计算左侧节点数量
    const leftNodeCount = this.__treeNodeCount(node.leftChild);
    // 计算右侧节点数量
    const rightNodeCount = this.__treeNodeCount(node.rightChild);

    return leftNodeCount + rightNodeCount + 1;
  }

  // 返回树的高度
  height() {
    return this.__treeHeight(this._root);
  }

  // 计算树的高度
  __treeHeight(node) {
    if (!node) return 0;

    const leftNodeHeight = this.__treeHeight(node.leftChild);
    const rightNodeHeight = this.__treeHeight(node.rightChild);

    return leftNodeHeight > rightNodeHeight
      ? leftNodeHeight + 1
      : rightNodeHeight + 1;
  }

  // 返回查找的节点
  find(data) {
    return this.__findNode(this._root, data);
  }

  // 查找节点
  __findNode(node, data) {
    if (!node) return null;

    if (node.data === data) return node;

    // 查找左侧子节点
    const leftRes = this.__findNode(node.leftChild, data);

    if (leftRes) return leftRes;

    // 查找右侧子节点
    return this.__findNode(node.rightChild, data);
  }
}

// const binaryTree = new BinaryTree();
// binaryTree.init("A(B(D,E(G,)),C(,F))");

module.exports = BinaryTree;
