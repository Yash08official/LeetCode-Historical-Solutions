---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Binary Search
  - Greedy
  - Number Theory
---

# 2601. Prime Subtraction Operation

**[View Problem on LeetCode](https://leetcode.com/problems/prime-subtraction-operation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2601` (`2601`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Binary Search`, `Greedy`, `Number Theory` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed integer array `nums` of length `n`.

You can perform the following operation on `nums` any number of times:
- Pick an index `i` that you have not picked before, and pick a prime number `p` that is **strictly less than** `nums[i]`.
- Subtract `p` from `nums[i]` (i.e., `nums[i] = nums[i] - p`).

Return `true` if you can make `nums` a **strictly increasing** array using this operation, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: nums = [4,9,6,10]
Output: true
Explanation: In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.
```

### Example 2

```text
Input: nums = [6,8,11,12]
Output: true
Explanation: Initially nums is sorted in strictly increasing order, so we don't need to make any operations.
```

### Example 3

```text
Input: nums = [5,8,3]
Output: false
Explanation: It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.
```

---

## Constraints

- `1 <= nums.length <= 1000`

- `1 <= nums[i] <= 1000`

- `nums.length == n`

---

## Problem Understanding

An array is strictly increasing if `nums[0] < nums[1] < ... < nums[n - 1]`. For each element, we can subtract at most one prime $p < nums[i]$ (meaning $nums[i] - p \ge 1$). Since $nums[i] \le 1000$, the relevant primes are all primes strictly less than 1000. Working backwards from right to left: if the right neighbor $nums[i + 1]$ is fixed, we want $nums[i]$ to be strictly smaller than $nums[i + 1]$. If $nums[i] < nums[i + 1]$ already, no reduction is strictly required at index $i$. If $nums[i] \ge nums[i + 1]$, we must pick a prime $p$ such that $nums[i] - p < nums[i + 1] \iff p > nums[i] - nums[i + 1]$, while keeping $p < nums[i]$.

---

## Approach

### Brute Force Approach

Attempting all possible prime subtractions at each index through backtracking would create a tree with branching factor equal to the number of primes smaller than $nums[i]$ (up to 168 choices per index). For $n = 1000$, this results in an exponential state space $O(168^{1000})$, which is completely impossible.

### Optimized Approach

Precompute all prime numbers up to 1000 into a list `p`. Iterate backwards from `i = n - 2` down to `0`: - If `nums[i] < nums[i + 1]`, it already satisfies the strictly increasing requirement relative to its right neighbor, so continue. - Otherwise, we need $p > nums[i] - nums[i + 1]$. Use binary search (`search`) on `p` to find the smallest prime strictly greater than `nums[i] - nums[i + 1]`. - If no such prime exists or the prime is $\ge nums[i]$ (which would make `nums[i] - p <= 0`), return `false`. - Otherwise, update `nums[i] -= p.get(j)`. If all indices are successfully processed, return `true`.

### Step-by-Step Thinking Process

1. Values in `nums` are $\le 1000$, so the maximum possible prime needed is $< 1000$. Precompute all primes in $[2, 1000]$.
2. Examine elements backwards from $n - 2$ down to 0: $nums[i + 1]$ serves as the ceiling for $nums[i]$.
3. If $nums[i] < nums[i + 1]$, $nums[i]$ already satisfies the condition relative to $nums[i + 1]$.
4. If $nums[i] \ge nums[i + 1]$, we need $nums[i] - p < nums[i + 1]$, which rearranges to $p > nums[i] - nums[i + 1]$.
5. To leave $nums[i]$ as large as possible (or minimize the change), pick the smallest prime $p > nums[i] - nums[i + 1]$.
6. Find this prime via binary search in the precomputed sorted prime list `p`. If this smallest prime is $\ge nums[i]$, then $nums[i]$ cannot be reduced to a positive number, so return `false`.

### Algorithm / Intuition

First, the method generates primes up to 1000 by checking trial division against already found primes and storing them in `List<Integer> p`. The backward loop starts at `n - 2`. If `nums[i] < nums[i + 1]`, it continues immediately. If `nums[i] >= nums[i + 1]`, `search(p, nums[i] - nums[i + 1])` performs a binary search returning the index `j` of the first prime strictly greater than `nums[i] - nums[i + 1]`. If `j == p.size()` or `p.get(j) >= nums[i]`, it is impossible to make `nums[i] < nums[i + 1]` with a positive remainder, returning `false`. Otherwise, it subtracts `p.get(j)` from `nums[i]` and proceeds.

---

## Dry Run

Trace with Example 1: `nums = [4,9,6,10]`.
- Primes in `p`: `[2, 3, 5, 7, 11, 13, 17, ...]`.
- `i = 2`: `nums[2] = 6`, `nums[3] = 10`. `6 < 10` is true -> `continue`.
- `i = 1`: `nums[1] = 9`, `nums[2] = 6`. `9 < 6` is false.
  - Need prime $> 9 - 6 = 3$.
  - `search(p, 3)`: first prime $> 3$ is 5 at index `j = 2`.
  - `5 < nums[1] (9)` is true.
  - `nums[1] = 9 - 5 = 4`.
- `i = 0`: `nums[0] = 4`, `nums[1] = 4`. `4 < 4` is false.
  - Need prime $> 4 - 4 = 0$.
  - `search(p, 0)`: first prime $> 0$ is 2 at index `j = 0`.
  - `2 < nums[0] (4)` is true.
  - `nums[0] = 4 - 2 = 2`.
- Loop completes. Result array is `[2, 4, 6, 10]`, which is strictly increasing.
Return `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(M sqrt(M) + n log(pi(M)))` where `M = 1000` is the upper limit for primes and $\pi(M) = 168$ is the number of primes up to 1000. Generating primes takes $O(M \sqrt{M}) \approx 3 \times 10^4$ operations. The loop runs $n$ times with a binary search over 168 primes ($O(\log 168) \approx 8$ operations). Overall time is under a few milliseconds.
- **Space Complexity:** `O(pi(M))` — Stores the 168 prime numbers $\le 1000$ in the `p` list.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2601prime-subtraction-operation.java](./2601prime-subtraction-operation.java) |

---

## Key Learnings

- Small value bounds ($nums[i] \le 1000$) permit generating all relevant primes once up front.
- Working backwards allows you to treat the next element as a concrete ceiling when finding the minimally necessary prime reduction.
- Binary search on the prime list quickly identifies the smallest prime satisfying the strictly greater condition.
