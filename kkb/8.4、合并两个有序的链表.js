const { LinkedList } = require("../utils/index.js");

function mergeLink(head1, head2) {
  if (!head1) {
    return head2;
  } else if (!head2) {
    return head1;
  }
  // 创建新的链表
  const linkedList = new LinkedList();

  let cur1 = head1;
  let cur2 = head2;

  // 判断两个节点, 小的 append 到新链表，并且向下走一步
  while (cur1 && cur2) {
    if (cur1.element < cur2.element) {
      linkedList.append(cur1.element);
      cur1 = cur1.next;
    } else {
      linkedList.append(cur2.element);
      cur2 = cur2.next;
    }
  }

  // 判断是否有没走完的
  let rest = cur1 || cur2;

  // 没有走完的 append 到新链表
  while (rest) {
    linkedList.append(rest.element);
    rest = rest.next;
  }

  // 返回新链表
  return linkedList;
}

const linkedList1 = new LinkedList();
const linkedList2 = new LinkedList();

linkedList1.append(0);
linkedList2.append(1);
linkedList1.append(2);
linkedList2.append(3);
linkedList1.append(4);
linkedList2.append(5);
linkedList1.append(6);
linkedList2.append(7);
linkedList1.append(8);
linkedList2.append(9);

console.time("time");
const res = mergeLink(linkedList1.head(), linkedList2.head());
console.timeEnd("time");

res.print();
