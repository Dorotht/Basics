const Queue = require('./Queue.js');

/**
 * 节点
 *
 * @class TreeNode
 */
class TreeNode {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
  }
}

/**
 * 二叉搜索树
 *
 * @class BinarySearchTree
 */
class BinarySearchTree {
  constructor(data) {
    this._root = data;
  }

  /**
   * 初始化
   *
   * @param {Array} array
   * @memberof BinarySearchTree
   */
  init(array) {
    for (let i = 0; i < array.length; i++) {
      this.__insertData(this._root, array[i]);
    }
  }

  /**
   * 插入实现方式
   *
   *  · 所有节点关键码都互不相同
   *  · 左子树上所有节点的关键码都小于根节点的关键码
   *  · 右子树上所有节点的关键码都大于根节点的关键码
   *  · 左右子树也是二叉搜索树
   *
   *    插入时，从根节点开始，被插入元素的关键码如果比根节点关键码小，则进入到左子树中执行插入操作，
   * 如果左子树不存在，则被插入元素成为左孩子；反之，进入到右子树中执行插入操作，如果右子树不存在，
   * 则被插入元素成为右孩子，如果被插入元素的关键码已经存在，则返回false。
   *
   * @param {Object} node
   * @param {*} data
   * @returns true 插入成功，false 插入失败
   * @memberof BinarySearchTree
   */
  __insertData(node, data) {
    if (!this._root) {
      this._root = new TreeNode(data);
      return true;
    }

    // 如果相等证明已经存在，不能在插入
    if (node.data === data) {
      return false;
    } else if (node.data > data) {
      // 大于当前节点, 左子树插入

      if (node.leftChild) {
        this.__insertData(node.leftChild, data);
      } else {
        const newNode = new TreeNode(data);

        node.leftChild = newNode;

        newNode.parent = node;

        return true;
      }
    } else {
      // 小于当前节点, 右子树插入
      if (node.rightChild) {
        this.__insertData(node.rightChild, data);
      } else {
        const newNode = new TreeNode(data);

        node.rightChild = newNode;

        newNode.parent = node;

        return true;
      }
    }
  }

  /**
   * 插入
   *
   * @param {*} data
   * @returns true 插入成功，false 插入失败
   * @memberof BinarySearchTree
   */
  insert(data) {
    return this.__insertData(this._root, data);
  }

  /**
   * 二叉树搜索
   *
   *     与插入算法非常接近，仍然是从树的根节点开始，如果被搜索元素的关键码比根节点关键码小，
   * 则进入到左子树中进行搜索，若左子树不存在，返回null，如果被搜索元素的关键码比根节点关键
   * 码大，则进入到右子树中进行搜索，若右子树不存在，返回null,如果根节点的关键码和被搜索元
   * 素的关键码相同，返回这个根节点。
   *
   * @param {Object} node
   * @param {*} data
   * @memberof BinarySearchTree
   */
  __searchData(node, data) {
    if (node === null) return null;

    if (node.data === data) {
      return node;
    } else if (node.data > data) {
      return this.__searchData(node.leftChild, data);
    } else {
      return this.__searchData(node.rightChild, data);
    }
  }

  /**
   * 返回搜索结果
   *
   * @param {*} data
   * @returns 返回搜索结果
   * @memberof BinarySearchTree
   */
  search(data) {
    return this.__searchData(this._root, data);
  }

  /**
   * 连接父节点和子节点
   *
   * @param {*} parent
   * @param {*} node
   * @param {*} nextNode
   * @memberof BinarySearchTree
   */
  __linkParent(parent, node, nextNode) {
    if (parent === null) {
      this._root = nextNode;
      this._root.parent = null;
    } else {
      if (parent.leftChild && parent.leftChild.data === node.data) {
        parent.leftChild = nextNode;
      } else {
        parent.rightChild = nextNode;
      }
    }
  }

  /**
   * 查找删除的元素, 并且删除
   *
   * 删除一个节点时，要考虑到必须将被删除节点的子孙节点连接到树上，同时保证二叉搜索树的性质。
   *
   * 根据被删除节点的左右子孩子，可以总结一下几种情况：
   *  1.被删除节点左右孩子都不存在
   *  2.被删除的节点没有右孩子
   *  3.被删除的节点没有左孩子
   *  4.被删除的节点左右孩子都存在
   *
   *    对于第一种情况, 最为简单, 只需要让其父节点指向它的指针指向null即可
   *    对于第二种情况, 用左孩子代替它的位置
   *    对于第三种情况, 用右孩子代替它的位置
   *    对于第三种情况, 稍微有些复杂, 首先, 去被删除节点的左右子树中找到中序遍历下的第一个节点, 假设
   * 节点的data是x, 讲被删除的节点替换成x, 而后, 在删除的节点的右子树中执行删除x的操作
   *
   *
   * @param {*} node
   * @memberof BinarySearchTree
   */
  __removeData(node, data) {
    if (node === null) return false;

    if (node.data > data) {
      return this.__removeData(node.leftChild, data);
    } else if (node.data < data) {
      return this.__removeData(node.rightChild, data);
    } else {
      if (node.leftChild && node.rightChild) {
        // 第四种情况
        let cur = node.rightChild;

        // 遍历找到中序遍历下的第一个节点
        while (cur.leftChild) {
          cur = cur.leftChild;
        }

        // 被删除的节点等于中序下的第一个节点
        node.data = cur.data;

        // 去右子树里删除中序下的第一个节点
        return this.__removeData(node.rightChild, cur.data);
      } else if (node.leftChild) {
        // 第二种情况
        this.__linkParent(node.parent, node, node.leftChild);
      } else {
        // 第三种情况
        this.__linkParent(node.parent, node, node.rightChild);
      }

      return true;
    }
  }

  /**
   * 返回删除结果
   *
   * @param {*} data
   * @returns 返回删除结果
   * @memberof BinarySearchTree
   */
  remove(data) {
    return this.__removeData(this._root, data);
  }

  /**
   * 返回根节点
   *
   * @memberof BinarySearchTree
   */
  getRoot() {
    return this._root;
  }

  /**
   * 分层打印
   *
   * @returns
   * @memberof BinarySearchTree
   */
  levelOrder(node) {
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
}

module.exports = BinarySearchTree;

// const list = [19, 27, 40, 35, 25, 10, 5, 17, 13, 7, 8];

// const bt = new BinarySearchTree();

// bt.init(list);

// const rootNode = bt.getRoot();

// bt.levelOrder(rootNode);

// console.log(bt.remove(7));
// bt.levelOrder(rootNode);

// console.log(bt.remove(17));
// bt.levelOrder(rootNode);

// console.log(bt.remove(27));
// bt.levelOrder(rootNode);
