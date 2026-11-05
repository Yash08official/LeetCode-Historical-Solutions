---
comments: true
difficulty: Easy
tags:
  - Linked List
  - Recursion
---

# 206. Reverse Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0206` (`206`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Linked List`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a singly linked list, reverse the direction of all links in the list and return the new `head` of the reversed linked list.

---

## Examples

### Example 1

```text
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

### Example 2

```text
Input: head = [1,2]
Output: [2,1]
```

### Example 3

```text
Input: head = []
Output: []
```

---

## Constraints

- The number of nodes in the list is the range `[0, 5000]`.

- `-5000 <= Node.val <= 5000`

---

## Follow-up Questions

A linked list can be reversed either iteratively or recursively. Could you implement both?

Our JavaScript solution implements the **iterative** `O(n)` time, `O(1)` space approach. To implement the **recursive** version as well: handle the base case `if (!head || !head.next) return head;`, recursively reverse the rest via `const newHead = reverseList(head.next);`, rewire the next node back to `head` via `head.next.next = head; head.next = null;`, and return `newHead` (which runs in `O(n)` time and `O(n)` call-stack space).

---

## Problem Understanding

In a singly linked list, each node only holds a `next` reference to its successor. Once we overwrite `curr.next`, we lose access to the remainder of the original list unless we save `curr.next` in a temporary variable beforehand. Edge cases include an empty list (`head === null`, `0` nodes) and a single-node list (`1` node), both of which should return unchanged without null-pointer errors.

---

## Approach

### Brute Force Approach

A naive out-of-place approach traverses the linked list, copies all node values into an array, and then either overwrites node values in reverse order or allocates `n` brand-new `ListNode` objects from back to front. That requires `O(n)` extra memory and two passes instead of rewiring pointers in-place.

### Optimized Approach

Use an iterative head-insertion strategy with a sentinel `dummy` node: traverse the original list once with `curr`, detaching each node and inserting it immediately after `dummy` so the list builds up in reverse order.

### Step-by-Step Thinking Process

1. Create a sentinel node `let dummy = new ListNode()` whose `dummy.next` tracks the head of the reversed list built so far (initially `null`).
2. Maintain a traversal pointer `let curr = head` scanning the remaining unreversed portion of the original list.
3. Before mutating `curr.next`, save `let next = curr.next` so we do not lose the rest of the list.
4. Splice `curr` right at the front of the reversed chain (`curr.next = dummy.next; dummy.next = curr;`) and advance `curr = next`.
5. Once `curr` reaches `null`, `dummy.next` points to the last node of the original list, which is now the new head.

### Algorithm / Intuition

Think of `dummy` as an anchor before the reversed list. Every iteration detaches the front node `curr` from the remaining input chain and pushes it onto the front of `dummy.next`:
1. `let next = curr.next` preserves the unprocessed suffix.
2. `curr.next = dummy.next` links `curr` ahead of all previously reversed nodes (for the very first node, `dummy.next` is `null`, cleanly making node `1` the new tail!).
3. `dummy.next = curr` updates the reversed head to `curr`.
4. `curr = next` moves to the next original node.
If `head` is `null`, the loop never executes and `dummy.next` (`null`) is returned cleanly.

---

## Dry Run

Tracing Example 1: `head = [1, 2, 3, 4, 5]` (`dummy.next = null` initially):

| Step | `curr` | `next` (`curr.next`) | `dummy.next` Chain After Splice |
| :--- | :--- | :--- | :--- |
| Init | `1` | — | `null` |
| `1` | `1` | `2` | `1 -> null` |
| `2` | `2` | `3` | `2 -> 1 -> null` |
| `3` | `3` | `4` | `3 -> 2 -> 1 -> null` |
| `4` | `4` | `5` | `4 -> 3 -> 2 -> 1 -> null` |
| `5` | `5` | `null` | `5 -> 4 -> 3 -> 2 -> 1 -> null` |

Loop ends (`curr === null`), returning `dummy.next` (`[5, 4, 3, 2, 1]`).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We visit each of the `n` nodes in the linked list exactly once, performing `O(1)` pointer assignments per node.
- **Space Complexity:** `O(1)` — Only one auxiliary sentinel `ListNode` (`dummy`) and two pointer variables (`curr`, `next`) are allocated regardless of list length.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [206reverse-linked-list.js](./206reverse-linked-list.js) |

---

## Key Learnings

- The head-insertion pattern (`curr.next = dummy.next; dummy.next = curr;`) is especially versatile because it directly generalizes to reversing sublists (such as LeetCode 92: Reverse Linked List II).
- Always save `curr.next` before reassigning `curr.next` when rewiring singly linked lists in-place.
- Initializing `dummy = new ListNode()` defaults `dummy.next` to `null`, automatically terminating the new tail of the reversed list.
