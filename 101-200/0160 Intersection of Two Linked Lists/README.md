---
comments: true
difficulty: Easy
tags:
  - Hash Table
  - Linked List
  - Two Pointers
---

# 160. Intersection of Two Linked Lists

**[View Problem on LeetCode](https://leetcode.com/problems/intersection-of-two-linked-lists/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0160` (`160`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Hash Table`, `Linked List`, `Two Pointers` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the heads of two singly linked-lists `headA` and `headB`, return *the node at which the two lists intersect*. If the two linked lists have no intersection at all, return `null`.

For example, the following two linked lists begin to intersect at node `c1`:

```text
A:          a1 → a2 ↘
                     c1 → c2 → c3
B:    b1 → b2 → b3 ↗
```

The test cases are generated such that there are no cycles anywhere in the entire linked structure.

**Note** that the linked lists must **retain their original structure** after the function returns.

---

## Examples

### Example 1

```text
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
```

### Example 2

```text
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'
```

### Example 3

```text
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
```

---

## Constraints

- The number of nodes of `listA` is in the `m`.
- The number of nodes of `listB` is in the `n`.
- `1 <= m, n <= 3 * 10^4`
- `1 <= Node.val <= 10^5`
- `0 <= skipA < m`
- `0 <= skipB < n`
- `intersectVal` is `0` if `listA` and `listB` do not intersect.
- `intersectVal == listA[skipA] == listB[skipB]` if `listA` and `listB` intersect.

---

## Problem Understanding

- Two singly linked lists may share common trailing nodes starting from an intersection node.
- If list A has length $L_A + C$ and list B has length $L_B + C$ (where $C$ is shared length), traversing list A then list B covers $(L_A + C) + (L_B + C)$ nodes.
- Traversing list B then list A covers $(L_B + C) + (L_A + C)$ nodes.
- Both pointers will travel exactly the same total distance $(L_A + L_B + C)$ and meet simultaneously at the intersection node (or simultaneously at `null` if disjoint).

---

## Approach

### Optimized Approach (Two-Pointer Dual-Traversal Equality Alignment)

1. Initialize two pointers: `a = headA` and `b = headB`.
2. While `a !== b`:
   - If `a` is not null, move to `a.next`; otherwise switch to `headB`.
   - If `b` is not null, move to `b.next`; otherwise switch to `headA`.
3. Return `a` (either the intersection node or `null`).

---

## Complexity Analysis

- **Time Complexity:** $O(M + N)$ — Pointers traverse each list at most twice.
- **Space Complexity:** $O(1)$ — Only two pointer references are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [160intersection-of-two-linked-lists.js](./160intersection-of-two-linked-lists.js) |

---

## Key Learnings

- Switching to the opposite head upon reaching the end harmonizes unequal path lengths into an identical total traversal length of $L_A + L_B + C$.
