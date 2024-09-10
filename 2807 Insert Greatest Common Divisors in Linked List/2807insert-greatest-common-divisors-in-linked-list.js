/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertGreatestCommonDivisors = function(head) {
    let pre = head, cur = head.next;
    while (cur !== null) {
        let x = gcd(pre.val, cur.val);
        pre.next = new ListNode(x, cur);
        pre = cur;
        cur = cur.next;
    }
    return head;
};

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}