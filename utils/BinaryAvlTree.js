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
    this.abs = 0;
  }
}

/**
 * AVL树
 *
 * 概念
 *    二叉搜索树，搜索一个数据时，进行比较的次数和树的高度有关，高度越高，平均比较次数就越大，最坏的情况下，
 * 二叉搜索树等同于一个链表。
 *    这样的二叉搜索树和链表没有区别，无法提高搜索效率，1962年，数学家 G. M. Adelson-Velsky和E. M. Landis
 * 在他们的论文中发表了它，AVL就取自于这两个人的名字。
 *    AVL树首先是一棵二叉搜索树，但它具备自平衡的能力，它的左右子树都是AVL树，且左右子树的高度差的绝对值不超过1。
 *    在每个节点旁边标注的是这个节点的平衡因子bf (balance factor)，平衡因子等于右子树的高度减去左子树的高度，
 * 对于一个有n个节点的AVL树，它的高度将保持在 O(log2n)，平均搜索长度也可以保持在 O(log2n)
 *
 * @class BinaryAvlTree
 */
class BinaryAvlTree {
  constructor() {
    //  根节点
    this._root = null;
  }

  /**
   * 返回根节点
   *
   * @returns
   * @memberof BinaryAvlTree
   */
  getRoot() {
    return this._root;
  }

  /**
   * 初始化
   *
   * @memberof BinaryAvlTree
   */
  init(array) {
    for (let i = 0; i < array.length; i++) {
      this.__insertData(this._root, array[i]);
    }
  }

  /**
   * 插入数据
   *
   * @param {*} data
   * @returns
   * @memberof BinaryAvlTree
   */
  insert(data) {
    return this.__insertData(this._root, data);
  }

  /**
   * 插入数据的具体是实现方法
   *
   * @param {*} node
   * @param {*} data
   * @memberof BinaryAvlTree
   */
  __insertData(node, data) {
    // 不存在根节点，创建新的节点等于根节点
    if (this._root === null) {
      const newNode = new TreeNode(data);
      this._root = newNode;
      return true;
    }

    // 如果插入的节点存在书节点中, 不做插入操作, 返回false
    if (data === node.data) {
      return false;
    } else if (data < node.data) {
      if (node.leftChild) {
        this.__insertData(node.leftChild, data);
      } else {
        const newNode = new TreeNode(data);

        node.leftChild = newNode;

        newNode.parent = node;

        this.__treeAds(node);

        return true;
      }
    } else {
      if (node.rightChild) {
        this.__insertData(node.rightChild, data);
      } else {
        const newNode = new TreeNode(data);

        node.rightChild = newNode;

        newNode.parent = node;

        this.__treeAds(node);

        return true;
      }
    }
  }

  /**
   * 计算当前的平衡因子
   *
   *    对于一棵AVL树，它的任意一个节点的平衡因子都只能取 -1， 0， 1中的一个，
   * 如果节点的平衡因子绝对值大于1，则AVL数失去了平衡性。
   *
   *
   * @param {*} node
   * @memberof BinaryAvlTree
   */
  __treeAds(node) {
    // 计算右子树高度
    const rightChildHeight = this.__treeHeight(node.rightChild);

    // 计算左子树高度
    const leftChildHeight = this.__treeHeight(node.leftChild);

    // 右子树高度减去左子树高度就是当前节点的平衡因子了
    const abs = rightChildHeight - leftChildHeight;

    node.abs = abs;

    // 父节点的平衡因子为0，那么万事大吉，插入的这个新节点没有导致不平衡
    if (abs === 0) {
      return;
    } else if (abs === 1 || abs === -1) {
      // 父节点的平衡因子变为-1或者1，只能说明这棵子树是平衡的，但这棵子树的高度增加了1，
      // 会影响到更高层的节点，因此要继续向上遍历更新父节点的平衡因子，直到找到平衡因子
      // 变为2或-2的节点，或者遍历到整棵树的根节点
      if (node.parent) this.__treeAds(node.parent);
    } else {
      // 父节点的平衡因子变为2或者-2， 那么这个父节点就不再平衡，需要进行平衡化调整
      this.__insertBalancedRotation(node);
      // node = node.rightChild
    }
  }

  /**
   * 计算当前节点树的高度
   *
   * @param {*} node
   * @returns 返回当前节点的高度
   * @memberof BinaryAvlTree
   */
  __treeHeight(node) {
    if (!node) return 0;

    const leftChildHeight = this.__treeHeight(node.leftChild);
    const rightChildHeight = this.__treeHeight(node.rightChild);

    return leftChildHeight > rightChildHeight
      ? leftChildHeight + 1
      : rightChildHeight + 1;
  }

