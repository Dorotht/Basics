/**
 * Created by kwsy on 2018/9/15.
 */
function murmurhash3_32_gc(key, seed) {
  let remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

  remainder = key.length & 3; // key.length % 4
  bytes = key.length - remainder;
  h1 = seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;

  while (i < bytes) {
    k1 =
      ((key.charCodeAt(i) & 0xff)) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;

    k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
    h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
  }

  k1 = 0;

  switch (remainder) {
    case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1: k1 ^= (key.charCodeAt(i) & 0xff);

      k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
}

function LinkList() {
  // 定义节点
  let Node = function (key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  };

  let length = 0;        // 长度
  let head = null;       // 头节点
  let tail = null;       // 尾节点

  // 添加一个新元素
  this.append = function (key, value) {
    if (this.search(key) != null) {
      return false;
    }
    // 创建新节点
    let node = new Node(key, value);
    // 如果是空链表
    if (head == null) {
      head = node;
      tail = head;
    } else {
      tail.next = node;       // 尾节点指向新创建的节点
      tail = node;            // tail指向链表的最后一个节点
    }
    length += 1;                // 长度加1
    return true;
  };

  // 返回链表大小
  this.length = function () {
    return length;
  };

  // 获得指定位置的节点
  const getNode = function (index) {
    if (index < 0 || index >= length) {
      return null;
    }
    let curNode = head;
    let nodeIndex = index;
    while (nodeIndex-- > 0) {
      curNode = curNode.next;
    }
    return curNode;
  };

  // 删除指定位置的节点
  this.remove = function (index) {
    // 参数不合法
    if (index < 0 || index >= length) {
      return null;
    } else {
      let delNode = null;
      // 删除的是头节点
      if (index == 0) {
        // head指向下一个节点
        delNode = head;
        head = head.next;
        // 如果head == null,说明之前链表只有一个节点
        if (!head) {
          tail = null;
        }
      } else {
        // 找到索引为index-1的节点
        let preNode = getNode(index - 1);
        delNode = preNode.next;
        preNode.next = preNode.next.next;
        // 如果删除的是尾节点
        if (delNode.next == null) {
          tail = preNode;
        }
      }

      length -= 1;
      delNode.next = null;
      return delNode;
    }
  };

  // 返回指定位置节点的值
  this.get = function (index) {
    let node = getNode(index);
    if (node) {
      return node;
    }
    return null;
  };

  this.search = function (key) {
    let index = -1;
    let curNode = head;
    while (curNode) {
      index += 1;
      if (curNode.key === key) {
        return curNode;
      } else {
        curNode = curNode.next;
      }
    }
    return null;
  };

  this.removeKey = function (key) {
    let index = this.indexOf(key);
    if (index >= 0) {
      this.remove(index);
      return true;
    }
    return false;
  };

  this.indexOf = function (key) {
    let index = -1;
    let curNode = head;
    while (curNode) {
      index += 1
      if (curNode.key === key) {
        return index;
      } else {
        curNode = curNode.next;
      }
    }
    return -1;
  };

  // isEmpty
  this.isEmpty = function () {
    return length == 0;
  };

  // 返回链表大小
  this.length = function () {
    return length;
  };

  this.getHead = function () {
    return head;
  };

};

function HashTable() {
  let items = [];          // 存储数据
  let divisor = 7;         // 除数
  let keyCount = 0;       // key的数量

  // 判断一个数是否为质数
  const isPrime = function (number) {
    for (let i = 2; i < number; i++) {
      if (number % i == 0) {
        return false;
      }
      return true;
    }
  };

  this.init = function (size) {
    items = new Array(size);
    // 初始化数组
    for (let i = 0; i < size; i++) {
      items[i] = new LinkList();
    }
    // 设置除数
    let temp = size;
    while (temp > 2) {
      if (isPrime(temp)) {
        divisor = temp;
        break;
      }
      temp--;
    }
  };

  const getIndex = function (key) {
    let tmpKey = key.toString();
    let hashValue = Math.abs(murmurhash3_32_gc(tmpKey, 0));
    return hashValue % divisor;
  };
  const isTooCrowd = function () {
    if (Math.floor(keyCount / divisor) >= 5) {
      return true;
    }
    return false;
  };

  this.expand = function () {
    // 临时数组保存原来的数据
    let tmpArr = new Array(items.length);
    for (let i = 0; i < items.length; i++) {
      tmpArr[i] = items[i];
    }

    // 初始化数组
    items = new Array(items.length * 2);
    for (let i = 0; i < items.length; i++) {
      items[i] = new LinkList();
    }

    // 设置除数
    let temp = items.length;
    while (temp > 2) {
      if (isPrime(temp)) {
        divisor = temp;
        break;
      }
      temp--;
    }

    // 把临时数组里的数据导入到items中
    for (let i = 0; i < tmpArr.length; i++) {
      let link = tmpArr[i];
      // 获得链表的头
      let curNode = link.getHead();
      while (curNode) {
        this.set(curNode.key, curNode.value);
        keyCount--;
        curNode = curNode.next;
      }
    }
  };

  this.set = function (key, value) {
    let index = getIndex(key);
    let node = items[index].search(key);
    if (node) {
      node.value = value;
    } else {
      items[index].append(key, value);
      keyCount++;
    }
    // 如果过于拥挤了就扩容
    if (isTooCrowd()) {
      this.expand();
    }
  };

  this.get = function (key) {
    let index = getIndex(key);
    let node = items[index].search(key);
    if (node) {
      return node.value;
    }
    return null;
  };

  this.hasKey = function (key) {
    let index = getIndex(key);
    let node = items[index].search(key);
    if (node) {
      return true;
    }
    return false;
  };

  this.delKey = function (key) {
    let index = getIndex(key);
    let res = items[index].removeKey(key);
    if (res) {
      keyCount--;
    }
    return res;
  };

  this.size = function () {
    return items.length;
  };

};

const hashTable = new HashTable();
hashTable.init(3);

hashTable.set("name", "javascript");
hashTable.set("age", 20);
hashTable.set("class", 1);

console.log(hashTable.get('name')); // javascript
console.log(hashTable.get('age')); // 20
console.log(hashTable.get('class')); // 1

// 判断class是否存在
console.log(hashTable.hasKey('class')); // true

// hash_table.set("name", "python");
// console.log(hash_table.get('name'));

console.log('murmurhash3_32_gc', murmurhash3_32_gc('java'))
