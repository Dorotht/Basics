const { LinkedList } = require("../utils/index.js");

function reverseIter(head) {
  // 前一个节点
  let pre = null;
  // 当前要反转的节点
  let cur = head;

  while (cur) {
    // 下一个节点
    let next = cur.next;

    // 对当前节点进行反转
    cur.next = pre;

    // pre 向后滑动
    pre = cur;

    // cur 向后滑动
    cur = next;
  }

  return pre;
}

const linkedList = new LinkedList();

linkedList.append(0);
linkedList.append(1);
linkedList.append(2);
linkedList.append(4);
linkedList.append(5);
linkedList.append(6);
linkedList.append(7);
linkedList.append(8);
linkedList.append(9);

console.time('k')
const res = reverseIter(linkedList.head());
console.timeEnd('k')

function print(cur) {
  const list = [];

  while (cur) {
    list.push(cur.element);

    cur = cur.next;
  }

  console.log("print : ", list.join(" ===> "));
}

print(res);
