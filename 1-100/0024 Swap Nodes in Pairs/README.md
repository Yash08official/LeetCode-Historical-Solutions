---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Recursion
---

# 24. Swap Nodes in Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/swap-nodes-in-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0024` (`24`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given the `head` of a singly linked list, swap every two adjacent nodes (1st with 2nd, 3rd with 4th, and so on) and return the new head of the list.

You must perform the swaps by changing node `.next` links themselves—modifying the `.val` fields inside nodes is not allowed.

---

## Examples

### Example 1

**Input:** `head = [1,2,3,4]`

**Output:** `[2,1,4,3]`

**Explanation:**

### Example 2

**Input:** `head = []`

**Output:** `[]`

### Example 3

**Input:** `head = [1]`

**Output:** `[1]`

### Example 4

**Input:** `head = [1,2,3]`

**Output:** `[2,1,3]`

---

## Constraints

- The number of nodes in the list is in the range `[0, 100]`.

- `0 <= Node.val <= 100`

---

## Problem Understanding

- **Pairwise structure:** Every pair `(head, head.next)` reverses locally so `head.next` becomes the pair's first node and `head` becomes the pair's second node, pointing onward to the swapped result of `head.next.next`.
- **Odd-length & tiny lists:** If the list has `0` nodes (`null`) or `1` node (`head.next === null`), no swap can occur and `head` should be returned unchanged. For odd lengths like `[1,2,3]`, the trailing single node `3` stays in place.

---

## Approach

### Brute Force Approach

A naive workaround copies node references into an array, swaps adjacent elements `(i, i + 1)` in the array, and reconnects every `.next` pointer across the array. While `O(n)` in time, allocating an auxiliary `O(n)` array is unnecessary when direct pointer rewiring handles pairs cleanly.

### Optimized Approach

The implemented JavaScript solution uses **post-order recursion** (`swapPairs`). If `!head || !head.next`, it returns `head`. Otherwise, it recursively swaps the sublist starting at `head.next.next` (storing its new head in `t`), reverses the current pair `head` and `p = head.next` via `p.next = head` and `head.next = t`, and returns `p`.

### Step-by-Step Thinking Process

1. Establish the base case: if `head` is `null` or `head.next` is `null`, fewer than two nodes remain, so return `head` as-is.
2. Recursively solve the rest of the list starting after the current pair: `const t = swapPairs(head.next.next)`.
3. Save a reference to the second node of the current pair: `const p = head.next`.
4. Flip the pair's link (`p.next = head`) and attach the swapped remainder to the new tail of the pair (`head.next = t`).
5. Return `p` as the new head of this swapped segment.

### Algorithm / Intuition

Think of `swapPairs(head)` as a black box that returns the properly swapped head for any sublist. For a pair `head -> p -> (rest)`, calling `t = swapPairs(head.next.next)` transforms `(rest)` first and hands back its new head `t`. Then only two pointer assignments are needed: `p.next = head` puts `p` in front of `head`, and `head.next = t` stitches `head` seamlessly to the rest of the list without losing any references.

---

## Dry Run

Tracing Example 1: `head = [1, 2, 3, 4]`

- **Call 1 (`swapPairs(1)`):** `head = 1`, `head.next = 2`. Calls `swapPairs(3)`.
  - **Call 2 (`swapPairs(3)`):** `head = 3`, `head.next = 4`. Calls `swapPairs(null)`.
    - **Call 3 (`swapPairs(null)`):** `!head` is true -> returns `null`.
  - Back in **Call 2**: `t = null`, `p = 4`. Sets `4.next = 3` and `3.next = null`. Returns `4` (`[4 -> 3]`).
- Back in **Call 1**: `t = 4` (`[4 -> 3]`), `p = 2`. Sets `2.next = 1` and `1.next = 4`. Returns `2` (`[2 -> 1 -> 4 -> 3]`).

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each recursive step processes `2` nodes in `O(1)` time, making `floor(n / 2) + 1` calls in total.
- **Space Complexity:** `O(n)` — The call stack reaches depth `O(n / 2) = O(n)` due to recursion (an iterative pointer loop could do this in `O(1)` extra space).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [24swap-nodes-in-pairs.js](./24swap-nodes-in-pairs.js) |

---

## Key Learnings

- Swapping nodes in a singly linked list is cleaner when you isolate the pair `(head, p)` and treat `head.next.next` onwards as an independent subproblem.
- Always store `p = head.next` (or compute `t = swapPairs(head.next.next)` first) before mutating `next` pointers so you never lose track of downstream nodes.
- This problem is the `k = 2` special case of **25. Reverse Nodes in k-Group**.
