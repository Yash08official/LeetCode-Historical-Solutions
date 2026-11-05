---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Two Pointers
  - Stack
---

# 2130. Maximum Twin Sum of a Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2130` (`2130`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Two Pointers`, `Stack` |
| **Solution Language** | JavaScript |

---

## Problem Description

In a singly linked list of **even** length `n`, the **0-indexed** `i`-th node (`0 <= i <= n / 2 - 1`) is paired with its **twin** at index `n - 1 - i` (symmetrically mirrored from the back of the list).

The **twin sum** of a pair is the sum of both nodes' values. Given the `head` of an even-length linked list, return the **maximum twin sum** across all `n / 2` twin pairs.

---

## Examples

### Example 1

```text
Input: head = [5,4,2,1]
Output: 6
Explanation:
Nodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.
There are no other nodes with twins in the linked list.
Thus, the maximum twin sum of the linked list is 6.
```

### Example 2

```text
Input: head = [4,2,2,3]
Output: 7
Explanation:
The nodes with twins present in this linked list are:
- Node 0 is the twin of node 3 having a twin sum of 4 + 3 = 7.
- Node 1 is the twin of node 2 having a twin sum of 2 + 2 = 4.
Thus, the maximum twin sum of the linked list is max(7, 4) = 7.
```

### Example 3

```text
Input: head = [1,100000]
Output: 100001
Explanation:
There is only one node with a twin in the linked list having twin sum of 1 + 100000 = 100001.
```

---

## Constraints

- The number of nodes in the list is an **even** integer in the range `[2, 10^5]`.

- `1 <= Node.val <= 10^5`

---

## Problem Understanding

- **Symmetric Indexing:** Node `0` pairs with node `n - 1`, node `1` pairs with node `n - 2`, ..., up to node `n / 2 - 1` pairing with node `n / 2`.
- **Singly Linked Limitation:** A singly linked list only supports forward traversal (`node.next`), so we cannot directly index backwards from the tail without either buffering values in a random-access array/stack or reversing half the list.
- **Constraints:** `n` is guaranteed even (`2 <= n <= 10^5`) and all node values are positive (`1 <= Node.val <= 10^5`), so initializing `ans = 0` is always safe.

---

## Approach

### Brute Force Approach

First count the list length `n`, and then for each index `i` from `0` to `n / 2 - 1`, walk from `head` all the way to index `n - 1 - i` to fetch the twin's value. Walking `O(n)` pointers for each of the `n / 2` nodes takes `O(n^2)` time, which times out for `n = 10^5`.

### Optimized Approach

Traverse the linked list once to copy all node values into a JavaScript array `s`, then iterate `i` from `0` to `n / 2 - 1` using `O(1)` array indexing to compute `Math.max(ans, s[i] + s[n - 1 - i])`.

### Step-by-Step Thinking Process

1. Observe that twin pairs `(i, n - 1 - i)` are trivial to compute if random access by index is available.
2. Walk the linked list from `head` to `null`, pushing each `node.val` into an array `s`.
3. Let `n = s.length` and initialize `ans = 0`.
4. Loop `i` from `0` to `Math.floor(n / 2) - 1`, updating `ans = Math.max(ans, s[i] + s[n - 1 - i])`, and return `ans`.

### Algorithm / Intuition

By dumping the linked list values sequentially into `let s = []`, index `k` in `s` corresponds directly to the `k`-th node of the linked list, while leaving the input linked list completely unmodified. Once `s` is populated, two symmetric offsets `i` and `n - 1 - i` meet at the middle in `n / 2` iterations, each taking `O(1)` time to read and sum.

---

## Dry Run

Trace on **Example 1**: `head = [5, 4, 2, 1]`.

1. **Copy values into array `s`:**
   - Traverse `5 -> 4 -> 2 -> 1 -> null` -> `s = [5, 4, 2, 1]`, `n = 4`, `ans = 0`.
2. **Evaluate twin sums (`i < 2`):**
   - `i = 0`: `s[0] + s[4 - 1 - 0] = s[0] + s[3] = 5 + 1 = 6` -> `ans = Math.max(0, 6) = 6`.
   - `i = 1`: `s[1] + s[4 - 1 - 1] = s[1] + s[2] = 4 + 2 = 6` -> `ans = Math.max(6, 6) = 6`.
3. **Return `ans`:** `6`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Traversing the `n` linked list nodes takes `O(n)` time, and computing `n / 2` twin sums from array `s` takes `O(n)` time.
- **Space Complexity:** `O(n)` — Array `s` stores all `n` integer values from the linked list.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2130maximum-twin-sum-of-a-linked-list.js](./2130maximum-twin-sum-of-a-linked-list.js) |

---

## Key Learnings

- Copying linked list values into an array trades `O(n)` space for clean, cache-friendly `O(1)` random access without mutating the input list.
- If `O(1)` auxiliary space (and mutating the list) is desired in an interview follow-up, find the midpoint with fast/slow pointers, reverse the second half in-place, and walk two pointers from both halves simultaneously.
