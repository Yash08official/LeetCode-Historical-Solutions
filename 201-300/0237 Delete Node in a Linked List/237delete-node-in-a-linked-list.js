/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {

    // Step 1: Copy the value of the next node to the current node
    node.val = node.next.val; // The current node now holds the value of the next node

     // Step 2: Skip over the next node by updating the current node's next pointer
    node.next = node.next.next; // The current node now points to the node after the next one, effectively removing the next node   
};