var addTwoNumbers = (l1, l2) => {
  function parseList(list) {
    var arr = [];
    while (list.next) {
      arr.push(list.val);
      list = list.next;
    }
    return arr;
  }

  return (~~parseList(l1).reverse().join('') + ~~parseList(l2).reverse().join(''))
    .toString()
    .split('')
    .reverse()
    .map((item) => ~~item);
};

let node = new ListNode('head');
let temp = node,
  sum,
  n = 0;
while (l1 || l2) {
  const n1 = l1 ? l1.val : 0;
  const n2 = l2 ? l2.val : 0;
  sum = n1 + n2 + n;
  temp.next = new ListNode(sum % 10);
  temp = temp.next;
  n = parseInt(sum / 10);
  if (l1) l1 = l1.next;
  if (l2) l2 = l2.next;
}
if (n > 0) temp.next = new ListNode(n);
return node.next;
