---
comments: true
difficulty: Medium
tags:
  - Linked List
---

# 328. Odd Even Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/odd-even-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0328` (`328`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a singly linked list, reorder its nodes so that all nodes at **odd `1`-based positions** (`1st, 3rd, 5th, ...`) appear first, followed by all nodes at **even `1`-based positions** (`2nd, 4th, 6th, ...`), while preserving the original relative order within each group.

You must perform this rearrangement in `O(n)` time and `O(1)` extra space (by relinking existing nodes rather than creating new nodes).

---

## Examples

### Example 1

```text
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
```

### Example 2

```text
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
```

---

## Constraints

- The number of nodes in the linked list is in the range `[0, 10^4]`.

- `-10^6 <= Node.val <= 10^6`

---

## Problem Understanding

- Grouping is based strictly on **node position** (`1st, 2nd, 3rd, ...`), **not** on `node.val` parity.
- If the list is empty (`head === null`) or has `1` or `2` nodes, its odd-then-even order is already satisfied.
- We must save a pointer (`c`) to the original second node (`head.next`) before relinking, because it becomes the head of the even chain that gets attached to the odd tail at the end.

---

## Approach

### Brute Force Approach

Collecting odd-positioned and even-positioned node values (or node references) into two auxiliary arrays and rebuilding links afterward is straightforward, but consumes `O(n)` extra memory, violating the strict `O(1)` space constraint.

### Optimized Approach

Maintain odd-tail pointer `a = head`, even-tail pointer `b = head.next`, and saved even-head pointer `c = b`; leapfrog `a` and `b` across alternating nodes while `b !== null && b.next !== null`, then link `a.next = c`.

### Step-by-Step Thinking Process

1. Handle the empty list immediately: `if (head === null) return null;`.
2. Initialize `a = head` (current end of odd chain), `b = head.next` (current end of even chain), and `c = b` (anchor to the start of the even chain).
3. Loop while `b !== null && b.next !== null` (meaning at least one more odd node exists after `b`):
4. Link `a.next = b.next` and advance `a = a.next` (stitching the next odd node onto the odd chain).
5. Link `b.next = a.next` and advance `b = b.next` (stitching the node after `a`—either the next even node or `null`—onto the even chain).
6. Once the loop finishes, connect the odd chain's tail to the even chain's head via `a.next = c` and return `head`.

### Algorithm / Intuition

Checking `b !== null && b.next !== null` cleanly handles both list-length parities without extra branches:
- **Odd length (e.g., 5 nodes):** `b` reaches `null` right after linking `4 -> null` while `a` sits on the `5th` node.
- **Even length (e.g., 4 nodes):** `b` sits on the `4th` node with `b.next === null` while `a` sits on the `3rd` node.
In both cases, `a` ends up pointing to the **exact last odd node**, and the even list is already properly `null`-terminated, so `a.next = c` finishes the splice in one assignment!

---

## Dry Run

Tracing **Example 1** (`head = [1, 2, 3, 4, 5]`):

- Initial: `a = 1`, `b = 2`, `c = 2`.
- **Iteration 1** (`b = 2`, `b.next = 3 !== null`):
  - `a.next = 3`, `a = 3` (odd chain: `1 -> 3`)
  - `b.next = 4`, `b = 4` (even chain: `2 -> 4`)
- **Iteration 2** (`b = 4`, `b.next = 5 !== null`):
  - `a.next = 5`, `a = 5` (odd chain: `1 -> 3 -> 5`)
  - `b.next = null`, `b = null` (even chain: `2 -> 4 -> null`)
- Loop ends (`b === null`).
- `a.next = c` links `5 -> 2` -> final list: `1 -> 3 -> 5 -> 2 -> 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each loop iteration advances across two nodes, visiting all `n` nodes in a single pass.
- **Space Complexity:** `O(1)` — Only three pointer variables (`a`, `b`, `c`) are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [328odd-even-linked-list.js](./328odd-even-linked-list.js) |

---

## Key Learnings

- Unzipping interleaved linked lists in-place only requires tracking the odd tail (`a`), even tail (`b`), and saved even head (`c`).
- Using `while (b !== null && b.next !== null)` guarantees `a` never becomes `null` and always stops at the final odd node regardless of whether `n` is odd or even.
