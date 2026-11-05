/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    // Initialize two pointers, slow and fast, both starting at the head
    let slow = head;
    let fast = head;

    // Traverse the linked list with the fast pointer moving two steps and the slow pointer moving one step
    while (fast && fast.next) {
        slow = slow.next;         // Move slow pointer one step
        fast = fast.next.next;    // Move fast pointer two steps

        // If the slow and fast pointers meet, a cycle exists in the list
        if (slow === fast) {
            return true;  // Cycle detected
        }
    }

    // If the fast pointer reaches the end of the list without meeting the slow pointer, no cycle exists
    return false;  // No cycle detected
};
