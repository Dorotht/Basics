const { LinkedList } = require("../utils/index.js");

function reversePrint(head) {
  if (!head) return

  reversePrint(head.next)

  console.log(head.element)
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
reversePrint(linkedList.head());
console.timeEnd('time')

