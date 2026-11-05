---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Sliding Window
  - Prefix Sum
---

# 689. Maximum Sum of 3 Non-Overlapping Subarrays

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0689` (`689`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Sliding Window`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` and a positive integer `k`. Your task is to choose three non-overlapping contiguous subarrays, each of exact length `k`, such that the combined sum of all elements across the three subarrays is maximized.

Return an integer array of length `3` containing the **0-indexed** starting positions of the three chosen subarrays in increasing order. If multiple combinations achieve the same maximum total sum, return the **lexicographically smallest** starting index triplet.

---

## Examples

### Example 1

```text
Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
```

### Example 2

```text
Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
Output: [0,2,4]
```

---

## Constraints

- `1 <= nums.length <= 2 * 10^4`

- `1 <= nums[i] < 2^16`

- `1 <= k <= floor(nums.length / 3)`

---

## Problem Understanding

- Every valid triplet of starting indices `(i1, i2, i3)` must satisfy `0 <= i1`, `i1 + k <= i2`, `i2 + k <= i3`, and `i3 + k <= nums.length` so that none of the length-`k` intervals overlap.
- All elements in `nums` are strictly positive (`1 <= nums[i] < 2^16`), and `3 * k <= nums.length`, ensuring at least one valid triplet always exists.
- Lexicographical tie-breaking means we only replace a recorded best sum when a candidate achieves a **strictly greater** sum (`>`), naturally preserving the earliest indices.

---

## Approach

### Brute Force Approach

A naive approach enumerates all valid starting index triplets `(i1, i2, i3)` with `i2 >= i1 + k` and `i3 >= i2 + k`, computing the sum of the three length-`k` subarrays for each triplet. Even with precomputed prefix sums for `O(1)` range sum queries, checking all `O(n^3)` triplets takes `O(n^3)` time, which easily exceeds the time limit for `n <= 2 * 10^4`.

### Optimized Approach

Maintain **three simultaneous sliding windows** of length `k` positioned consecutively (`[i - 3k + 1 .. i - 2k]`, `[i - 2k + 1 .. i - k]`, and `[i - k + 1 .. i]`) in a single pass, dynamically tracking the best 1-window sum (`mx1`), best 2-window sum (`mx12`), and best 3-window total sum (`s`) along with their optimal starting indices.

### Step-by-Step Thinking Process

1. Notice that if the third window ends at index `i`, the latest possible end index for the second non-overlapping window is `i - k`, and when that second window ends at `i - k`, the latest possible end index for the first window is `i - 2k`.
2. Instead of precomputing prefix/suffix DP arrays in multiple passes, we can slide three adjacent windows of size `k` in lockstep as `i` advances from `2k` to `nums.length - 1`.
3. Once the windows reach full length `k` (at `i >= 3k - 1`), `s1` holds the sum of the first window starting at `i - 3k + 1`, `s2` holds the second window starting at `i - 2k + 1`, and `s3` holds the third window starting at `i - k + 1`.
4. Update `mx1` (best single window seen so far) using `s1 > mx1`, then update `mx12` (best non-overlapping pair seen so far) using `mx1 + s2 > mx12`, and finally update the overall best triplet `s` using `mx12 + s3 > s`.
5. Because updates occur in order (`mx1` -> `mx12` -> `s`) at every step, `mx1` only includes first windows that finish at or before `i - 2k` (disjoint from `s2`), and `mx12` only includes pairs whose second window finishes at or before `i - k` (disjoint from `s3`). Strict `>` comparisons guarantee lexicographically smallest indices.

### Algorithm / Intuition

In `maxSumOfThreeSubarrays`, the loop starts at `i = k * 2` and accumulates three window sums in parallel:
- `s1` accumulates elements at `i - 2*k` (first window),
- `s2` accumulates elements at `i - k` (second window),
- `s3` accumulates elements at `i` (third window).

Once `i >= k * 3 - 1`, all three windows contain `k` elements:
1. If `s1 > mx1`, we update `mx1 = s1` and record its start index `idx1 = i - k * 3 + 1`.
2. If `mx1 + s2 > mx12`, combining the best prior first window (`idx1`) with the current second window (`i - k * 2 + 1`) yields a strictly better two-subarray sum, so we update `mx12`, `idx121 = idx1`, and `idx122 = i - k * 2 + 1`.
3. If `mx12 + s3 > s`, combining the best prior non-overlapping pair (`idx121`, `idx122`) with the current third window (`i - k + 1`) yields a strictly better three-subarray sum, updating `s` and `ans = {idx121, idx122, i - k + 1}`.

Finally, the leftmost element of each window (`nums[i - 3k + 1]`, `nums[i - 2k + 1]`, `nums[i - k + 1]`) is subtracted so the windows are ready for `i + 1`.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 2, 1, 2, 6, 7, 5, 1]`, `k = 2` (`k * 2 = 4`, `k * 3 - 1 = 5`).

| `i` | Added (`s1, s2, s3`) | `mx1` (`idx1`) | `mx12` (`idx121, idx122`) | `s` (`ans`) | Outgoing Subtracted |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4` | `s1=1, s2=1, s3=6` | `0 (0)` | `0 (0, 0)` | `0 ([0,0,0])` | *(window size < 2)* |
| `5` | `s1=3, s2=3, s3=13` | `3 (0)` | `6 (0, 2)` | `19 ([0,2,4])` | `s1-=1(2), s2-=1(2), s3-=6(7)` |
| `6` | `s1=3, s2=8, s3=12` | `3 (0)` *(tie kept)* | `11 (0, 3)` | `23 ([0,3,5])` | `s1-=2(1), s2-=2(6), s3-=7(5)` |
| `7` | `s1=3, s2=13, s3=6` | `3 (0)` *(tie kept)* | `16 (0, 4)` | `23 ([0,3,5])` *(`22 <= 23`)* | `s1-=1(2), s2-=6(7), s3-=5(1)` |

The method returns `[0, 3, 5]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The loop runs `n - 2k` times (where `n = nums.length`), performing only constant-time arithmetic and comparisons per step.
- **Space Complexity:** `O(1)` — Only a fixed number of scalar tracking variables and the 3-element output array `ans` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [689maximum-sum-of-3-non-overlapping-subarrays.java](./689maximum-sum-of-3-non-overlapping-subarrays.java) |

---

## Key Learnings

- Sliding three staggered windows of size `k` in lockstep eliminates auxiliary prefix-sum and DP tables, solving the problem in one pass with `O(1)` space.
- Chaining DP state transitions (`mx1` -> `mx12` -> `s`) naturally enforces non-overlapping boundaries without nested loops.
- Using strict inequality (`>`) when updating running maxima automatically preserves lexicographically smallest indices on ties.
