const { LinkedList } = require("../utils/index.js");

function findMiddle(head) {
  // 快的指针
  let fast = head;
  // 慢的指针
  let slow = head;

  // 快的指针一次走两步, 慢的指针一次走一步,
  // 当快的走到结尾后, 慢的指针指向中间节点
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow.element;
}

const linkedList = new LinkedList();
for (let i = 0; i < 10; i++) {
  linkedList.append(i);
}

linkedList.print();

console.log("res -> ", findMiddle(linkedList.head()));
