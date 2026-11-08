---
comments: true
difficulty: Easy
tags:
  - Linked List
---

# 83. Remove Duplicates from Sorted List

**[View Problem on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0083` (`83`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Linked List` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a sorted linked list, *delete all duplicates such that each element appears only once*. Return the linked list **sorted** as well.

---

## Examples

### Example 1

```text
Input: head = [1,1,2]
Output: [1,2]
```

### Example 2

```text
Input: head = [1,1,2,3,3]
Output: [1,2,3]
```

---

## Constraints

- The number of nodes in the list is in the range `[0, 300]`.
- `-100 <= Node.val <= 100`
- The list is guaranteed to be **sorted** in ascending order.

---

## Problem Understanding

- The linked list is sorted, so duplicate values are contiguous.
- For each node, if `cur.val == cur.next.val`, bypass the duplicate node by adjusting `cur.next = cur.next.next`.

---

## Approach

### Optimized Approach (Linear Pointer Rewiring)

1. Start with `cur = head`.
2. While `cur != null && cur.next != null`:
   - If `cur.val == cur.next.val`:
     - Delete the duplicate: `cur.next = cur.next.next`.
   - Else:
     - Advance `cur = cur.next`.
3. Return `head`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass traversing each of the $N$ nodes in the list once.
- **Space Complexity:** $O(1)$ — Only a single pointer `cur` is maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [83remove-duplicates-from-sorted-list.java](./83remove-duplicates-from-sorted-list.java) |

---

## Key Learnings

- Only advance the pointer when adjacent values differ; when deleting a duplicate, retain `cur` to check subsequent consecutive duplicates.
