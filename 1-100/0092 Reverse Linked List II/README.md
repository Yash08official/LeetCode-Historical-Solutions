---
comments: true
difficulty: Medium
tags:
  - Linked List
---

# 92. Reverse Linked List II

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-linked-list-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0092` (`92`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return *the reversed list*.

---

## Examples

### Example 1

```text
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
```

### Example 2

```text
Input: head = [5], left = 1, right = 1
Output: [5]
```

---

## Constraints

- The number of nodes in the list is `n`.
- `1 <= n <= 500`
- `-500 <= Node.val <= 500`
- `1 <= left <= right <= n`
---

## Follow-up

Could you do it in one pass?

---

## Problem Understanding

- We must reverse only the subsegment of nodes from 1-based index `left` to `right`.
- A dummy node helps manage cases where `left == 1` (reversing includes the original head).
- We locate `pre` (the node just before index `left`).
- Then we reverse the `right - left + 1` nodes in a single forward pass, stitching the reversed segment back into the surrounding list.

---

## Approach

### Optimized Approach (One-Pass In-Place Pointer Reversal)

1. Base check: if `head.next == null` or `left == right`, return `head`.
2. Create sentinel node `dummy = new ListNode(0, head)`.
3. Advance `pre` pointer `left - 1` times to reach the node immediately preceding the reversal window.
4. Set `p = pre` (connection point before reversed segment) and `q = pre.next` (tail of reversed segment).
5. For $i$ from $0$ to `right - left`:
   - Classic in-place reversal: detach next node `t = cur.next`, point `cur.next = pre`, advance `pre = cur`, `cur = t`.
6. Stitch the ends:
   - `p.next = pre` (connect node before window to new head of reversed segment).
   - `q.next = cur` (connect tail of reversed segment to remainder of list).
7. Return `dummy.next`.

---

## Dry Run

Consider `head = [1, 2, 3, 4, 5]`, `left = 2`, `right = 4`:
1. `dummy -> 1 -> 2 -> 3 -> 4 -> 5`.
2. Advance `pre` 1 step: `pre = 1`.
3. `p = 1`, `q = 2`, `cur = 2`.
4. Reverse 3 nodes (`2`, `3`, `4`):
   - At end of loop: `pre = 4`, `cur = 5`.
5. Connect:
   - `p.next = 4` (`1 -> 4`)
   - `q.next = 5` (`2 -> 5`)
6. List is `1 -> 4 -> 3 -> 2 -> 5`. Return `dummy.next`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single traversal up to index `right` (at most $N$ nodes visited).
- **Space Complexity:** $O(1)$ — Pointer adjustments performed entirely in place.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [92reverse-linked-list-ii.java](./92reverse-linked-list-ii.java) |

---

## Key Learnings

- Storing reference `p` (node before reversal) and `q` (first node of reversal, which becomes the tail) makes reconnecting the list after reversal a straightforward two-line operation.
- Dummy sentinel node unifies edge cases where `left = 1` seamlessly.
