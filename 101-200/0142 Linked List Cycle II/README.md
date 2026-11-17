---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Linked List
  - Two Pointers
  - Floyd's Cycle Finding Algorithm
---

# 142. Linked List Cycle II

**[View Problem on LeetCode](https://leetcode.com/problems/linked-list-cycle-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0142` (`142`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Linked List`, `Two Pointers`, `Floyd's Cycle Finding Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a linked list, return *the node where the cycle begins. If there is no cycle, return *`null`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to (**0-indexed**). It is `-1` if there is no cycle. **Note that** `pos` **is not passed as a parameter**.

**Do not modify** the linked list.

---

## Examples

### Example 1

```text
**Input:** head = [3,2,0,-4], pos = 1
**Output:** tail connects to node index 1
**Explanation:** There is a cycle in the linked list, where tail connects to the second node.
```

### Example 2

```text
**Input:** head = [1,2], pos = 0
**Output:** tail connects to node index 0
**Explanation:** There is a cycle in the linked list, where tail connects to the first node.
```

### Example 3

```text
**Input:** head = [1], pos = -1
**Output:** no cycle
**Explanation:** There is no cycle in the linked list.
```

 

**

---

## Constraints

**

	
- The number of the nodes in the list is in the range `[0, 10^4]`.
	
- `-10^5 <= Node.val <= 10^5`
	
- `pos` is `-1` or a **valid index** in the linked-list.

 

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

---

## Problem Understanding

- Detect if a cycle exists in a singly linked list and return the exact node where the cycle begins, or `null` if no cycle exists.
- Must solve without modifying the list and using $O(1)$ memory.

---

## Approach

### Optimized Approach (Floyd's Tortoise and Hare Cycle Detection)

1. Initialize two pointers, `slow` and `fast`, at `head`.
2. Move `slow` by 1 step (`slow = slow.next`) and `fast` by 2 steps (`fast = fast.next.next`).
3. If `fast` or `fast.next` becomes `null`, there is no cycle (return `null`).
4. When `slow == fast`, a cycle is detected:
   - Let distance from head to cycle entrance be $a$, entrance to meeting point be $b$, and meeting point back to entrance be $c$.
   - Distance traveled by slow = $a + b$; fast = $a + b + k(b + c)$.
   - Since fast traveled twice as far: $2(a + b) = a + b + k(b + c) \implies a = (k - 1)(b + c) + c$.
   - Hence, moving a pointer `ans` from `head` and `slow` from the meeting point at equal speed will cause them to meet exactly at the cycle entrance.
5. Return `ans` when `ans == slow`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Pointer traversals are bounded by the list length.
- **Space Complexity:** $O(1)$ — Only pointer references are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [142linked-list-cycle-ii.java](./142linked-list-cycle-ii.java) |

---

## Key Learnings

- Floyd's Cycle Algorithm mathematically guarantees that the meeting point and list head are equidistant from the cycle entry point modulo loop length.
