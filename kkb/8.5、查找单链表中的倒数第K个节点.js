const { LinkedList } = require("../utils/index.js");

function reverseFind(head, k) {
  // 快的
  let fast = head;
  // 慢的
  let slow = head;

  let step = k;

  // fast 快的先走到 k 的位置
  while (step > 0 && fast) {
    fast = fast.next;

    step--;
  }

  // 如果 k 大于长度终止
  if (step !== 0) return null;

  // 快的和慢的同时走, 快的到达终点后, 慢的就是倒数第 k 个节点
  while (fast && slow) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow.element;
}

const linkedList = new LinkedList();
for (let i = 0; i < 10; i++) {
  linkedList.append(i);
}

linkedList.print();

console.log("res -> ", reverseFind(linkedList.head(), 2));
