---
comments: true
difficulty: Hard
tags:
  - Array
  - Stack
  - Segment Tree
  - Queue
  - Sliding Window
  - Monotonic Stack
  - Monotonic Queue
---

# 3420. Count Non-Decreasing Subarrays After K Operations

**[View Problem on LeetCode](https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3420` |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Stack`, `Segment Tree`, `Queue`, `Sliding Window`, `Monotonic Stack`, `Monotonic Queue` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `nums` of $n$ integers and an integer $k$.

In one operation, you can select an index $i$ and increase `nums[i]` by $1$.

A subarray is non-decreasing if each element is greater than or equal to the previous element.

Return the number of subarrays of `nums` that can be made non-decreasing using at most $k$ operations.

---

## Problem Understanding

- To make subarray $nums[l \dots r]$ non-decreasing with minimum operations, each element $nums[i]$ must be raised to $\max_{l \le j \le i} nums[j]$ (prefix maximum).
- The total operations required for $[l \dots r]$ is:
  $$	ext{cost}(l, r) = \sum_{i=l}^r \left(\max_{l \le j \le i} nums[j]ight) - \sum_{i=l}^r nums[i]$$
- Notice that for a fixed right endpoint $r$, $	ext{cost}(l, r)$ is monotonically non-increasing as $l$ increases.
- Thus, for each $r$, we can binary search the smallest valid left index $l$ such that $	ext{cost}(l, r) \le k$.
- All subarrays starting from $l \dots r$ will be valid, contributing $r - l + 1$ subarrays.

---

## Approach

### Next Greater Element + Binary Lifting + Binary Search

1. **Prefix Sums:** Compute array `prefix` for $O(1)$ subarray sum queries.
2. **Next Greater Element (NGE):** Using a monotonic stack from right to left, find the index of the next element strictly greater than `nums[i]`.
3. **Binary Lifting Tables:**
   - In subarray $[l \dots r]$, the prefix maximum starting at $l$ remains `nums[l]` until index $\min(nge[l], r + 1)$.
   - Then the maximum jumps to `nums[nge[l]]`.
   - Precompute binary lifting tables:
     - `jump[p][i]`: The element reached after $2^p$ NGE jumps from $i$.
     - `sum[p][i]`: The total contribution $\sum 	ext{prefix\_max}$ across those jumps.
4. **$O(\log N)$ Cost Calculation:** Using the binary lifting tables, compute $\sum_{i=l}^r \max$ in $O(\log N)$ time by leaping through whole blocks.
5. **Counting Valid Subarrays:**
   - For each right endpoint $r \in [0 \dots n-1]$, binary search for the minimal $l \in [0 \dots r]$ with $	ext{cost}(l, r) \le k$.
   - Accumulate $r - l + 1$ into `answer`.
6. Return `answer`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log^2 N)$ — Binary search over $l$ takes $O(\log N)$ queries, each evaluating cost in $O(\log N)$ via binary lifting.
- **Space Complexity:** $O(N \log N)$ to store the binary lifting tables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3420count-non-decreasing-subarrays-after-k-operations.java](./3420count-non-decreasing-subarrays-after-k-operations.java) |

---

## Key Learnings

- Range prefix maximum sums can be computed dynamically in $O(\log N)$ using monotonic stacks combined with tree doubling / binary lifting.
- Monotonicity of cost functions across sliding window boundaries enables binary search over valid endpoints.
