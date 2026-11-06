---
comments: true
difficulty: Hard
tags:
  - Dynamic Programming
---

# 629. K Inverse Pairs Array

**[View Problem on LeetCode](https://leetcode.com/problems/k-inverse-pairs-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0629` (`629`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

For an integer array `nums`, an **inverse pair** is a pair of integers `[i, j]` where `0 <= i < j < nums.length` and `nums[i] > nums[j]`.

Given two integers `n` and `k`, return the number of different arrays consisting of numbers from `1` to `n` such that there are exactly `k` inverse pairs. Since the answer can be huge, return it **modulo** `10^9 + 7`.

---

## Examples

### Example 1

```text
Input: n = 3, k = 0
Output: 1
Explanation: Only the array [1,2,3] has 0 inverse pairs.
```

### Example 2

```text
Input: n = 3, k = 1
Output: 2
Explanation: The arrays [1,3,2] and [2,1,3] have exactly 1 inverse pair.
```

---

## Constraints

- `1 <= n <= 1000`
- `0 <= k <= 1000`

---

## Problem Understanding

- We need to determine the number of permutations of $\{1, 2, \dots, n\}$ that have exactly $k$ inversions.
- When placing the element $n$ into a valid permutation of size $n - 1$:
  - Placing $n$ at the very end adds $0$ inversions.
  - Placing $n$ at position $n - 2$ adds $1$ inversion.
  - Placing $n$ at the very beginning adds $n - 1$ inversions.
- Hence, the recurrence relation is:
  $$f(n, k) = \sum_{j=0}^{\min(k, n-1)} f(n-1, k-j)$$
- Evaluating this sum directly for each $(n, k)$ takes $O(n^2 k)$ or $O(n k^2)$, which is too slow.
- By using prefix sums of the previous row, the range sum can be calculated in $O(1)$ time.

---

## Approach

### Optimized Approach (1D Dynamic Programming with Prefix Sums)

1. Maintain an array `f` of size $k + 1$, where `f[j]` represents the number of permutations with $j$ inverse pairs.
2. Initialize `f[0] = 1` and all other entries to `0`.
3. For each $i$ from $1$ to $n$:
   - Construct a prefix sum array `s` of length $k + 2$ from `f`, where `s[j + 1] = (s[j] + f[j]) % mod`.
   - Update each `f[j]` in $O(1)$ using:
     $$f[j] = (s[j + 1] - s[\max(0, j - (i - 1))] + mod) \pmod{mod}$$
4. Return `f[k]`.

### Step-by-Step Thinking Process

1. Establish the recurrence relating $f(i, j)$ to $f(i - 1, j - p)$ for $0 \le p \le i - 1$.
2. Recognize that $f(i, j) = \sum_{m = \max(0, j - (i - 1))}^j f(i - 1, m)$ is a contiguous subarray sum of row $i - 1$.
3. Compute prefix sums `s` of the previous layer to reduce the transition cost from $O(i)$ to $O(1)$.
4. Space-optimize from $O(n \cdot k)$ to $O(k)$ by rolling arrays.

### Algorithm / Intuition

Because each choice of position for element $i$ contributes a distinct number of inversions between $0$ and $i - 1$, the transition corresponds to a sliding window sum over the previous distribution.

---

## Dry Run

Tracing $n = 3, k = 1$:
- $i = 1$: `f = [1, 0]`, `s = [0, 1, 1]`
- $i = 2$:
  - $j = 0$: $f[0] = 1$
  - $j = 1$: $f[1] = s[2] - s[0] = 1$
  - `f = [1, 1]`, `s = [0, 1, 2]`
- $i = 3$:
  - $j = 0$: $f[0] = 1$
  - $j = 1$: $f[1] = s[2] - s[0] = 2 - 0 = 2$
- Result: `f[1] = 2` (matching Example 2).

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot k)$ — Two nested loops running $n$ and $k$ iterations with $O(1)$ transitions via prefix sums.
- **Space Complexity:** $O(k)$ — Auxiliary storage of size $O(k)$ for the rolling DP and prefix sum arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [629k-inverse-pairs-array.java](./629k-inverse-pairs-array.java) |

---

## Key Learnings

- Sliding window / prefix sum optimization effectively eliminates the inner summation in DP counting problems.
- Careful handling of negative subtraction under modulo arithmetic ensures consistency without underflow.
