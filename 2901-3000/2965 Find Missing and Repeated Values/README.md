---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Math
  - Matrix
---

# 2965. Find Missing and Repeated Values

**[View Problem on LeetCode](https://leetcode.com/problems/find-missing-and-repeated-values/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2965` (`2965`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Matrix` |
| **Solution Language** | TypeScript |

---

## Problem Description

We are given an `n x n` 2D integer matrix `grid` containing integers in the range `[1, n^2]`. Each integer from `1` to `n^2` appears exactly once in the grid, except for one integer `a` which appears twice (the repeated value) and one integer `b` which does not appear at all (the missing value).

We must return a 0-indexed array `[a, b]` containing the repeated number followed by the missing number.

---

## Examples

### Example 1

```text
Input: grid = [[1,3],[2,2]]
Output: [2,4]
Explanation: Number 2 is repeated and number 4 is missing so the answer is [2,4].
```

### Example 2

```text
Input: grid = [[9,1,7],[8,9,2],[3,4,6]]
Output: [9,5]
Explanation: Number 9 is repeated and number 5 is missing so the answer is [9,5].
```

---

## Constraints

- `2 <= n == grid.length == grid[i].length <= 50`

- `1 <= grid[i][j] <= n * n`

- For all `x` that `1 <= x <= n * n` there is exactly one `x` that is not equal to any of the grid members.

- For all `x` that `1 <= x <= n * n` there is exactly one `x` that is equal to exactly two of the grid members.

- For all `x` that `1 <= x <= n * n` except two of them there is exactly one pair of `i, j` that `0 <= i, j <= n - 1` and `grid[i][j] == x`.

---

## Problem Understanding

Mathematical structure and constraints:
- The grid has `N = n^2` total numbers.
- The expected sum of all numbers from `1` to `N` is `expectedSum = N * (N + 1) / 2`.
- The actual sum of numbers present in the grid is `actualSum = expectedSum + repeated - missing`.
- Rearranging gives: `missing = expectedSum - actualSum + repeated`.
- If we can identify the `repeated` number while traversing the grid (e.g. using a set or frequency table), we can immediately calculate `missing` using arithmetic.

---

## Approach

### Brute Force Approach

A brute-force approach would count frequencies of each number from `1` to `n^2` using an array of size `n^2 + 1` or nested loops searching the grid for every value from `1` to `n^2`. Searching the grid `n^2` times takes `O(n^4)` time, while a frequency array takes `O(n^2)` time and space.

### Optimized Approach

We flatten the 2D grid into a 1D array `nums`. Using a helper class `ArrayWrapper` to compute `actualSum` via `reduce`, we also compute `expectedSum = (n * n * (n * n + 1)) / 2`.
- We initialize `missing = expectedSum - actualSum`.
- We iterate through `nums` maintaining a `Set<number> numSet`.
- When we encounter a number already in `numSet`, we identify `repeated = num`, and adjust `missing += num` (completing the formula `expectedSum - actualSum + repeated`).
- Return `[repeated, missing]`.

### Step-by-Step Thinking Process

1. We need to find two numbers: one duplicate and one missing from `1` to `n^2`.
2. Sum difference formula: `actualSum - expectedSum = repeated - missing`, which means `missing = expectedSum - actualSum + repeated`.
3. Compute `actualSum` and `expectedSum` in `O(n^2)`.
4. Traverse elements and use a hash set to detect the duplicate `repeated`.
5. Once `repeated` is found, `missing` is obtained by simply adding `repeated` to `(expectedSum - actualSum)`.

### Algorithm / Intuition

The solution leverages TypeScript class wrapping and algebraic summation:
1. Flatten the `n x n` grid to a 1D array `nums = grid.flat()`.
2. Wrap `nums` in an `ArrayWrapper` whose `valueOf()` returns the sum `actualSum`.
3. Compute `expectedSum = (n * n * (n * n + 1)) / 2`.
4. Set initial `missing = expectedSum - actualSum`.
5. Iterate through each `num` in `nums`:
   - If `numSet.has(num)`, this is our duplicate: assign `repeated = num` and adjust `missing += num`.
   - Otherwise, `numSet.add(num)`.
6. Return `[repeated, missing]`.

---

## Dry Run

Trace on Example 1: `grid = [[1, 3], [2, 2]]` (`n = 2`)

- Flattened: `nums = [1, 3, 2, 2]`.
- `N = n * n = 4`.
- `expectedSum = (4 * 5) / 2 = 10`.
- `actualSum = 1 + 3 + 2 + 2 = 8`.
- Initial `missing = 10 - 8 = 2`.
- Iterating through `nums` with `numSet`:
  - `num = 1`: not in set, add 1. `numSet = {1}`.
  - `num = 3`: not in set, add 3. `numSet = {1, 3}`.
  - `num = 2`: not in set, add 2. `numSet = {1, 3, 2}`.
  - `num = 2`: already in `numSet`! Duplicate found: `repeated = 2`. Adjust `missing += 2` -> `missing = 2 + 2 = 4`.
- Return `[2, 4]`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n^2) — Flattening the grid, computing the sum, and iterating through all n^2 elements with O(1) set operations takes linear time in the number of elements.
- **Space Complexity:** O(n^2) — Storing the flattened 1D array and the hash set containing up to n^2 elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **TypeScript** | [2965find-missing-and-repeated-values.ts](./2965find-missing-and-repeated-values.ts) |

---

## Key Learnings

- Sum differences cleanly connect missing and repeating elements: `missing = expectedSum - actualSum + repeated`.
- Detecting the repeated element with a Set during the first pass allows computing the missing element without a second lookup pass.
