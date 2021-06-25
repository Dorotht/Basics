/**
 * 双向链表
 *
 * @class DoubleLinkList
 */
class DoubleLinkList {
  constructor() {
    // 头节点
    this._head = null;
    // 尾节点
    this._tail = null;
    // 长度
    this._length = 0;
  }

  // 添加一个新的元素
  append(element) {
    const node = new Node(element);

    if (!this._head) {
      this._head = node;
      this._tail = this._head;
    } else {
      // 新节点父节点指向链表的为节点
      node.pre = this._tail;

      // 尾部的为节点的 next 指向新节点
      this._tail.next = node;

      // 新节点赋值给 尾节点
      this._tail = node;
    }

    this._length += 1;

    return true;
  }

  // 指定位置添加元素
  insert(index, element) {
    // 判断边界情况
    if (index > this._length || index < 0) return false;

    // 创建新节点
    const node = new Node(element);

    // cur 指向头节点
    let cur = this._head;

    if (index === 0) {
      // 新节点指向头节点
      node.next = cur;

      // 头节点的父级指向新节点
      cur.pre = node;

      // 新创的节点赋值给 this._head
      this._head = node;
    } else if (index === this._length) {
      // 等于链表长度直接调用 append
      this.append(element);
    } else {
      // 当前索引
      let i = 0;
      // 迭代找到要添加节点的位置
      // 迭代后 cur 等于要添加节点的后一个节点
      while (i < index) {
        cur = cur.next;
        i++;
      }

      // 新系节点 next 指向
      node.next = cur;

      // 新系节点 pre 指向
      node.pre = cur.pre;

      cur.pre.next = node;

      cur.pre = node;
    }

    this._length += 1;

    return true;
  }

  // 删除指定位置的节点
  remove(index) {
    if (index > this._length) return false;

    let cur = this._head;

    let i = 0;

    while (i < index) {
      cur = cur.next;
      i++;
    }

    cur.pre.next = cur.next;

    if (!cur.next) {
      this._tail = this._tail.pre;
      this._tail.next = null;
    } else {
      cur.next.pre = cur.pre;
    }

    this._length -= 1;

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

module.exports = DoubleLinkList;