  /**
   * 插入时的平衡化旋转
   *
   * 对于一个平衡因子为2或者-2的节点，有四种平衡旋转方式使其重新平衡，分别是
   *
   *   · 左单旋转
   *   · 右单旋转
   *   · 先左后右双旋转
   *   · 先右后左双旋转
   *
   * @memberof BinaryAvlTree
   */
  __insertBalancedRotation(node) {
    // 当不平衡节点平衡因子为2，其右孩子平衡因子为1时，发生左单旋转。
    if (node.abs === 2 && node.rightChild.abs === 1) {
      this.__leftRotation(node.rightChild);
      return true;
    }

    // 当不平衡节点的平衡因子为-2，左孩子平衡因子为-1时进行右单翻转。
    if (node.abs === -2 && node.leftChild.abs === -1) {
      this.__rightRotation(node.leftChild);
      return true;
    }

    // 当不平衡节点的平衡因子为-2，左孩子平衡因子为1的时候发生先左后右双旋转。
    if (node.abs === -2 && node.leftChild.abs === 1) {
      this.__leftRightRotation(node.leftChild.rightChild);
      return true;
    }

    if (node.abs === 2 && node.rightChild.abs === -1) {
      this.__rightLeftRotation(node.rightChild.leftChild);
      return true;
    }
  }

  /**
   * 左单旋转
   *
   * @param {*} node
   * @memberof BinaryAvlTree
   */
  __leftRotation(node) {
    const cur = node;
    const parent = node.parent;

    // 把当前节点的左子树给父级做右子树
    parent.rightChild = cur.leftChild;

    // 把父节点变成当前节点的左子树
    cur.leftChild = parent;

    this.__rotationPublic(cur, parent);
  }

  /**
   * 右单旋转
   *
   * @param {*} node
   * @memberof BinaryAvlTree
   */
  __rightRotation(node) {
    const cur = node;
    const parent = node.parent;

    // 把当前节点的右子树给父级做左子树
    parent.leftChild = cur.rightChild;

    // // 把父节点变成当前节点的右子树
    cur.rightChild = parent;

    this.__rotationPublic(cur, parent);
  }

  __rotationPublic(cur, parent) {
    // 如果祖父不存在, 把根节点指向当前节点
    if (!parent.parent) {
      this._root = cur;
    } else {
      if (parent.data === parent.parent.rightChild.data) {
        parent.parent.rightChild = cur;
      } else {
        parent.parent.leftChild = cur;
      }
    }

    // 当前节点的父节点指向祖父节点
    cur.parent = parent.parent;

    // 父节点已经变成当前节点的子树,
    // 需要把父节点的父节点指向当前节点
    parent.parent = cur;
  }

  /**
   * 先左后右双旋转
   *
   * @param {*} node
   * @memberof BinaryAvlTree
   */
  __leftRightRotation(node) {
    const cur = node;
    const parent = node.parent;

    // 把当前节点的左子树送给父级做右子树
    parent.rightChild = cur.leftChild;

    // 把当前节点的右子树送给祖父节点做他的左子树
    parent.parent.leftChild = cur.rightChild;

    // 把父节点变成当前节点的左子树
    cur.leftChild = parent;

    // 把祖父节点变成当前节点的右子树
    cur.rightChild = parent.parent;

    this.__rightLeftRotationPublic(cur, parent);
  }

  /**
   * 先右后左双旋转
   *
   * @param {*} node
   * @memberof BinaryAvlTree
   */
  __rightLeftRotation(node) {
    const cur = node;
    const parent = node.parent;

    // 把当前节点的左子树送给祖父级做他的右子树
    parent.parent.rightChild = cur.leftChild;

    // 把当前节点的右子树送给父级做他的左子树
    parent.leftChild = cur.rightChild;

    // 把父节点变成当前节点的右子树
    cur.rightChild = parent;

    // 把祖父节点变成当前节点的左子树
    cur.leftChild = parent.parent;

    this.__rightLeftRotationPublic(cur, parent);
  }

  __rightLeftRotationPublic(cur, parent) {
    // 曾祖父节点不存在，把当前节点赋给根节点
    if (!parent.parent.parent) {
      this._root = cur;
    } else {
      if (parent.data === parent.parent.parent.rightChild.data) {
        parent.parent.parent.leftChild = cur;
      } else {
        parent.parent.parent.rightChild = cur;
      }
    }

    // 当前节点的父节点指向曾祖父
    cur.parent = parent.parent.parent;

    // 祖父点已经变成当前节点的子树,
    // 需要把祖父点的父节点指向当前节点
    parent.parent.parent = cur;

    // 父节点已经变成当前节点的子树,
    // 需要把父节点的父节点指向当前节点
    parent.parent = cur;
  }

  /**
   * 分层打印
   *
   * @param {*} node
   * @returns
   * @memberof BinaryAvlTree
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

module.exports = BinaryAvlTree;

// const list = [10, 30, 20];
// const list = [1, 2, 3, 4, 5, 6];

// const bt = new BinaryAvlTree();

// bt.init(list);

// bt.insert(9);
// bt.insert(9.1);
// bt.insert(11);
// bt.insert(12);
// bt.insert(10.1);
// bt.insert(10.2);
// bt.insert(10.3);
// bt.insert(10.4);

// bt.levelOrder(bt.getRoot());
