---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Stack
  - Binary Indexed Tree
  - Segment Tree
  - Heap (Priority Queue)
  - Monotonic Stack
---

# 2940. Find Building Where Alice and Bob Can Meet

**[View Problem on LeetCode](https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2940` (`2940`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Stack`, `Binary Indexed Tree`, `Segment Tree`, `Heap (Priority Queue)`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

We are given an array `heights` where `heights[i]` represents the height of building `i`. A person at building `i` can jump to building `j` if and only if `i < j` and `heights[i] < heights[j]`. We are also given a list of queries `queries` where `queries[k] = [a_k, b_k]`.

For each query, Alice is initially at building `a_k` and Bob is at building `b_k`. They want to meet at the leftmost building `idx` that both can reach (or where one is already located and the other can jump to). If no such building exists, the answer for that query is `-1`. We must return an array of the answers for all queries.

---

## Examples

### Example 1

```text
Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,2]
Explanation: In the first query, Alice and Bob can move to building 2 since heights[0] < heights[2] and heights[1] < heights[2].
In the second query, Alice and Bob can move to building 5 since heights[0] < heights[5] and heights[3] < heights[5].
In the third query, Alice cannot meet Bob since Alice cannot move to any other building.
In the fourth query, Alice and Bob can move to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
In the fifth query, Alice and Bob are already in the same building.
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.
```

### Example 2

```text
Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
Output: [7,6,-1,4,6]
Explanation: In the first query, Alice can directly move to Bob's building since heights[0] < heights[7].
In the second query, Alice and Bob can move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
In the third query, Alice cannot meet Bob since Bob cannot move to any other building.
In the fourth query, Alice and Bob can move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
In the fifth query, Alice can directly move to Bob's building since heights[1] < heights[6].
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.
```

---

## Constraints

- `1 <= heights.length <= 5 * 10^4`

- `1 <= heights[i] <= 10^9`

- `1 <= queries.length <= 5 * 10^4`

- `queries[i] = [a_i, b_i]`

- `0 <= a_i, b_i <= heights.length - 1`

---

## Problem Understanding

Key observations and edge cases:
- Without loss of generality, assume `a <= b` for each query (if `a > b`, swap them).
- Case 1: If `a == b`, they are already at the same building, so the answer is `a`.
- Case 2: If `heights[a] < heights[b]`, Alice can jump directly to Bob's building `b`, so the leftmost meeting point is `b`.
- Case 3: If `heights[a] >= heights[b]`, they cannot meet at `b`. They must both jump to some building `k > b` such that `heights[k] > heights[a]` (which also guarantees `heights[k] > heights[b]`). We need the minimum index `k > b` with `heights[k] > heights[a]`.
- With `n, m <= 5 * 10^4`, an `O(m * n)` naive search per query will timeout. We need an offline query processing approach using range minimum query data structures like a Fenwick tree (Binary Indexed Tree) or segment tree.

---

## Approach

### Brute Force Approach

For every query `[a, b]` with `a <= b`, if `a == b` or `heights[a] < heights[b]`, answer `b`. Otherwise, linearly scan indices `k = b + 1` up to `n - 1` and return the first index `k` where `heights[k] > heights[a]`. If none found, return `-1`. With `50,000` queries and arrays of length `50,000`, the worst-case number of comparisons is `50,000 * 50,000 = 2.5 * 10^9`, resulting in Time Limit Exceeded (TLE).

### Optimized Approach

We process queries offline sorted descending by the right boundary `r = max(a, b)`.
- We sort a clone of `heights` (`s`) to discretize heights via binary search.
- A Binary Indexed Tree (Fenwick tree) is maintained over height ranks to store the minimum building index seen so far.
- As we process queries with right endpoint `r`, we add all buildings `j` from the right (`j > r`) into the BIT, updating the minimum index for each building's height rank.
- For queries requiring a jump to a higher building, we query the BIT for the minimum index with height strictly greater than `heights[l]` in `O(log n)` time.

### Step-by-Step Thinking Process

1. Standardize queries so `l = min(a, b)` and `r = max(a, b)`.
2. Trivial cases: if `l == r` or `heights[l] < heights[r]`, the meeting point is `r`.
3. Otherwise, we need the smallest index `j > r` such that `heights[j] > heights[l]`.
4. Notice the condition `j > r`: by sorting queries descending by `r`, we can dynamically insert buildings at index `j > r` as `r` sweeps leftwards.
5. To find the minimum index `j` among all inserted buildings with height `> heights[l]`, we can map heights to ranks and use a Fenwick tree configured for prefix minimums.
6. Specifically, mapping larger heights to smaller BIT indices allows a standard prefix minimum query `tree.query(k)` to find the minimum building index.

### Algorithm / Intuition

Let's trace how the components interact:
1. Standardize queries: ensure `queries[i][0] <= queries[i][1]`.
2. Create an index array `idx = [0, 1, ..., m - 1]` and sort it descending by `queries[i][1]`.
3. Clone and sort `heights` into `s` for binary search rank lookups.
4. Initialize a `BinaryIndexedTree` of size `n` with `inf`.
5. Maintain a pointer `j = n - 1`. For each query index `i` in `idx`:
   - Let `l = queries[i][0]`, `r = queries[i][1]`.
   - While `j > r`, insert building `j`: find rank `k = n - Arrays.binarySearch(s, heights[j]) + 1` and update `tree.update(k, j)`, then decrement `j`.
   - If `l == r || heights[l] < heights[r]`, set `ans[i] = r`.
   - Else, find rank threshold `k = n - Arrays.binarySearch(s, heights[l])` and query `tree.query(k)`. If result is `inf`, store `-1`; else store the queried minimum index.
6. Return `ans`.

---

## Dry Run

Trace on Example 1: `heights = [6, 4, 8, 5, 2, 7]`, `queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]`

- Standardize: queries already have `queries[i][0] <= queries[i][1]`.
- Query right endpoints: `r = [1, 3, 4, 4, 2]`.
- Sorted query order by `r` descending: query 2 (`r=4`), query 3 (`r=4`), query 1 (`r=3`), query 4 (`r=2`), query 0 (`r=1`).
- As `j` steps down from `5` to `0`:
  - At `r = 4` (queries 2 and 3): building 5 (`heights[5]=7`) is inserted into the BIT.
  - Query 3 `[3, 4]`: `heights[3]=5, heights[4]=2`. `heights[3] >= heights[4]`. Need height `> 5`. Building 5 has height 7 > 5. BIT returns index `5`. `ans[3] = 5`.
  - Query 2 `[2, 4]`: `heights[2]=8, heights[4]=2`. Need height `> 8`. No building after 4 has height > 8. BIT returns `inf -> -1`. `ans[2] = -1`.
  - At `r = 2` (query 4 `[2, 2]`): `l == r`, so `ans[4] = 2` directly.
  - At `r = 1` (query 0 `[0, 1]`): `heights[0]=6, heights[1]=4`. Buildings `j=2..5` are in the BIT. Leftmost building with height > 6 is index 2 (`heights[2]=8`). BIT returns index `2`. `ans[0] = 2`.
- Result: `[2, 5, -1, 5, 2]`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n log n + m log m + m log n) — Sorting heights takes O(n log n), sorting query indices takes O(m log m), and each building insertion / query into the Fenwick tree takes O(log n).
- **Space Complexity:** O(n + m) — Storing the queries array, index array `idx`, sorted heights `s`, BIT array `c`, and output array `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2940find-building-where-alice-and-bob-can-meet.java](./2940find-building-where-alice-and-bob-can-meet.java) |

---

## Key Learnings

- Offline query sorting by one coordinate (here, descending `r`) converts a 2D range constraint into a 1D range minimum query problem.
- Coordinate inversion/reversal in a Fenwick tree enables prefix minimum queries for elements strictly greater than a given value.
- Recognizing trivial cases (`l == r` or `heights[l] < heights[r]`) eliminates unnecessary tree lookups.
