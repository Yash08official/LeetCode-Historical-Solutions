---
comments: true
difficulty: Easy
tags:
  - Linked List
  - Recursion
---

# 21. Merge Two Sorted Lists

**[View Problem on LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0021` (`21`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Linked List`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given the head nodes of two singly linked lists, `list1` and `list2`, both of which are already sorted in non-decreasing order.

Your task is to combine all nodes from `list1` and `list2` into a single linked list sorted in non-decreasing order by rewiring their `next` pointers directly (splicing existing nodes together rather than creating unrelated copies), and return the head of the merged linked list.

---

## Examples

### Example 1

```text
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

### Example 2

```text
Input: list1 = [], list2 = []
Output: []
```

### Example 3

```text
Input: list1 = [], list2 = [0]
Output: [0]
```

---

## Constraints

- The number of nodes in both lists is in the range `[0, 50]`.

- `-100 <= Node.val <= 100`

- Both `list1` and `list2` are sorted in **non-decreasing** order.

---

## Problem Understanding

- **Pre-sorted invariant:** Because both `list1` and `list2` are sorted in non-decreasing order, the smallest element overall must be at the current head of either `list1` or `list2`.
- **Recursive substructure:** Once we pick the smaller head node to lead the merged list, its `next` pointer simply needs to point to the merged result of the remaining nodes.
- **Edge cases:** Either `list1`, `list2`, or both may be `null` (empty lists of length `0`). Node values can be negative (`-100` to `100`) and duplicate values can appear within or across lists.

---

## Approach

### Brute Force Approach

A naive approach traverses both linked lists, copies every node value into a dynamic array, sorts the combined array in `O((m + n) log(m + n))` time, and allocates `m + n` brand-new `ListNode` objects to rebuild the result. This ignores the fact that both input lists are already sorted and wastes `O(m + n)` heap allocations instead of splicing the existing nodes directly.

### Optimized Approach

The implemented JavaScript solution uses **direct recursion** (`mergeTwoLists`). At each call, if either list is empty (`null`), it immediately returns the non-empty list (or `null` if both are empty). Otherwise, it compares `list1.val` and `list2.val`, keeps the node with the smaller-or-equal value as the current head, recursively sets its `.next` pointer to the merged remainder, and returns that head.

### Step-by-Step Thinking Process

1. Handle the base case first: if `!list1 || !list2`, no comparison is needed—the merged result of an empty list and another list is simply `list1 || list2`.
2. Compare the values at the current heads: `list1.val <= list2.val`.
3. If `list1.val <= list2.val`, `list1` comes first. Recursively merge `list1.next` with `list2`, assign the returned head to `list1.next`, and return `list1`.
4. Otherwise (`list2.val < list1.val`), `list2` comes first. Recursively merge `list1` with `list2.next`, assign the returned head to `list2.next`, and return `list2`.

### Algorithm / Intuition

In `mergeTwoLists(list1, list2)`, the short-circuit check `if (!list1 || !list2) return list1 || list2;` cleanly covers all three empty-list cases (`list1` is `null`, `list2` is `null`, or both are `null`). When both pointers are non-null, comparing `list1.val <= list2.val` chooses `list1` on ties (making the merge stable) and delegates the rest of the work to `mergeTwoLists(list1.next, list2)`. As the recursion unwinds from the base case, every `.next` link is wired in sorted order without allocating any extra `ListNode` instances.

---

## Dry Run

Tracing Example 1: `list1 = [1, 2, 4]`, `list2 = [1, 3, 4]`

| Call Depth | `list1` | `list2` | Comparison | Action | Returned List |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `[1,2,4]` | `[1,3,4]` | `1 <= 1` (true) | `list1.next = merge([2,4], [1,3,4])` | `[1,1,2,3,4,4]` |
| 2 | `[2,4]` | `[1,3,4]` | `2 <= 1` (false) | `list2.next = merge([2,4], [3,4])` | `[1,2,3,4,4]` |
| 3 | `[2,4]` | `[3,4]` | `2 <= 3` (true) | `list1.next = merge([4], [3,4])` | `[2,3,4,4]` |
| 4 | `[4]` | `[3,4]` | `4 <= 3` (false) | `list2.next = merge([4], [4])` | `[3,4,4]` |
| 5 | `[4]` | `[4]` | `4 <= 4` (true) | `list1.next = merge(null, [4])` | `[4,4]` |
| 6 | `null` | `[4]` | `!list1` (base) | Return `list2` (`[4]`) | `[4]` |

---

## Complexity Analysis

- **Time Complexity:** `O(m + n)` — Each recursive call advances either `list1` or `list2` by one node, performing `O(1)` work per node across at most `m + n` calls.
- **Space Complexity:** `O(m + n)` — Although no new `ListNode` objects are created, the recursive call stack grows up to `m + n` frames deep (an iterative dummy-head approach would reduce this to `O(1)`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [21merge-two-sorted-lists.js](./21merge-two-sorted-lists.js) |

---

## Key Learnings

- The JavaScript expression `return list1 || list2;` concisely handles when one list is exhausted as well as when both inputs are `null`.
- Splicing linked lists recursively mirrors functional list processing, though for very long lists (`> 10^4` nodes) an iterative dummy-node loop avoids stack overflow and uses `O(1)` space.
- Using `<=` when comparing `list1.val <= list2.val` preserves the relative order of equal elements between `list1` and `list2`.
