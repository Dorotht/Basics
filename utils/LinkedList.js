/**
 * 链表节点
 *
 * @class Node
 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.pre = null;
  }
}

/**
 * 单向链表
 *
 * @class LinkedList
 */
class LinkedList {
  constructor() {
    // 头节点
    this._head = null;
    // 尾节点
    this._tail = null;
    // 链表的长度
    this._length = 0;
  }

  // 添加一个新的元素
  append(element) {
    // 创建新节点
    const node = new Node(element);

    // 如果链表为空
    if (!this._head) {
      this._head = node;

      this._tail = this._head;
    } else {
      // 尾节点指向新节点
      this._tail.next = node;

      // this.tail 指向最后一个节点
      this._tail = node;
    }

    // 长度加 1
    this._length = this._length + 1;

    return true;
  }

  // 指定位置插入元素
  insert(index, element) {
    // 判断边界情况
    if (index > this._length || index < 0) return false;

    let cur = this._head;

    const node = new Node(element);

    if (index === 0) {
      // 把原头节点赋值给新创建的节点
      node.next = cur;

      // 把新节点赋值给 this._head
      this._head = node;
    } else if (index === this._length) {
      // 索引等于链表长度直接调用 append
      return this.append(element);
    } else {
      // 找到对应位置插入

      let i = 0;
      let pre = null;

      while (i < index) {
        pre = cur;

        cur = cur.next;

        i++;
      }

      node.next = cur;

      pre.next = node;
    }

    this._length = this._length + 1;

    return true;
  }

  // 删除指定位置的节点
  remove(index) {
    // 判断边界情况
    if (index >= this._length || index < 0) return false;

    // 当前节点
    let cur = this._head;

    // 删除的节点
    let delNode = null;

    // 删除首节点
    if (index === 0) {
      delNode = cur;
      this.head = cur.next;
    } else {
      let i = 0;
      let pre = null;

      while (i < index) {
        pre = cur;
        cur = cur.next;
        i++;
      }

      delNode = pre.next;

      pre.next = cur.next;

      // 如果删除的是为节点, 需要重新调整为节点
      if (!cur.next) {
        this._tail = pre;
      }
    }

    this._length = this._length - 1;

    // 返回删除的节点元素
    return delNode.element;
  }

  // 删除首节点
  removeHead() {
    let cur = this._head;

    this._head = cur.next;

    this._length = this._length - 1;
  }

  // 删除尾节点
  removeTail() {
    let cur = this._head;
    let i = 2;

    while (this._length > i) {
      cur = cur.next;

      i++;
    }

    cur.next = null;

    this._tail = cur;

    this._length = this._length - 1;
  }

  // 搜索
  search(key) {
    let index = -1;
    let curr_node = this._head;
    while (curr_node) {
      index += 1;
      if (curr_node.key === key) {
        return curr_node;
      } else {
        curr_node = curr_node.next;
      }
    }
    return null;
  }

  // 返回指定元素的索引,如果没有,返回-1
  // 有多个相同元素,返回第⼀一个
  indexOf(element) {
    let i = 0;
    let cur = this._head;

    while (cur) {
      if (cur.element === element) {
        return i;
      } else {
        cur = cur.next;
      }

      i++;
    }

    return -1;
  }

  // 返回指定位置节点的值
  get(index) {
    // 判断边界情况
    if (index >= this._length || index < 0) return false;

    let cur = this._head;

    let i = 0;

    while (i < index) {
      cur = cur.next;

      i++;
    }

    return cur.element;
  }

  // 返回链表头节点
  head() {
    return this._head;
  }

  // 返回链表尾节点
  tail() {
    return this._tail;
  }

  // 返回链表的长度
  length() {
    return this._length;
  }

  // 判断链表是否为空
  isEmpty() {
    return this._length === 0;
  }

  // 清空链表
  clear() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  // 打印链表
  print() {
    const list = [];

    let cur = this._head;

    while (cur) {
      list.push(cur.element);

      cur = cur.next;
    }

    console.log('print : ', list.join(' ===> '));
  }
}

module.exports = LinkedList;
