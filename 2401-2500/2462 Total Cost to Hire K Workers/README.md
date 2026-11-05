---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Heap (Priority Queue)
  - Simulation
---

# 2462. Total Cost to Hire K Workers

**[View Problem on LeetCode](https://leetcode.com/problems/total-cost-to-hire-k-workers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2462` (`2462`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Heap (Priority Queue)`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed integer array `costs` where `costs[i]` is the cost of hiring the $i$-th worker. You are also given two integers $k$ and `candidates`.

You want to hire exactly $k$ workers in $k$ sessions. In each hiring session:
1. You choose the worker with the lowest cost among either the first `candidates` workers or the last `candidates` workers currently available.
2. If there is a tie in lowest cost, choose the worker with the smallest index.
3. Remove the hired worker from the array.

Return the total cost to hire exactly $k$ workers.

---

## Examples

### Example 1

```text
Input: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
Output: 11
Explanation: We hire 3 workers in total. The total cost is initially 0.
- In the first hiring round we choose the worker from [17,12,10,2,7,2,11,20,8]. The lowest cost is 2, and we break the tie by the smallest index, which is 3. The total cost = 0 + 2 = 2.
- In the second hiring round we choose the worker from [17,12,10,7,2,11,20,8]. The lowest cost is 2 (index 4). The total cost = 2 + 2 = 4.
- In the third hiring round we choose the worker from [17,12,10,7,11,20,8]. The lowest cost is 7 (index 3). The total cost = 4 + 7 = 11. Notice that the worker with index 3 was common in the first and last four workers.
The total hiring cost is 11.
```

### Example 2

```text
Input: costs = [1,2,4,1], k = 3, candidates = 3
Output: 4
Explanation: We hire 3 workers in total. The total cost is initially 0.
- In the first hiring round we choose the worker from [1,2,4,1]. The lowest cost is 1, and we break the tie by the smallest index, which is 0. The total cost = 0 + 1 = 1. Notice that workers with index 1 and 2 are common in the first and last 3 workers.
- In the second hiring round we choose the worker from [2,4,1]. The lowest cost is 1 (index 2). The total cost = 1 + 1 = 2.
- In the third hiring round there are less than three candidates. We choose the worker from the remaining workers [2,4]. The lowest cost is 2 (index 0). The total cost = 2 + 2 = 4.
The total hiring cost is 4.
```

---

## Constraints

- `1 <= costs.length <= 10^5`

- `1 <= costs[i] <= 10^5`

- `1 <= k, candidates <= costs.length`

---

## Problem Understanding

At any session, the pool of eligible candidates consists of up to `candidates` workers from the left side and up to `candidates` workers from the right side. Notice that if the remaining available workers total $\le 2 \times \text{candidates}$, the left and right candidate pools overlap to cover all remaining workers. When all workers are eligible, we simply pick the $k$ cheapest workers overall.

Otherwise, when `2 * candidates < n`, we can maintain a priority queue of size $2 \times \text{candidates}$ holding `(cost, index)` pairs. Whenever a worker is polled from the front pool (index $< l$), we replace them by pushing the next worker from the left (`l++`). If polled from the back pool (index $> r$), we replace them with the next worker from the right (`r--`).

---

## Approach

### Brute Force Approach

In each session, scan the first `candidates` elements and last `candidates` elements of the remaining array, find the minimum (breaking ties by index), remove the element, and shift subsequent elements in an `ArrayList`. Finding the minimum takes $O(\text{candidates})$ and array deletion takes $O(n)$, leading to $O(k \cdot n)$ time. For $n, k \le 10^5$, this requires up to $10^{10}$ operations, causing TLE.

### Optimized Approach

If `candidates * 2 >= n`, sort all costs and sum the first $k$ elements in $O(n \log n)$. Otherwise, maintain a min-heap of size $2 \times \text{candidates}$ storing `int[]{cost, index}`. Use two pointers `l` and `r` to refill the heap as workers are selected, completing all $k$ hirings in $O(k \log(\text{candidates}))$ time.

### Step-by-Step Thinking Process

1. Handle edge case: if `candidates * 2 >= n`, every worker is eligible from the start. Sort `costs` directly and return the sum of the first $k$ elements.
2. Otherwise, eligible workers come from two sliding boundaries: left side $[0, candidates - 1]$ and right side $[n - candidates, n - 1]$.
3. Use a `PriorityQueue<int[]>` ordered primarily by cost (`a[0] - b[0]`), then by index (`a[1] - b[1]`).
4. Insert the first `candidates` and last `candidates` elements into the priority queue.
5. Initialize two pointers: `l = candidates`, `r = n - candidates - 1`.
6. Repeat $k$ times: poll the minimum element `p` from `pq` and add `p[0]` to `ans`.
  - If `l > r`, no more unadded workers exist, continue.
  - If `p[1] < l`, the hired worker came from the left window, so insert `[costs[l], l++]`.
  - Otherwise, the worker came from the right window, so insert `[costs[r], r--]`.

### Algorithm / Intuition

In the provided Java solution:

1. Check if `candidates * 2 >= n`. If true, `Arrays.sort(costs)` allows summing the first $k$ elements directly, returning early.
2. Otherwise, a `PriorityQueue<int[]>` is instantiated with comparator `(a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]`. Indices are stored alongside costs to enforce the tie-breaker and determine whether to replenish from `l` or `r`.
3. Initial candidates are added from both ends ($0$ to `candidates - 1` and $n - candidates$ to $n - 1$).
4. In the while loop (`while (k-- > 0)`):
   - `p = pq.poll()` retrieves the cheapest eligible worker.
   - `ans += p[0]` accumulates the cost.
   - If pointers haven't crossed (`l <= r`), we replenish the heap from the side that lost a candidate (`p[1] < l` means left, else right).
5. The total accumulated cost is returned as a 64-bit `long`.

---

## Dry Run

Consider Example 1: `costs = [17, 12, 10, 2, 7, 2, 11, 20, 8]`, `k = 3`, `candidates = 4`, `n = 9`

1. `candidates * 2 = 8 < 9` -> PriorityQueue used.
2. Left: indices 0..3: `[17,0], [12,1], [10,2], [2,3]`.
   Right: indices 5..8: `[2,5], [11,6], [20,7], [8,8]`.
   `l = 4`, `r = 4` (index 4 is element `7`).

3. **Session 1 ($k=3$)**:
   - Min elements with cost 2: `[2, 3]` and `[2, 5]`. Smaller index wins: poll `[2, 3]`.
   - `ans += 2`. `p[1] = 3 < l (4)` -> left replenishment: push `[costs[4], 4] = [7, 4]`, `l = 5`.

4. **Session 2 ($k=2$)**:
   - Min element is `[2, 5]`. Poll `[2, 5]`.
   - `ans += 2` (total 4). `p[1] = 5 >= l (5)` -> right replenishment attempted, but `l (5) > r (4)`, so no push.

5. **Session 3 ($k=1$)**:
   - Remaining heap min is `[7, 4]`. Poll `[7, 4]`.
   - `ans += 7` (total 11). `l > r`, no replenishment.

Final Return: `ans = 11`.

---

## Complexity Analysis

- **Time Complexity:** `O((candidates + k) \log(candidates))` — Building the initial heap of size $2 \cdot \text{candidates}$ takes $O(\text{candidates} \log(\text{candidates}))$. Each of the $k$ hiring rounds performs one poll and at most one offer on the heap of size at most $2 \cdot \text{candidates}$, taking $O(k \log(\text{candidates}))$. If `candidates * 2 >= n`, sorting takes $O(n \log n)$.
- **Space Complexity:** `O(candidates)` — The priority queue stores at most $2 \times \text{candidates}$ elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2462total-cost-to-hire-k-workers.java](./2462total-cost-to-hire-k-workers.java) |

---

## Key Learnings

- A min-heap combined with two pointers provides an efficient way to simulate independent sliding boundary pools.
- Encoding the original index into heap entries allows unambiguous tie-breaking and determines which boundary pointer to advance.
- Early exit for overlapping candidate pools (`candidates * 2 >= n`) simplifies logic and runs standard sorting.
