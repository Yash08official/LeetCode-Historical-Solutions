---
comments: true
difficulty: Hard
tags:
  - Linked List
  - Divide and Conquer
  - Heap (Priority Queue)
  - Merge Sort
  - Tournament Sort
---

# 23. Merge k Sorted Lists

**[View Problem on LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0023` (`23`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Linked List`, `Divide and Conquer`, `Heap (Priority Queue)`, `Merge Sort`, `Tournament Sort` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an array `lists` containing `k` singly linked lists, where each individual linked list is already sorted in ascending order.

Merge all `k` linked lists into one single sorted linked list and return its head node.

---

## Examples

### Example 1

```text
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
```

### Example 2

```text
Input: lists = []
Output: []
```

### Example 3

```text
Input: lists = [[]]
Output: []
```

---

## Constraints

- `k == lists.length`

- `0 <= k <= 10^4`

- `0 <= lists[i].length <= 500`

- `-10^4 <= lists[i][j] <= 10^4`

- `lists[i]` is sorted in **ascending order**.

- The sum of `lists[i].length` will not exceed `10^4`.

---

## Problem Understanding

- **Multi-way merge:** At any step, the next smallest node among all remaining nodes must be one of the current heads of the up-to-`k` non-empty lists.
- **Scale of constraints:** `k` can be up to `10^4`, and the total number of nodes `N` across all lists is at most `10^4`. Individual lists inside `lists` can be empty (`null`), or `lists` itself can be empty (`[]`).

---

## Approach

### Brute Force Approach

One naive method scans all `k` list heads linearly at every step to find the minimum node, taking `O(k)` per node and `O(N * k)` overall (up to `10^8` operations when `k = 10^4` and `N = 10^4`). Another collects all `N` values into an array, sorts them in `O(N log N)`, and allocates `N` new `ListNode` objects instead of reusing the given nodes.

### Optimized Approach

The implemented JavaScript solution uses a **Min-Priority Queue (Min-Heap)** via `MinPriorityQueue({ priority: node => node.val })` alongside a `dummy` sentinel head. It inserts all non-null initial list heads into `pq`, then repeatedly dequeues the node with the smallest `.val`, appends it to `cur.next`, and enqueues `node.next` if non-null.

### Step-by-Step Thinking Process

1. Instantiate a min-heap `pq` keyed by `node.val` so extracting the smallest available node among up to `k` candidates takes `O(log k)` time.
2. Iterate through `lists` and enqueue each `head` only if `head` is truthy (skipping `null` empty lists).
3. Create a sentinel node `dummy = new ListNode()` and tail pointer `cur = dummy` to build the merged list cleanly without special-casing the first node.
4. While `!pq.isEmpty()`, pop the minimum `node` (`pq.dequeue().element`), link `cur.next = node`, advance `cur = cur.next`, and if `node.next` exists, push `node.next` into `pq`.
5. Return `dummy.next` once `pq` is empty.

### Algorithm / Intuition

Instead of holding all `N` nodes in the heap at once, `pq` maintains a frontier of at most `k` nodes—one active head from each non-exhausted list. When `const node = pq.dequeue().element` removes the minimum head from list `i`, its successor `node.next` is the new smallest remaining element from list `i`, so pushing `node.next` into `pq` preserves the invariant that the global minimum of all unmerged nodes sits at the top of `pq`.

---

## Dry Run

Tracing Example 1: `lists = [[1,4,5], [1,3,4], [2,6]]`

1. **Initialization:** Enqueue heads `1(L0)`, `1(L1)`, `2(L2)`. `pq` contains `[1(L0), 1(L1), 2(L2)]`.
2. **Pop `1(L0)`:** `cur.next = 1`, enqueue `4(L0)`. `pq`: `[1(L1), 2(L2), 4(L0)]`. Merged: `1`.
3. **Pop `1(L1)`:** `cur.next = 1`, enqueue `3(L1)`. `pq`: `[2(L2), 3(L1), 4(L0)]`. Merged: `1 -> 1`.
4. **Pop `2(L2)`:** `cur.next = 2`, enqueue `6(L2)`. `pq`: `[3(L1), 4(L0), 6(L2)]`. Merged: `1 -> 1 -> 2`.
5. **Pop `3(L1)`:** `cur.next = 3`, enqueue `4(L1)`. `pq`: `[4(L0), 4(L1), 6(L2)]`. Merged: `1 -> 1 -> 2 -> 3`.
6. **Pop `4(L0)`:** `cur.next = 4`, enqueue `5(L0)`. `pq`: `[4(L1), 5(L0), 6(L2)]`. Merged: `1 -> 1 -> 2 -> 3 -> 4`.
7. **Pop `4(L1)`:** `cur.next = 4` (`node.next` is `null`). `pq`: `[5(L0), 6(L2)]`. Merged: `1 -> 1 -> 2 -> 3 -> 4 -> 4`.
8. **Pop `5(L0)`**, then **pop `6(L2)`**: `pq` becomes empty. Return `dummy.next` -> `[1,1,2,3,4,4,5,6]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N log k + k)` — Scanning `lists` takes `O(k)`, and each of the `N` total nodes is enqueued and dequeued once in a heap of size at most `k` (`O(log k)` per operation).
- **Space Complexity:** `O(k)` — The priority queue `pq` holds at most `k` `ListNode` references at any point, and existing list nodes are relinked in-place.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [23merge-k-sorted-lists.js](./23merge-k-sorted-lists.js) |

---

## Key Learnings

- A `k`-way merge min-heap needs size `O(k)` rather than `O(N)` because each list is already internally sorted.
- Guarding `if (head)` before initial insertion cleanly handles edge cases like `lists = []` and `lists = [[]]`.
- LeetCode's JavaScript environment includes `@datastructures-js/priority-queue`, allowing `new MinPriorityQueue({ priority: node => node.val })` out of the box.
