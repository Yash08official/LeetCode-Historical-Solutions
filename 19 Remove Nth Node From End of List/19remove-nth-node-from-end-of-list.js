/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // Create a dummy node to handle edge cases (e.g., removing the head node)
    const dummy = new ListNode(0, head);

    // Initialize two pointers, both starting at the dummy node
    let fast = dummy, slow = dummy;

    // Move the fast pointer 'n' steps ahead of the slow pointer
    while (n--) {
        fast = fast.next;
    }

    // Move both the slow and fast pointers one step at a time until the fast pointer reaches the end
    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    // Remove the nth node from the end by skipping it
    slow.next = slow.next.next;

    // Return the new head, which is next to the dummy node
    return dummy.next;
};