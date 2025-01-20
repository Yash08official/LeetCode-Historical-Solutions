/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let slow = head;
    let fast = head.next;

    // Step 1: Find the middle of the list using the slow and fast pointers
    while (fast && fast.next) {
        slow = slow.next;         // Move slow pointer one step
        fast = fast.next.next;    // Move fast pointer two steps
    }

    // Step 2: Reverse the second half of the list starting from slow.next
    let cur = slow.next;  // Current pointer starts from the middle of the list (next node of slow)
    slow.next = null;     // Break the list into two halves
    let pre = null;       // To reverse the second half

    // Reverse the second half of the list
    while (cur) {
        let t = cur.next;  // Store the next node
        cur.next = pre;    // Reverse the pointer
        pre = cur;         // Move pre to current node
        cur = t;           // Move cur to the next node
    }

    // Step 3: Compare both halves of the list
    while (pre) {
        // If the values don't match, it's not a palindrome
        if (pre.val !== head.val) {
            return false;
        }
        pre = pre.next;  // Move to the next node in the reversed second half
        head = head.next; // Move to the next node in the first half
    }

    return true;  // If all values matched, the list is a palindrome
};
