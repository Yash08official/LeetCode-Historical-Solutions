---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Matrix
  - Prefix Sum
  - Ordered Set
---

# 363. Max Sum of Rectangle No Larger Than K

**[View Problem on LeetCode](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0363` (`363`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Matrix`, `Prefix Sum`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

Given an `m x n` integer matrix `matrix` and an integer `k`, find and return the maximum sum of any axis-aligned rectangular submatrix whose sum does not exceed `k`.

It is guaranteed that at least one valid non-empty rectangle with sum `<= k` exists.

---

## Examples

### Example 1

```text
Input: matrix = [[1,0,1],[0,-2,3]], k = 2
Output: 2
Explanation: Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, and 2 is the max number no larger than k (k = 2).
```

### Example 2

```text
Input: matrix = [[2,2,-1]], k = 3
Output: 3
```

---

## Constraints

- `m == matrix.length`

- `n == matrix[i].length`

- `1 <= m, n <= 100`

- `-100 <= matrix[i][j] <= 100`

- `-10^5 <= k <= 10^5`

---

## Follow-up Questions

What if the number of rows is much larger than the number of columns?

If the number of rows `m` is much larger than the number of columns `n` (`m >> n`), our `O(m^2 * n log n)` loop over row pairs becomes expensive because `m^2` is huge. In that scenario, simply swap the roles of rows and columns: iterate over all column pairs `(leftCol, rightCol)` (`O(n^2)` pairs), accumulate row sums into an array of size `m`, and run the `TreeSet` prefix-sum scan down the `m` rows in `O(n^2 * m log m)` time. Checking `m > n` first achieves `O(min(m, n)^2 * max(m, n) log max(m, n))`.

---

## Problem Understanding

A rectangle is uniquely defined by a top row `i`, a bottom row `j` (`0 <= i <= j < m`), a left column `l`, and a right column `r` (`0 <= l <= r < n`). Notice that matrix entries can be negative (`-100 <= matrix[i][j] <= 100`) and `k` can also be negative, so standard Kadane's algorithm or sliding window alone cannot enforce an upper cap `<= k`.

Key observations:
- Fixing the top row `i` and bottom row `j` collapses the 2D strip `matrix[i..j][0..n-1]` into a 1D array `nums` of length `n`, where `nums[h]` is the column sum from row `i` to row `j`.
- On 1D `nums`, a contiguous subarray `[l..r]` has sum `s_r - s_{l-1}`. Requiring `s_r - s_{l-1} <= k` rearranges to `s_{l-1} >= s_r - k`. To maximize `s_r - s_{l-1}`, we want the **smallest** previous prefix sum `y = s_{l-1}` that is `>= s_r - k`!

---

## Approach

### Brute Force Approach

Enumerating every possible top-left `(i, l)` and bottom-right `(j, r)` corner and summing the submatrix via a 2D prefix sum table checks `O(m^2 * n^2)` rectangles in `O(1)` each.

With `m, n <= 100`, `m^2 * n^2` reaches `10^8` rectangle checks (with four indices and boundary conditions), which is suboptimal compared to binary-searching prefix sums.

### Optimized Approach

We compress every row range `[i, j]` (`0 <= i <= j < m`) incrementally into a 1D column-sum array `nums` of size `n`. For each compressed array, we sweep across its running prefix sum `s` while storing prior prefix sums in a `TreeSet<Integer> ts`, querying `ts.ceiling(s - k)` in `O(log n)` time to find the best matching left boundary.

### Step-by-Step Thinking Process

1. Initialize `ans = -(1 << 30)` (`-inf`) to track the best valid sum.
2. Loop top row `i` from `0` to `m - 1` and allocate a fresh `int[] nums = new int[n]`.
3. Loop bottom row `j` from `i` to `m - 1`, adding `matrix[j][h]` into `nums[h]` for every column `h` in `0..n - 1`.
4. Create a `TreeSet<Integer> ts` containing `0` (representing an empty prefix before column `0`) and set running prefix sum `s = 0`.
5. For each column sum `x` in `nums`, advance `s += x`, look up `Integer y = ts.ceiling(s - k)`, update `ans = Math.max(ans, s - y)` if `y != null`, and insert `s` into `ts`.

### Algorithm / Intuition

Adding `0` to `ts` before scanning `nums` ensures rectangles starting at column `0` (`s - 0 <= k`) are naturally considered without special cases.

At each column, `s` is the prefix sum of `nums[0..col]`. Any earlier prefix sum `y` already in `ts` forms a non-empty column range whose rectangle sum is `s - y`. Because `y = ts.ceiling(s - k)` returns the least element in `ts` satisfying `y >= s - k`, `s - y` is guaranteed to be `<= k` and as large as possible among all rectangles ending at the current column within row strip `[i, j]`.

---

## Dry Run

Tracing `maxSumSubmatrix([[1, 0, 1], [0, -2, 3]], 2)` (**Example 1**, `m = 2, n = 3, k = 2`):

- **Row strip `i = 0, j = 0`:** `nums = [1, 0, 1]`, `ts = {0}`
  - `x = 1`: `s = 1`, `ts.ceiling(1 - 2 = -1) = 0` -> `ans = max(-inf, 1 - 0) = 1`, `ts = {0, 1}`
  - `x = 0`: `s = 1`, `ts.ceiling(-1) = 0` -> `ans = max(1, 1) = 1`, `ts = {0, 1}`
  - `x = 1`: `s = 2`, `ts.ceiling(2 - 2 = 0) = 0` -> `ans = max(1, 2 - 0) = 2`, `ts = {0, 1, 2}`
- **Row strip `i = 0, j = 1`:** `nums = [1, -2, 4]`, `ts = {0}`
  - `x = 1`: `s = 1`, `ts.ceiling(-1) = 0` -> `s - y = 1`, `ts = {0, 1}`
  - `x = -2`: `s = -1`, `ts.ceiling(-3) = 0` -> `s - y = -1`, `ts = {-1, 0, 1}`
  - `x = 4`: `s = 3`, `ts.ceiling(3 - 2 = 1) = 1` -> `s - y = 3 - 1 = 2` (submatrix `[[0, 1], [-2, 3]]`), `ans = 2`, `ts = {-1, 0, 1, 3}`
- **Row strip `i = 1, j = 1`:** `nums = [0, -2, 3]` -> max valid sum `<= 2` is `1` (`[-2, 3]`).

Final result: `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(m^2 * n log n)` — There are `m(m + 1) / 2` row pairs `(i, j)`, and for each pair we iterate over `n` columns performing `O(log n)` `TreeSet` operations (`ceiling` and `add`).
- **Space Complexity:** `O(n)` — `nums` holds `n` column sums and `ts` stores at most `n + 1` prefix sums at any time.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [363max-sum-of-rectangle-no-larger-than-k.java](./363max-sum-of-rectangle-no-larger-than-k.java) |

---

## Key Learnings

- Compressing 2D row strips `[i..j]` into a 1D column-sum array is a standard technique that reduces 2D submatrix sum problems into 1D subarray problems.
- Whenever subarray sums have an upper bound `<= k` in the presence of negative numbers, rewrite `prefix[r] - prefix[l] <= k` as `prefix[l] >= prefix[r] - k` and query an ordered set's `ceiling`.
- Always seed the prefix-sum set with `0` before scanning so subarrays starting at index `0` are handled uniformly.
