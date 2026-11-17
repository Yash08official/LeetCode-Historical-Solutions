---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
  - Divide and Conquer
  - Sorting
  - Merge Sort
---

# 148. Sort List

**[View Problem on LeetCode](https://leetcode.com/problems/sort-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0148` (`148`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers`, `Divide and Conquer`, `Sorting`, `Merge Sort` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a linked list, return *the list after sorting it in **ascending order***.

---

## Examples

### Example 1

```text
**Input:** head = [4,2,1,3]
**Output:** [1,2,3,4]
```

### Example 2

```text
**Input:** head = [-1,5,3,4,0]
**Output:** [-1,0,3,4,5]
```

### Example 3

```text
**Input:** head = []
**Output:** []
```

 

**

---

## Constraints

**

	
- The number of nodes in the list is in the range `[0, 5 * 10^4]`.
	
- `-10^5 <= Node.val <= 10^5`

 

**Follow up:** Can you sort the linked list in `O(n logn)` time and `O(1)` memory (i.e. constant space)?

---

## Problem Understanding

- Given the head of a linked list, return the list sorted in ascending order.
- Target $O(n \log n)$ time complexity and $O(1)$ auxiliary space (or $O(\log n)$ call stack).

---

## Approach

### Optimized Approach (Divide and Conquer Merge Sort)

1. Base case: If `head == null` or `head.next == null`, return `head`.
2. Find the middle node using slow and fast pointers: `slow = head`, `fast = head.next`.
3. Disconnect list into two halves: `l1 = head`, `l2 = slow.next`, setting `slow.next = null`.
4. Recursively sort both halves: `l1 = sortList(l1)`, `l2 = sortList(l2)`.
5. Merge the two sorted lists using a dummy sentinel node and two-pointer comparison.
6. Return `dummy.next`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — Standard recurrence $T(n) = 2T(n/2) + O(n)$.
- **Space Complexity:** $O(\log n)$ — Recursion call stack depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [148sort-list.js](./148sort-list.js) |

---

## Key Learnings

- Initializing `fast = head.next` ensures slow lands on the first middle element for even-length lists, preventing infinite recursion on 2-element lists.
