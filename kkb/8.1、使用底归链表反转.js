const { LinkedList } = require("../utils/index.js");

function reverseDigui(head) {
  if (!head) return null;

  if (!head.next) return head;

  const newHead = reverseDigui(head.next);

  head.next.next = head;

  head.next = null

  return newHead;
}

const linkedList = new LinkedList();


linkedList.append(0);
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);
linkedList.append(6);
linkedList.append(7);
linkedList.append(8);
linkedList.append(9);

console.time('time')
const res = reverseDigui(linkedList.head());
console.timeEnd('time')

function print(cur) {
  const list = [];

  while (cur) {
    list.push(cur.element);

    cur = cur.next;
  }

  console.log("print : ", list.join(" ===> "));
}

print(res);
