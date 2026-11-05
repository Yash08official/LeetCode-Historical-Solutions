---
comments: true
difficulty: Medium
tags:
  - Tree
  - Breadth-First Search
  - Sorting
  - Binary Tree
---

# 2583. Kth Largest Sum in a Binary Tree

**[View Problem on LeetCode](https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2583` (`2583`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Tree`, `Breadth-First Search`, `Sorting`, `Binary Tree` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given the `root` of a binary tree and a positive integer `k`.

The **level sum** of a binary tree is defined as the sum of the values of all nodes located at the same depth (level).

Return the $k$-th **largest** level sum in the tree (level sums do not have to be distinct). If the tree contains fewer than `k` levels, return `-1`.

---

## Examples

### Example 1

```text
Input: root = [5,8,9,2,1,3,7,4,6], k = 2
Output: 13
Explanation: The level sums are the following:
- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2^nd largest level sum is 13.
```

### Example 2

```text
Input: root = [1,2,null,3], k = 1
Output: 3
Explanation: The largest level sum is 3.
```

---

## Constraints

- The number of nodes in the tree is `n`.

- `2 <= n <= 10^5`

- `1 <= Node.val <= 10^6`

- `1 <= k <= n`

---

## Problem Understanding

We must compute the sum of values for every level of the tree. Once all level sums are collected, we must find the $k$-th largest value. If the total number of levels $L$ is strictly less than $k$, we must return `-1`. Node values can be up to $10^6$ and the tree can have up to $10^5$ nodes, so level sums can exceed standard integer ranges (though JavaScript numbers handle integers safely up to $2^{53} - 1$).

---

## Approach

### Brute Force Approach

Perform a standard BFS or DFS to collect the sum of each level into an array. Sort the array of level sums in descending order using `Array.prototype.sort()`. If the array length is less than `k`, return `-1`; otherwise return the element at index `k - 1`. Sorting takes $O(L \log L)$ where $L$ is the number of levels.

### Optimized Approach

Perform Breadth-First Search (BFS) level-order traversal using a queue `q`. For each level, iterate through all nodes currently in `q`, sum their values into `sum`, and push their children into `q`. Maintain a min-heap (`MinPriorityQueue`) `pq` of capacity `k` containing the largest level sums encountered so far. If `pq.size() < k`, enqueue `sum`. Otherwise, if `pq.front().element < sum`, dequeue the smallest and enqueue `sum`. After traversing the entire tree, if `pq.size() < k`, return `-1`; otherwise, the root of the min-heap `pq.front().element` is the $k$-th largest level sum.

### Step-by-Step Thinking Process

1. Level-order traversal (BFS) with a queue is the natural way to visit nodes level by level.
2. At each level, the current `q.length` gives the exact number of nodes at this depth. We loop through that many nodes, accumulate their values into `sum`, and enqueue non-null children.
3. To find the $k$-th largest element across a stream of level sums, a min-heap of size `k` keeps track of the top `k` sums in $O(\log k)$ time per level.
4. At the end, if the heap has fewer than `k` elements, the tree had fewer than `k` levels, so return `-1`.
5. Otherwise, the smallest element among the top `k` sums (the top of the min-heap) is precisely the $k$-th largest.

### Algorithm / Intuition

The algorithm initializes `pq` as a `MinPriorityQueue({ priority: x => x })` and queue `q` with `[root]`. The `while (q.length > 0)` loop processes one depth level per iteration: it records `size = q.length`, dequeues each node with `q.shift()`, adds its `val` to `sum`, and pushes child nodes to `q`. Next, it manages the top-`k` heap: if `pq.size() < k`, `pq.enqueue(sum)`; if `pq.size() == k` and `sum > pq.front().element`, `pq.dequeue()` removes the smaller sum and `pq.enqueue(sum)` inserts the larger one. Finally, if `pq.size() < k`, it returns `-1`; otherwise, it returns `pq.front().element`.

---

## Dry Run

Trace with Example 1: `root = [5,8,9,2,1,3,7,4,6]`, `k = 2`.
- Start: `pq = []`, `q = [Node(5)]`.
- Level 1: `size = 1`. Dequeue 5. `sum = 5`. Children: 8, 9 pushed to `q`. `pq.size() < 2` -> enqueue 5. `pq = [5]`.
- Level 2: `size = 2`. Dequeue 8, 9. `sum = 8 + 9 = 17`. Children: 2, 1, 3, 7 pushed to `q`. `pq.size() < 2` -> enqueue 17. `pq = [5, 17]` (min is 5).
- Level 3: `size = 4`. Dequeue 2, 1, 3, 7. `sum = 2 + 1 + 3 + 7 = 13`. Children: 4, 6 pushed to `q`.
  - `pq.size() == 2`, front is `5 < 13` -> dequeue 5, enqueue 13. `pq = [13, 17]` (min is 13).
- Level 4: `size = 2`. Dequeue 4, 6. `sum = 4 + 6 = 10`. Children: none.
  - `pq.size() == 2`, front is `13 > 10` -> ignore 10.
- BFS terminates. `pq.size() == 2 >= k`.
- Return `pq.front().element = 13`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + L log k)` — Each of the `n` nodes is enqueued and dequeued from `q` once in `O(1)` time. For each of the `L` levels ($L \le n$), priority queue operations take `O(log k)` time. Overall time complexity is `O(n + L log k)`.
- **Space Complexity:** `O(W + k)` — The BFS queue `q` holds at most the maximum width `W` of the tree (up to $n/2$ in a balanced tree), and the min-priority queue `pq` holds at most `k` level sums.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2583kth-largest-sum-in-a-binary-tree.js](./2583kth-largest-sum-in-a-binary-tree.js) |

---

## Key Learnings

- Level-order traversal using the snapshot queue pattern (`size = q.length` followed by a loop) cleanly separates nodes by level.
- A min-heap of capacity `k` is the optimal way to find the $k$-th largest element from an online or stream-like sequence without sorting the entire collection.
- Always verify boundary conditions such as $L < k$ to ensure the specified fallback (here `-1`) is returned.
