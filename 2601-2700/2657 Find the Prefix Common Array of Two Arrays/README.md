---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Bit Manipulation
---

# 2657. Find the Prefix Common Array of Two Arrays

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2657` (`2657`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given two **0-indexed** integer permutations `A` and `B` of length `n`, both containing all integers from `1` to `n`.

A **prefix common array** of `A` and `B` is an array `C` of length `n` where `C[i]` equals the count of numbers that are present at or before index `i` in both `A` and `B`.

Return the prefix common array `C` of `A` and `B`.

---

## Examples

### Example 1

```text
Input: A = [1,3,2,4], B = [3,1,2,4]
Output: [0,2,3,4]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: 1 and 3 are common in A and B, so C[1] = 2.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.
```

### Example 2

```text
Input: A = [2,3,1], B = [3,1,2]
Output: [0,1,3]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: only 3 is common in A and B, so C[1] = 1.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
```

---

## Constraints

- `1 <= A.length == B.length == n <= 50`

- `1 <= A[i], B[i] <= n`

- `It is guaranteed that A and B are both a permutation of n integers.`

---

## Problem Understanding

We need to compute the size of the intersection of prefixes `A[0..i]` and `B[0..i]` for each index `i` from `0` to `n - 1`.

Key properties:
- `A` and `B` are permutations of `1` to `n`. Each number from `1` to `n` appears exactly once in `A` and once in `B`.
- A number `x` is in the prefix common set at index `i` if and only if `x` has appeared in `A[0..i]` AND `x` has appeared in `B[0..i]`.
- The count `C[i]` is monotonically non-decreasing as `i` increases, ending at `C[n - 1] = n`.

---

## Approach

### Brute Force Approach

A brute force approach would convert the prefixes `A[0..i]` and `B[0..i]` into sets for every `i`, then compute set intersection size.

Creating sets and intersecting them for each prefix takes `O(i)` time per index, leading to `O(n^2)` time overall and allocating multiple temporary sets.

### Optimized Approach

The implemented approach maintains running frequency counts `cnt1` and `cnt2` of size `n + 1`.

For each index `i` from `0` to `n - 1`:
1. Increment the frequency of `A[i]` in `cnt1` and `B[i]` in `cnt2`.
2. Iterate `j` from `1` to `n` and add `Math.min(cnt1[j], cnt2[j])` to `ans[i]`.
3. Return the populated array `ans`.

### Step-by-Step Thinking Process

1. We need to count how many numbers between `1` and `n` appear in both `A[0..i]` and `B[0..i]`.
2. Track the frequencies of numbers seen so far in `A` and `B` using two count arrays `cnt1` and `cnt2` of size `n + 1`.
3. As we advance `i`, increment `cnt1[A[i]]` and `cnt2[B[i]]`.
4. For index `i`, any number `j` that has appeared in both prefixes satisfies `cnt1[j] >= 1` and `cnt2[j] >= 1`. Therefore, `Math.min(cnt1[j], cnt2[j])` equals 1 if present in both, and 0 otherwise.
5. Sum `Math.min(cnt1[j], cnt2[j])` for all `j` from `1` to `n` and assign to `ans[i]`.

### Algorithm / Intuition

The algorithm tracks cumulative element occurrences via frequency arrays:

1. `cnt1[x]` indicates whether `x` has appeared in `A[0..i]`.
2. `cnt2[x]` indicates whether `x` has appeared in `B[0..i]`.
3. At step `i`, `A[i]` and `B[i]` are marked in `cnt1` and `cnt2`.
4. The inner loop sums `Math.min(cnt1[j], cnt2[j])` over all `j \in [1, n]`. Since each number appears at most once in a permutation prefix, `Math.min` is 1 if `j` is present in both prefixes and 0 otherwise.
5. Storing this sum in `ans[i]` records the prefix common count.

---

## Dry Run

Trace for `A = [1, 3, 2, 4]`, `B = [3, 1, 2, 4]`, `n = 4`:

- **i = 0:** `A[0] = 1`, `B[0] = 3`.
  - `cnt1[1] = 1`, `cnt2[3] = 1`.
  - `j = 1..4`: `Math.min(cnt1[j], cnt2[j]) = 0` for all `j`.
  - `ans[0] = 0`.
- **i = 1:** `A[1] = 3`, `B[1] = 1`.
  - `cnt1[3] = 1`, `cnt2[1] = 1`.
  - For `j = 1`: `min(1, 1) = 1`.
  - For `j = 3`: `min(1, 1) = 1`.
  - `ans[1] = 1 + 1 = 2`.
- **i = 2:** `A[2] = 2`, `B[2] = 2`.
  - `cnt1[2] = 1`, `cnt2[2] = 1`.
  - Common elements: `1, 2, 3` -> `ans[2] = 3`.
- **i = 3:** `A[3] = 4`, `B[3] = 4`.
  - `cnt1[4] = 1`, `cnt2[4] = 1`.
  - Common elements: `1, 2, 3, 4` -> `ans[3] = 4`.
- **Result:** `[0, 2, 3, 4]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — The outer loop runs `n` times, and the inner loop scans `n` numbers each time. With `n <= 50`, `n^2 <= 2500` operations, executing in under a millisecond.
- **Space Complexity:** `O(n)` — Auxiliary frequency arrays `cnt1` and `cnt2` each take `n + 1` space, and `ans` takes `n` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2657find-the-prefix-common-array-of-two-arrays.java](./2657find-the-prefix-common-array-of-two-arrays.java) |

---

## Key Learnings

- Frequency arrays indexed by values `[1..n]` provide fast constant-time lookup and presence tracking.
- The intersection of multiset indicators corresponds mathematically to `min(cnt1[x], cnt2[x])`.
- For small constraints (`n <= 50`), a simple `O(n^2)` prefix aggregation is completely feasible and simple to implement.
