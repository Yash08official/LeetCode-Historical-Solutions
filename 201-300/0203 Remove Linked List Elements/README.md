---
comments: true
difficulty: Easy
tags:
  - Linked List
  - Recursion
---

# 203. Remove Linked List Elements

**[View Problem on LeetCode](https://leetcode.com/problems/remove-linked-list-elements/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0203` (`203`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Linked List`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return *the new head*.

---

## Examples

### Example 1

```text
**Input:** head = [1,2,6,3,4,5,6], val = 6
**Output:** [1,2,3,4,5]
```

### Example 2

```text
**Input:** head = [], val = 1
**Output:** []
```

### Example 3

```text
**Input:** head = [7,7,7,7], val = 7
**Output:** []
```

 

**

---

## Constraints

**

	
- The number of nodes in the list is in the range `[0, 10^4]`.
	
- `1 <= Node.val <= 50`
	
- `0 <= val <= 50`

---

## Problem Understanding

- Given the `head` of a singly linked list and an integer `val`, remove all nodes whose `node.val == val` and return the new head.

---

## Approach

### Optimized Approach (Dummy Sentinel Head + Single-Pass Pointer)
1. Create a `dummy` node pointing to `head` (`new ListNode(-1, head)`) so deletions at the head are handled uniformly without special cases.
2. Maintain pointer `pre = dummy`.
3. While `pre.next != null`:
   - If `pre.next.val != val`, advance `pre = pre.next`.
   - Otherwise, bypass the matching node with `pre.next = pre.next.next` (keeping `pre` stationary in case consecutive nodes also equal `val`).
4. Return `dummy.next`.

### Dry Run (`head = [1,2,6,3,4,5,6]`, `val = 6`)
- `pre` advances past `1`, `2`, unlinks first `6`, advances past `3`, `4`, `5`, unlinks trailing `6`, and returns `[1,2,3,4,5]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Every node in the linked list is visited once.
- **Space Complexity:** $O(1)$ — Only a sentinel node and pointer reference are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [203remove-linked-list-elements.java](./203remove-linked-list-elements.java) |

---

## Key Learnings

- Using a dummy sentinel node eliminates edge-case branching when the head node itself (or multiple leading nodes) must be removed.
