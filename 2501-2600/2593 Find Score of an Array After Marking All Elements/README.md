---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Sorting
  - Heap (Priority Queue)
  - Simulation
---

# 2593. Find Score of an Array After Marking All Elements

**[View Problem on LeetCode](https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2593` (`2593`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Sorting`, `Heap (Priority Queue)`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `nums` of positive integers.

Starting with a score of 0, apply the following process repeatedly until all elements are marked:
1. Choose the smallest integer in the array that has not yet been marked. If there is a tie, choose the one with the smallest index.
2. Add the value of the chosen integer to your total `score`.
3. Mark the chosen element and its two immediate adjacent elements (if they exist) as marked.

Return the final `score` after all elements in `nums` have been marked.

---

## Examples

### Example 1

```text
Input: nums = [2,1,3,4,5,2]
Output: 7
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,1,3,4,5,2].
- 2 is the smallest unmarked element, so we mark it and its left adjacent element: [2,1,3,4,5,2].
- 4 is the only remaining unmarked element, so we mark it: [2,1,3,4,5,2].
Our score is 1 + 2 + 4 = 7.
```

### Example 2

```text
Input: nums = [2,3,5,1,3,2]
Output: 5
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,3,5,1,3,2].
- 2 is the smallest unmarked element, since there are two of them, we choose the left-most one, so we mark the one at index 0 and its right adjacent element: [2,3,5,1,3,2].
- 2 is the only remaining unmarked element, so we mark it: [2,3,5,1,3,2].
Our score is 1 + 2 + 2 = 5.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^6`

---

## Problem Understanding

At every step, we greedily select the unmarked element with the minimum value (breaking ties by smaller index). Selecting an element marks it and its neighbors `i - 1` and `i + 1`. Marked elements can never be selected again to add to the score, though they still serve as marked neighbors. Since $n \le 10^5$, an $O(n^2)$ search for the minimum element will time out. We need an efficient way to repeatedly extract the global minimum while tracking whether an index has already been marked.

---

## Approach

### Brute Force Approach

A naive approach performs a linear scan over the array `nums` at each step to find the unmarked element with the lowest value and smallest index. Once found, it adds its value to the score and marks its neighbors in a boolean array. Since up to $n$ steps might be executed and each step scans $n$ elements, the time complexity is $O(n^2)$, which requires up to $10^{10}$ operations and results in Time Limit Exceeded.

### Optimized Approach

Use a min-heap (`PriorityQueue`) storing pairs `[nums[i], i]`, ordered primarily by value ascending and secondarily by index ascending: `(a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]`. Maintain a boolean array `vis` of size $n$ to record marked indices. While the heap is non-empty, poll the top element `p`. If `p[1]` is not yet visited (guaranteed if we discard visited elements), add `p[0]` to `ans`, mark `p[1]`, `p[1] - 1`, and `p[1] + 1` as true in `vis`. Then, eagerly poll all elements from the top of the heap that are already marked in `vis`.

### Step-by-Step Thinking Process

1. We must repeatedly retrieve the smallest value, breaking ties by index. A min-heap naturally handles this with a custom comparator.
2. Once an index is chosen, its neighbors are invalidated. Rather than trying to update or delete them arbitrarily from within the heap (which is slow in a standard binary heap), we use a boolean array `vis` for lazy/eager deletion.
3. Insert all pairs `[nums[i], i]` into the priority queue initially in $O(n \log n)$.
4. When polling `p`, if it is valid, add `p[0]` to `ans`, mark `p[1]` and neighbors in `vis`.
5. Clean up the top of the queue: `while (!q.isEmpty() && vis[q.peek()[1]]) q.poll();` to ensure the next iteration immediately has a valid candidate or terminates.

### Algorithm / Intuition

The priority queue `q` holds `[nums[i], i]` sorted with `(a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]`. The boolean array `vis` tracks marked positions. In each iteration, `p = q.poll()` is the smallest unmarked element. We add `p[0]` to `ans` (typed as `long` to avoid overflow). We set `vis[p[1]] = true`, and check `p[1] - 1` and `p[1] + 1` using `List.of(p[1] - 1, p[1] + 1)`, marking them in `vis` if they fall within bounds `[0, n)`. Finally, `while (!q.isEmpty() && vis[q.peek()[1]]) q.poll();` discards any newly marked elements sitting at the top of the heap.

---

## Dry Run

Trace with Example 1: `nums = [2, 1, 3, 4, 5, 2]`.
- Min-heap contents initially: `(1,1), (2,0), (2,5), (3,2), (4,3), (5,4)`.
- Step 1: Poll `(1, 1)`. `ans += 1 = 1`. Mark `vis[1] = true`, neighbors `vis[0] = true`, `vis[2] = true`.
  - Heap peek is `(2, 0)` -> `vis[0]` is true! Poll `(2, 0)`.
  - Heap peek is now `(2, 5)` -> `vis[5]` is false. Stop discard loop.
- Step 2: Poll `(2, 5)`. `ans += 2 = 3`. Mark `vis[5] = true`, neighbor `vis[4] = true`.
  - Heap peek is `(3, 2)` -> `vis[2]` is true! Poll `(3, 2)`.
  - Heap peek is now `(4, 3)` -> `vis[3]` is false. Stop discard loop.
- Step 3: Poll `(4, 3)`. `ans += 4 = 7`. Mark `vis[3] = true`, neighbors `vis[2] = true`, `vis[4] = true`.
  - Heap peek is `(5, 4)` -> `vis[4]` is true! Poll `(5, 4)`.
  - Heap is now empty.
Return `ans = 7`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Initializing the priority queue with `n` elements takes `O(n log n)` time. Every element is pushed once and popped at most once from the queue, each taking `O(log n)` time. Total time is `O(n log n)`.
- **Space Complexity:** `O(n)` — The priority queue `q` stores `n` integer pairs and the boolean array `vis` requires `O(n)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2593find-score-of-an-array-after-marking-all-elements.java](./2593find-score-of-an-array-after-marking-all-elements.java) |

---

## Key Learnings

- Min-heaps with lazy or eager deletion are ideal for simulation problems where elements are marked invalid dynamically.
- Ties in priority queues are easily resolved by incorporating the index into the comparator: `a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]`.
- Accumulating scores over large arrays requires a 64-bit integer (`long`) to prevent 32-bit arithmetic overflow.
