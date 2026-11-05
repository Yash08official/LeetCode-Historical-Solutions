---
comments: true
difficulty: Medium
tags:
  - Linked List
---

# 725. Split Linked List in Parts

**[View Problem on LeetCode](https://leetcode.com/problems/split-linked-list-in-parts/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0725` (`725`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List` |
| **Solution Language** | Java |

---

## Problem Description

Given the `head` of a singly linked list and an integer `k`, partition the list into `k` consecutive linked list segments and return them in a `ListNode[]` array of length `k`.

The lengths of any two segments may differ by **at most `1`**, earlier segments must be at least as long as later segments, and the original node order must be preserved. If the list has fewer than `k` nodes, the trailing entries of the returned array should be `null`.

---

## Examples

### Example 1

```text
Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
Explanation:
The first element output[0] has output[0].val = 1, output[0].next = null.
The last element output[4] is null, but its string representation as a ListNode is [].
```

### Example 2

```text
Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [[1,2,3,4],[5,6,7],[8,9,10]]
Explanation:
The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.
```

---

## Constraints

- The number of nodes in the list is in the range `[0, 1000]`.

- `0 <= Node.val <= 1000`

- `1 <= k <= 50`

---

## Problem Understanding

- If the list contains `n` nodes total, dividing `n` evenly among `k` parts gives every part at least `cnt = n / k` nodes, with `mod = n % k` leftover nodes.
- To satisfy the rule that earlier parts are larger than or equal to later parts and differ in size by at most `1`, the first `mod` parts must each have size `cnt + 1`, and the remaining `k - mod` parts must each have size `cnt`.
- Crucially, each non-empty segment's tail node must have its `.next` pointer set to `null` so the segments are properly disconnected.

---

## Approach

### Brute Force Approach

A straightforward but wasteful approach copies all node values into an `ArrayList` or array, then allocates brand-new `ListNode` objects for each of the `k` sublists. While this runs in `O(n + k)` time, it unnecessarily allocates `O(n)` extra heap memory instead of splitting the existing list in place.

### Optimized Approach

Count the list length `n` in one traversal, compute quotient `cnt = n / k` and remainder `mod = n % k`, and then walk the list a second time to cut it in place into `k` disconnected sublists of sizes `cnt + 1` (first `mod` parts) and `cnt` (remaining parts).

### Step-by-Step Thinking Process

1. Traverse from `head` to count total nodes `n`.
2. Compute base length `cnt = n / k` and extra single-node count `mod = n % k`.
3. Create `ListNode[] ans = new ListNode[k]` (all entries default to `null`, automatically handling empty trailing parts when `n < k`).
4. For part `i` from `0` to `k - 1` (while `cur != null`), assign `ans[i] = cur` and calculate its target length `m = cnt + (i < mod ? 1 : 0)`.
5. Advance `cur` by `m - 1` steps to reach the last node of part `i`, save `nxt = cur.next`, detach the part with `cur.next = null`, and set `cur = nxt`.

### Algorithm / Intuition

In `splitListToParts(ListNode head, int k)`:
- The first `for` loop counts `n`.
- In the second loop, `i < k && cur != null` ensures we never dereference `null` when `n < k` (in that case `cnt == 0` and `mod == n`, so the loop runs `n` times with `m = 1` and stops as soon as `cur` becomes `null`, leaving `ans[n .. k-1]` as `null`).
- Inside each non-empty part, `ans[i]` already points to the first node, so the inner loop `for (int j = 1; j < m; ++j)` advances `m - 1` edges to land `cur` on the exact tail node of part `i` before severing `cur.next = null`.

---

## Dry Run

Trace on **Example 1**: `head = [1, 2, 3]`, `k = 5`.

1. Length pass: `n = 3`. `cnt = 3 / 5 = 0`, `mod = 3 % 5 = 3`.
2. Allocate `ans = [null, null, null, null, null]`, `cur = node(1)`.
3. `i = 0`: `ans[0] = node(1)`, `m = 0 + (0 < 3 ? 1 : 0) = 1`. Inner loop (`j = 1 < 1`) skips. `nxt = node(2)`, `node(1).next = null`, `cur = node(2)`.
4. `i = 1`: `ans[1] = node(2)`, `m = 1`. `nxt = node(3)`, `node(2).next = null`, `cur = node(3)`.
5. `i = 2`: `ans[2] = node(3)`, `m = 1`. `nxt = null`, `node(3).next = null`, `cur = null`.
6. `i = 3`: `cur != null` is `false`, loop terminates.

Returns `[[1], [2], [3], [], []]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + k)` — Traversing the list twice visits each of the `n` nodes twice, and allocating the result array takes `O(k)` time.
- **Space Complexity:** `O(1)` — Excluding the required `ListNode[k]` return array, the list is partitioned in place using constant pointer variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [725split-linked-list-in-parts.java](./725split-linked-list-in-parts.java) |

---

## Key Learnings

- Distributing `n` items as evenly as possible into `k` buckets always yields `n % k` buckets of size `(n / k) + 1` followed by `k - (n % k)` buckets of size `n / k`.
- Checking `cur != null` in the outer loop guard cleanly avoids null-pointer dereferences when `n < k`.
- Always save `cur.next` in a temporary variable before setting `cur.next = null` when severing linked list segments.
