---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Sorting
  - Heap (Priority Queue)
---

# 2342. Max Sum of a Pair With Equal Sum of Digits

**[View Problem on LeetCode](https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2342` (`2342`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed array `nums` consisting of positive integers. You can choose two distinct indices `i` and `j` such that the sum of digits of `nums[i]` is equal to the sum of digits of `nums[j]`.

Return the maximum possible value of `nums[i] + nums[j]` among all valid pairs `(i, j)`. If no such pair exists, return `-1`.

---

## Examples

### Example 1

```text
Input: nums = [18,43,36,13,7]
Output: 54
Explanation: The pairs (i, j) that satisfy the conditions are:
- (0, 2), both numbers have a sum of digits equal to 9, and their sum is 18 + 36 = 54.
- (1, 4), both numbers have a sum of digits equal to 7, and their sum is 43 + 7 = 50.
So the maximum sum that we can obtain is 54.
```

### Example 2

```text
Input: nums = [10,12,19,14]
Output: -1
Explanation: There are no two numbers that satisfy the conditions, so we return -1.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

---

## Problem Understanding

Key observations and constraints:
- `1 <= nums.length <= 10^5` and `1 <= nums[i] <= 10^9`.
- The maximum possible value of `nums[i]` is `10^9`. The integer with the largest digit sum within this range is `999,999,999`, which has a digit sum of `9 * 9 = 81`.
- Hence, the digit sum for any element in `nums` is strictly between `1` and `81`.
- Because the range of possible digit sums is so small ($< 100$), we can use a fixed-size integer array `int[] d = new int[100]` to store the maximum number seen so far for each digit sum, avoiding the overhead of hash maps.
- For any digit sum, to maximize the sum of a pair, we only need to pair the current element with the maximum element previously seen having that same digit sum.

---

## Approach

### Brute Force Approach

A brute-force solution checks all possible pairs `(i, j)` with `0 <= i < j < n`. For each pair, it computes the digit sum of both numbers; if they match, it updates the maximum sum. With `n = 10^5`, the total number of pairs is `n * (n - 1) / 2 ~ 5 * 10^9`, which will exceed time limits.

### Optimized Approach

Maintain an array `d` of size `100`, where `d[s]` stores the maximum number seen so far with digit sum `s` (initialized to `0`). Iterate through each number `v` in `nums`:
1. Compute the digit sum `x` of `v`.
2. If `d[x] > 0` (we have previously encountered a number with digit sum `x`), update `ans = max(ans, d[x] + v)`.
3. Update `d[x] = max(d[x], v)` to ensure `d[x]` always holds the highest number with digit sum `x`.
Return `ans`.

### Step-by-Step Thinking Process

1. We need to find two numbers with the same digit sum that maximize their sum.
2. For a given digit sum, the best pair consists of the two largest numbers with that digit sum.
3. Notice that digit sum cannot exceed `81` for integers `<= 10^9`.
4. A static array `d[100]` can map `digit_sum -> max_element_seen` in `O(1)` time.
5. Stream through `nums`: for each number, calculate its digit sum, check for a valid pair with `d[x]`, update answer, and update `d[x]`.

### Algorithm / Intuition

In `Solution.maximumSum`, an array `int[] d = new int[100]` is created and `ans` is initialized to `-1`. For each integer `v` in `nums`, an inner while loop extracts digits via `y % 10` and `y /= 10`, summing them into `x`.

If `d[x] > 0`, it indicates at least one previous number had the same digit sum `x`. We form a pair with that prior maximum and update `ans = Math.max(ans, d[x] + v)`. Then, we update `d[x] = Math.max(d[x], v)` so subsequent numbers with digit sum `x` will pair with the largest available value. After scanning all elements, `ans` holds the maximum pair sum, or `-1` if no valid pair exists.

---

## Dry Run

Consider `nums = [18, 43, 36, 13, 7]`:
- `d` initialized to array of zeros, `ans = -1`.
- `v = 18`: digit sum `x = 1 + 8 = 9`. `d[9] == 0`. Set `d[9] = 18`.
- `v = 43`: digit sum `x = 4 + 3 = 7`. `d[7] == 0`. Set `d[7] = 43`.
- `v = 36`: digit sum `x = 3 + 6 = 9`. `d[9] = 18 > 0` -> `ans = max(-1, 18 + 36) = 54`. Set `d[9] = max(18, 36) = 36`.
- `v = 13`: digit sum `x = 1 + 3 = 4`. `d[4] == 0`. Set `d[4] = 13`.
- `v = 7`: digit sum `x = 7`. `d[7] = 43 > 0` -> `ans = max(54, 43 + 7) = 54`. Set `d[7] = max(43, 7) = 43`.
- Loop ends. Return `ans = 54`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * log10(max_val))` — For each of the `n` numbers, extracting digits takes `log10(v) <= 10` operations. Lookup and updates in `d` take `O(1)`. Overall time is strictly linear `O(n)`.
- **Space Complexity:** `O(1)` — The auxiliary array `d` has a fixed size of 100 elements regardless of `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2342max-sum-of-a-pair-with-equal-sum-of-digits.java](./2342max-sum-of-a-pair-with-equal-sum-of-digits.java) |

---

## Key Learnings

- Mathematical bounds on derived properties (like digit sums $\le 81$) allow using compact fixed-size arrays instead of dynamic hash maps.
- Single-pass streaming: maintaining only the best element seen so far per bucket allows forming and optimizing pairs in `O(1)` per element.
- Zero can serve as a natural sentinel value when elements are strictly positive (`nums[i] >= 1`).
