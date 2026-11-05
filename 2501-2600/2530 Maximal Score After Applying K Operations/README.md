---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Heap (Priority Queue)
---

# 2530. Maximal Score After Applying K Operations

**[View Problem on LeetCode](https://leetcode.com/problems/maximal-score-after-applying-k-operations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2530` (`2530`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Heap (Priority Queue)` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a 0-indexed integer array `nums` and an integer `k`. You start with a score of 0.

In one operation:
1. Choose an index $i$ ($0 \le i < \text{nums.length}$).
2. Add `nums[i]` to your score.
3. Replace `nums[i]` with $\lceil \text{nums}[i] / 3 \rceil$ (the ceiling of `nums[i] / 3`).

Return the maximum possible score attainable after performing exactly $k$ operations.

---

## Examples

### Example 1

```text
Input: nums = [10,10,10,10,10], k = 5
Output: 50
Explanation: Apply the operation to each array element exactly once. The final score is 10 + 10 + 10 + 10 + 10 = 50.
```

### Example 2

```text
Input: nums = [1,10,3,3,3], k = 3
Output: 17
Explanation: You can do the following operations:
Operation 1: Select i = 1, so nums becomes [1,4,3,3,3]. Your score increases by 10.
Operation 2: Select i = 1, so nums becomes [1,2,3,3,3]. Your score increases by 4.
Operation 3: Select i = 2, so nums becomes [1,2,1,3,3]. Your score increases by 3.
The final score is 10 + 4 + 3 = 17.
```

---

## Constraints

- `1 <= nums.length, k <= 10^5`

- `1 <= nums[i] <= 10^9`

---

## Problem Understanding

To maximize the accumulated score over $k$ operations, we should greedily pick the maximum element available at each step. Because $\lceil x / 3 \rceil$ is monotonically increasing with $x$, picking a smaller element early could never yield a larger score than picking the current maximum.

After picking the maximum element $v$, it is replaced with $\lceil v / 3 \rceil$ and put back into consideration for future operations. This dynamic extraction of the maximum followed by re-insertion is the textbook use case for a max-heap (priority queue).

---

## Approach

### Brute Force Approach

A naive brute force scans the entire array in $O(n)$ time to find the maximum element, adds it to `score`, replaces it with $\lceil v / 3 \rceil$, and repeats this process $k$ times. This takes $O(k \cdot n)$ time. With $n, k \le 10^5$, $k \cdot n = 10^{10}$ operations, which causes TLE.

### Optimized Approach

Use a max-heap (`MaxPriorityQueue` in JavaScript). Insert all elements of `nums` into the heap in $O(n \log n)$ (or $O(n)$). For each of the $k$ operations, extract the maximum element `val` from the heap, add it to `score`, and re-insert `Math.ceil(val / 3)` into the heap in $O(\log n)$ time.

### Step-by-Step Thinking Process

1. Observe the greedy choice property: picking the largest available number at each step always maximizes the immediate score increase.
2. Recognize the need for dynamic max extraction and re-insertion: a max-heap is the ideal data structure.
3. Initialize `maxHeap = new MaxPriorityQueue()`.
4. Enqueue all elements of `nums` into `maxHeap`.
5. Loop $k$ times: dequeue the root `val = maxHeap.dequeue().element`.
6. Add `val` to `score`.
7. Enqueue `Math.ceil(val / 3)` back into `maxHeap`.
8. Return `score`.

### Algorithm / Intuition

In the provided JavaScript solution:

1. `const maxHeap = new MaxPriorityQueue()` creates a binary max-heap.
2. A loop enqueues each element of `nums` into `maxHeap`.
3. `score` is initialized to 0.
4. The while loop runs while `k > 0`:
   - `val = maxHeap.dequeue().element` extracts the current maximum element in $O(\log n)$ time.
   - `score += val` adds the value to total score.
   - `maxHeap.enqueue(Math.ceil(val / 3))` inserts the transformed value back into the heap in $O(\log n)$ time.
   - `k--` decrements the operation count.
5. Finally, `score` is returned.

---

## Dry Run

Consider Example 1: `nums = [10, 10, 10, 10, 10]`, `k = 5`

1. Initialize `maxHeap` with `[10, 10, 10, 10, 10]`, `score = 0`.
2. **Op 1**: Dequeue 10 -> `score = 10`. Enqueue $\lceil 10/3 \rceil = 4$. Heap: `[10, 10, 10, 10, 4]`.
3. **Op 2**: Dequeue 10 -> `score = 20`. Enqueue $\lceil 10/3 \rceil = 4$. Heap: `[10, 10, 10, 4, 4]`.
4. **Op 3**: Dequeue 10 -> `score = 30`. Enqueue $\lceil 10/3 \rceil = 4$. Heap: `[10, 10, 4, 4, 4]`.
5. **Op 4**: Dequeue 10 -> `score = 40`. Enqueue $\lceil 10/3 \rceil = 4$. Heap: `[10, 4, 4, 4, 4]`.
6. **Op 5**: Dequeue 10 -> `score = 50`. Enqueue $\lceil 10/3 \rceil = 4$. Heap: `[4, 4, 4, 4, 4]`.

Final Return: `50`.

---

## Complexity Analysis

- **Time Complexity:** `O(n \log n + k \log n)` — Inserting $n$ elements into the max-heap takes $O(n \log n)$ time. Each of the $k$ operations performs one dequeue and one enqueue in $O(\log n)$ time, totaling $O(k \log n)$.
- **Space Complexity:** `O(n)` — The max-heap stores all $n$ elements of `nums`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2530maximal-score-after-applying-k-operations.js](./2530maximal-score-after-applying-k-operations.js) |

---

## Key Learnings

- Greedy selection over dynamically changing values is efficiently managed using a priority queue.
- `Math.ceil(val / 3)` accurately implements integer ceiling division.
- Using standard priority queue libraries simplifies heap operations without writing manual bubble-up/down logic.
