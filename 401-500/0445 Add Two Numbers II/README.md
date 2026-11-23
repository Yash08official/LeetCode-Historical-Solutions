---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Math
  - Stack
---

# 445. Add Two Numbers II

**[View Problem on LeetCode](https://leetcode.com/problems/add-two-numbers-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0445` (`445`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Math`, `Stack` |
| **Solution Language** | Java |

---

## Problem Description

You are given two **non-empty** linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

---

## Examples

### Example 1

```text
**Input:** l1 = [7,2,4,3], l2 = [5,6,4]
**Output:** [7,8,0,7]
```

### Example 2

```text
**Input:** l1 = [2,4,3], l2 = [5,6,4]
**Output:** [8,0,7]
```

### Example 3

```text
**Input:** l1 = [0], l2 = [0]
**Output:** [0]
```

 

**

---

## Constraints

**

	
- The number of nodes in each linked list is in the range `[1, 100]`.
	
- `0 <= Node.val <= 9`
	
- It is guaranteed that the list represents a number that does not have leading zeros.

 

**Follow up:** Could you solve it without reversing the input lists?

---

## Problem Understanding

- Add two numbers represented as forward-order singly linked lists (most significant digit first) without reversing the input lists.

---

## Approach

### Optimized Approach (Two Stacks + Head-Insertion Result Building)
1. Push all digits of `l1` into `s1` and `l2` into `s2` so least-significant digits sit on top.
2. Pop from `s1`/`s2` with `carry`, prepending each new digit node directly at `dummy.next = new ListNode(s % 10, dummy.next)`.

---

## Complexity Analysis

- **Time Complexity:** $O(m + n)$.\n- **Space Complexity:** $O(m + n)$ for stacks `s1` and `s2`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [445add-two-numbers-ii.java](./445add-two-numbers-ii.java) |

---

## Key Learnings

- Head-inserting each new sum digit behind `dummy` produces the forward-order result list directly without an extra reversal pass.
