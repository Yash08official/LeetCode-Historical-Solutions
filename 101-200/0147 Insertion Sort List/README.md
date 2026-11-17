---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Sorting
---

# 147. Insertion Sort List

**[View Problem on LeetCode](https://leetcode.com/problems/insertion-sort-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0147` (`147`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a singly linked list, sort the list using **insertion sort**, and return *the sorted list's head*.

The steps of the **insertion sort** algorithm:

	
- Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
	
- At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.
	
- It repeats until no input elements remain.

The following is a graphical example of the insertion sort algorithm. The partially sorted list (black) initially contains only the first element in the list. One element (red) is removed from the input data and inserted in-place into the sorted list with each iteration.

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

 

**

---

## Constraints

**

	
- The number of nodes in the list is in the range `[1, 5000]`.
	
- `-5000 <= Node.val <= 5000`

---

## Problem Understanding

- Sort a singly linked list using insertion sort algorithm and return the sorted list's head.

---

## Approach

### Optimized Approach (Dummy Sentinel + In-Place Pointer Relinking)

1. Create a `dummy` sentinel node pointing to `head` (`dummy.next = head`).
2. Maintain `prev` (tail of sorted portion) and `cur` (node currently being inserted).
3. If `prev.val <= cur.val`, `cur` is already in correct relative order; advance `prev = cur` and `cur = cur.next`.
4. Otherwise, scan from `dummy` using pointer `p` until `p.next.val > cur.val`.
5. Splice `cur` out of its current position (`prev.next = cur.next`) and insert between `p` and `p.next`.
6. Update `cur = prev.next` and continue until list end.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ worst/average case, $O(n)$ best case (already sorted).
- **Space Complexity:** $O(1)$ — In-place pointer modifications.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [147insertion-sort-list.js](./147insertion-sort-list.js) |

---

## Key Learnings

- Checking `prev.val <= cur.val` first skips searching from dummy for elements already in non-decreasing order, optimizing practical runtime.
