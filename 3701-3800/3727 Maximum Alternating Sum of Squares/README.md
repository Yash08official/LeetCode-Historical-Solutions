---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Sorting
---

# 3727. Maximum Alternating Sum of Squares

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-alternating-sum-of-squares/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3727` (`3727`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`. You are permitted to **rearrange its elements** in any order you choose.

The **alternating score** of an array `arr` of length `n` is defined as:
`score = arr[0]^2 - arr[1]^2 + arr[2]^2 - arr[3]^2 + ...`

where terms alternate signs: elements at even indices (`0, 2, 4, ...`) are added, and elements at odd indices (`1, 3, 5, ...`) are subtracted.

Return the **maximum possible alternating score** achievable by rearranging the elements of `nums`.

---

## Examples

### Example 1

**Input:** `nums = [1,2,3]`

**Output:** `12`

**Explanation:**

A possible rearrangement for `nums` is `[2,1,3]`, which gives the maximum alternating score among all possible rearrangements.

The alternating score is calculated as:

`score = 2^2 - 1^2 + 3^2 = 4 - 1 + 9 = 12`

### Example 2

**Input:** `nums = [1,-1,2,-2,3,-3]`

**Output:** `16`

**Explanation:**

A possible rearrangement for `nums` is `[-3,-1,-2,1,3,2]`, which gives the maximum alternating score among all possible rearrangements.

The alternating score is calculated as:

`score = (-3)^2 - (-1)^2 + (-2)^2 - (1)^2 + (3)^2 - (2)^2 = 9 - 1 + 4 - 1 + 9 - 4 = 16`

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-4 * 10^4 <= nums[i] <= 4 * 10^4`

---

## Problem Understanding

Key observations and mathematical properties:
1. **Index Parity and Sign Counts**:
   - In any permutation of length `n`, there are exactly `ceil(n / 2)` elements placed at even indices (positive contribution) and `floor(n / 2)` elements placed at odd indices (negative contribution).
2. **Square Values Are Non-Negative**:
   - For any integer `x`, `x^2 >= 0`. The actual sign of `nums[i]` does not matter; only `nums[i]^2` determines the magnitude.
3. **Greedy Assignment**:
   - To maximize `sum(positive terms) - sum(negative terms)`, we should greedily assign the largest square values to the positive positions and the smallest square values to the negative positions.
   - Since we can freely choose any permutation, any partition of the `n` squares into `ceil(n / 2)` positive and `floor(n / 2)` negative elements is achievable.

---

## Approach

### Brute Force Approach

A brute-force solution would generate all `n!` permutations of `nums`, compute the alternating score for each permutation, and track the maximum score.
Since `n <= 10^5`, testing `n!` permutations is computationally impossible (even `10! = 3.6 * 10^6`, while `10^5! >> 10^(10^5)`), leading to immediate timeout.

### Optimized Approach

The implemented solution applies a **greedy sorting** strategy:
1. Compute the square of each element as a 64-bit integer: `squares[i] = (long) nums[i] * nums[i]`.
2. Sort `squares` in non-decreasing order.
3. Use a two-pointer approach:
   - `left = 0` points to the smallest unused square.
   - `right = n - 1` points to the largest unused square.
   - While `left < right`: pair `squares[right]` (positive sign) with `squares[left]` (negative sign) and add `squares[right] - squares[left]` to `ans`, then increment `left` and decrement `right`.
   - If `left == right` (when `n` is odd): the remaining single middle element gets a positive sign, so add `squares[left]` to `ans`.
4. Return `ans`.

### Step-by-Step Thinking Process

1. Express the objective algebraically: `Score = sum_{i even} arr[i]^2 - sum_{i odd} arr[i]^2`.
2. Recognize that any selection of `ceil(n / 2)` elements for even indices and `floor(n / 2)` elements for odd indices can be arranged into a valid alternating sequence.
3. To maximize this difference, by rearrangement inequality / greedy choice, the largest `ceil(n / 2)` squares must be positive and the remaining `floor(n / 2)` smallest squares must be negative.
4. Square all numbers, sort them in ascending order, and pair each largest element from the right with the smallest from the left.
5. Handle the odd length case where the lone unpaired element has a positive sign.

### Algorithm / Intuition

In `Solution.maxAlternatingSum`:
- `squares[i] = (long) nums[i] * nums[i]` squares each value, casting to `long` before multiplication to avoid 32-bit integer overflow (since `nums[i] <= 4 * 10^4`, `nums[i]^2` can reach `1.6 * 10^9`, which fits in 32-bit int, but accumulation across `10^5` elements reaches `~1.6 * 10^14`, requiring `long` for `ans`).
- `Arrays.sort(squares)` orders the squared values from smallest to largest in `O(n log n)`.
- The two-pointer loop pairs the `k`-th largest square `squares[n - 1 - k]` with the `k`-th smallest square `squares[k]`, directly computing the net positive gain `squares[right] - squares[left]`.
- The parity check `if (left == right)` correctly handles the `n % 2 == 1` scenario by adding the median square with a positive sign.

---

## Dry Run

Consider `nums = [1, 2, 3]`:

1. **Calculate squares**:
   - `squares = [1^2, 2^2, 3^2] = [1, 4, 9]`.
2. **Sort**:
   - `squares` sorted: `[1, 4, 9]`.
3. **Two-pointer traversal (`left = 0`, `right = 2`, `ans = 0`)**:
   - Loop iteration 1 (`left < right`):
     - `ans += squares[2] - squares[0] = 9 - 1 = 8`.
     - `right` becomes 1, `left` becomes 1.
   - Loop ends because `left == right == 1`.
4. **Middle element**:
   - `left == right`: `ans += squares[1] = 8 + 4 = 12`.
5. Return `ans = 12`.
   - Optimal rearrangement: `[2, 1, 3]` -> `2^2 - 1^2 + 3^2 = 4 - 1 + 9 = 12`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Computing squares takes `O(n)` time, sorting the `squares` array of length `n` takes `O(n log n)` time using Dual-Pivot Quicksort, and the two-pointer pass takes `O(n)` time.
- **Space Complexity:** `O(n)` — A separate `long[] squares` array of size `n` is allocated to hold the squared values.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3727maximum-alternating-sum-of-squares.java](./3727maximum-alternating-sum-of-squares.java) |

---

## Key Learnings

- In alternating sum maximization with freedom of rearrangement, partition the elements into two disjoint halves: the largest values with positive signs and the smallest values with negative signs.
- Sign independence: squaring eliminates original negative signs, so sorting the squared values directly solves the assignment.
- Always use 64-bit integer types (`long`) when accumulating squares over arrays of length up to `10^5`.
