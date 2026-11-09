---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
---

# 82. Remove Duplicates from Sorted List II

**[View Problem on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0082` (`82`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a sorted linked list, *delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list*. Return *the linked list **sorted** as well*.

---

## Examples

### Example 1

```text
Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
```

### Example 2

```text
Input: head = [1,1,1,2,3]
Output: [2,3]
```

---

## Constraints

- The number of nodes in the list is in the range `[0, 300]`.
- `-100 <= Node.val <= 100`
- The list is guaranteed to be **sorted** in ascending order.

---

## Problem Understanding

- All duplicate nodes must be completely removed, not just reduced to a single occurrence.
- If the head node itself has duplicates (e.g., `[1, 1, 2]`), the head itself must be deleted, necessitating a dummy sentinel node preceding `head`.
- As the list is sorted, duplicate values always appear in contiguous blocks.

---

## Approach

### Optimized Approach (Sentinel Node with Two-Pointer Scan)

1. Create a sentinel node `dummy = new ListNode(0, head)`.
2. Maintain `pre = dummy` (pointing to the last confirmed unique node) and `cur = head`.
3. While `cur != null`:
   - Fast-forward `cur` while `cur.next != null && cur.next.val == cur.val` to skip the contiguous duplicate cluster.
   - If `pre.next == cur`, no duplicate occurred: advance `pre = cur`.
   - Else (duplicates were detected): bypass all duplicate nodes by setting `pre.next = cur.next`.
   - Move `cur = cur.next`.
4. Return `dummy.next`.

---

## Dry Run

Consider `head = [1, 2, 3, 3, 4, 4, 5]`:
1. `dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5`, `pre = dummy`, `cur = 1`.
   - `cur.next.val != cur.val` (2 != 1). `pre.next == cur` (true) -> `pre = 1`. `cur = 2`.
2. `cur = 2`:
   - `cur.next.val != cur.val` (3 != 2). `pre.next == cur` (true) -> `pre = 2`. `cur = 3`.
3. `cur = 3`:
   - `cur.next.val == cur.val` (3 == 3) -> fast-forward `cur` to second 3.
   - `pre.next == cur` is false (`pre.next` is first 3, `cur` is second 3).
   - Set `pre.next = cur.next` (`2.next = 4`). `cur = 4`.
4. `cur = 4`:
   - Duplicate cluster 4 detected -> fast-forward `cur` to second 4.
   - Set `pre.next = cur.next` (`2.next = 5`). `cur = 5`.
5. `cur = 5`:
   - Distinct -> `pre = 5`. `cur = null`.
Result: `[1, 2, 5]`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each node in the linked list is traversed at most twice (once by `cur`, once by the duplicate skip loop).
- **Space Complexity:** $O(1)$ — Only a sentinel node and two pointer references are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [82remove-duplicates-from-sorted-list-ii.java](./82remove-duplicates-from-sorted-list-ii.java) |

---

## Key Learnings

- A dummy sentinel node eliminates edge cases where the head of the list itself is part of a duplicate cluster and must be removed.
- Checking `pre.next == cur` neatly discriminates whether any inner skipping occurred without needing extra boolean flags.
