---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Sorting
  - Heap (Priority Queue)
---

# 2542. Maximum Subsequence Score

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-subsequence-score/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2542` (`2542`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integer arrays `nums1` and `nums2` of equal length `n`, and a positive integer `k`.

You must select a subsequence of indices `(i_0, i_1, ..., i_{k-1})` of length `k`. The score of your selection is calculated as the sum of elements selected from `nums1` multiplied by the minimum element selected from `nums2`:

$$\text{Score} = \left( \sum_{j=0}^{k-1} nums1[i_j] \right) \times \min_{0 \le j < k} (nums2[i_j])$$

Return the maximum possible score among all valid subsequences of length `k`.

---

## Examples

### Example 1

```text
Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12
Explanation:
The four possible subsequence scores are:
- We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
- We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6.
- We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12.
- We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
Therefore, we return the max score, which is 12.
```

### Example 2

```text
Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
Output: 30
Explanation:
Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible score.
```

---

## Constraints

- `n == nums1.length == nums2.length`

- `1 <= n <= 10^5`

- `0 <= nums1[i], nums2[j] <= 10^5`

- `1 <= k <= n`

---

## Problem Understanding

We need to choose exactly `k` indices to maximize `sum(nums1) * min(nums2)`. Because the multiplier is determined solely by the minimum value chosen in `nums2`, if we fix `nums2[i]` as the minimum multiplier, all other chosen `k - 1` elements must have their `nums2` values greater than or equal to `nums2[i]`. To maximize the product, we should pick the `k - 1` largest available `nums1` values among those whose `nums2` values are $\ge nums2[i]$. Notice `n` can be up to $10^5$ and values up to $10^5$, meaning the maximum score can exceed standard 32-bit integer limits, requiring 64-bit integer (`long`) calculations.

---

## Approach

### Brute Force Approach

A naive approach generates all $\binom{n}{k}$ possible index combinations of size `k`. For each combination, it sums the corresponding elements of `nums1` and finds the minimum among the corresponding elements in `nums2`, computing their product. For $n = 10^5$, generating all combinations requires $O(\binom{n}{k} \cdot k)$ operations, which is completely intractable and results in Time Limit Exceeded.

### Optimized Approach

Sort the pairs `(nums1[i], nums2[i])` in descending order of `nums2[i]`. As we iterate through the sorted pairs, the current element's `nums2` value can be treated as the minimum `nums2` value among all elements considered so far. We maintain a min-heap of size `k` holding the largest `nums1` values encountered. When the heap reaches size `k`, we evaluate the candidate score `sum * nums[i][1]` and update `ans`, then remove the smallest element from the heap to keep room for future candidates.

### Step-by-Step Thinking Process

1. Deconstruct the objective: `Score = sum(nums1) * min(nums2)`. The `min(nums2)` factor is difficult to optimize simultaneously with `sum(nums1)` unless we fix one of them.
2. If we sort pairs `(nums1[i], nums2[i])` in descending order by `nums2[i]`, any element at index `i` is guaranteed to be $\le$ all previous `nums2` values. Thus, if `nums2[i]` is the minimum in our selection, we can choose any `k - 1` elements from indices `0` to `i - 1`.
3. To maximize the sum of `nums1`, we greedily want the largest `k` values of `nums1` available up to index `i`.
4. A min-heap of size `k` allows us to maintain the running top-`k` sum in $O(\log k)$ time per element: push `nums[i][0]`, add to running sum `s`, and when heap size hits `k`, calculate `s * nums[i][1]` and pop the minimum element.

### Algorithm / Intuition

We package elements into a 2D array `nums` where `nums[i] = {nums1[i], nums2[i]}` and sort it descending by `nums2` (`(a, b) -> b[1] - a[1]`). We maintain running sum `s` and a `PriorityQueue<Integer> q` acting as a min-heap. For each pair `nums[i]`, we add `nums[i][0]` to `s` and push it to `q`. When `q.size() == k`, the top `k` elements in the heap represent the best possible `nums1` sum where `nums[i][1]` serves as the guaranteed minimum in `nums2`. We record `ans = Math.max(ans, s * nums[i][1])` and then call `s -= q.poll()` to discard the smallest `nums1` value, maintaining `k - 1` elements in `q` for subsequent iterations.

---

## Dry Run

Trace with Example 1: `nums1 = [1,3,3,2]`, `nums2 = [2,1,3,4]`, `k = 3`.
Pairs `(nums1, nums2)`: `[(1,2), (3,1), (3,3), (2,4)]`.
Sorted descending by `nums2`: `[(2,4), (3,3), (1,2), (3,1)]`.
- `i = 0`: Pair `(2,4)`. `s = 0 + 2 = 2`. Push `2` to `q = [2]`. Size = 1 < 3.
- `i = 1`: Pair `(3,3)`. `s = 2 + 3 = 5`. Push `3` to `q = [2, 3]`. Size = 2 < 3.
- `i = 2`: Pair `(1,2)`. `s = 5 + 1 = 6`. Push `1` to `q = [1, 2, 3]`. Size = 3 == `k`:
  - Candidate score: `s * nums[2][1] = 6 * 2 = 12`.
  - `ans = max(0, 12) = 12`.
  - Poll smallest element `1`: `s = 6 - 1 = 5`, `q = [2, 3]`.
- `i = 3`: Pair `(3,1)`. `s = 5 + 3 = 8`. Push `3` to `q = [2, 3, 3]`. Size = 3 == `k`:
  - Candidate score: `s * nums[3][1] = 8 * 1 = 8`.
  - `ans = max(12, 8) = 12`.
  - Poll smallest element `2`: `s = 8 - 2 = 6`, `q = [3, 3]`.
Final returned `ans = 12`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Creating the paired array takes `O(n)`. Sorting the pairs takes `O(n log n)`. Iterating through the `n` pairs and maintaining a min-heap of size at most `k` takes `O(n log k)`. Thus, the overall time complexity is dominated by `O(n log n)`.
- **Space Complexity:** `O(n)` — Storing the paired array `nums` requires `O(n)` auxiliary memory, and the priority queue `q` requires `O(k)` space, where `k <= n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2542maximum-subsequence-score.java](./2542maximum-subsequence-score.java) |

---

## Key Learnings

- When maximizing a product involving both a sum and an extreme value (min/max), sort by the extreme value to eliminate one degree of variability.
- A min-heap of fixed size `k` is the optimal data structure to maintain a running top-`k` sum over a dynamically sliding set of candidates.
- Always use 64-bit integer types (`long` in Java) for intermediate and final products when inputs can sum to $10^{10}$ or higher.
