/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    // Step 1: Base case - if either of the lists is empty, return the other list
    if (!list1 || !list2) {
        return list1 || list2;
    }

    // Step 2: Compare the values at the heads of both lists
    if (list1.val <= list2.val) {
        // If list1's value is smaller or equal, keep list1's node and merge the rest of list1 with list2
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        // If list2's value is smaller, keep list2's node and merge the rest of list1 with list2
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};
;