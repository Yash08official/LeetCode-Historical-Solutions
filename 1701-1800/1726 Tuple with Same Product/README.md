---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Counting
---

# 1726. Tuple with Same Product

**[View Problem on LeetCode](https://leetcode.com/problems/tuple-with-same-product/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1726` (`1726`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

Given an array `nums` of **distinct** positive integers, return the number of ordered 4-tuples `(a, b, c, d)` formed from four distinct elements of `nums` (`a != b != c != d`) such that `a * b = c * d`.

---

## Examples

### Example 1

```text
Input: nums = [2,3,4,6]
Output: 8
Explanation: There are 8 valid tuples:
(2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
(3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)
```

### Example 2

```text
Input: nums = [1,2,4,5,10]
Output: 16
Explanation: There are 16 valid tuples:
(1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
(2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
(2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,5,4)
(4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)
```

---

## Constraints

- `1 <= nums.length <= 1000`

- `1 <= nums[i] <= 10^4`

- All elements in `nums` are **distinct**.

---

## Problem Understanding

- **Distinctness simplifies everything!** Because all elements in `nums` are distinct positive integers, suppose two different unordered index pairs `{i, j}` and `{p, q}` produce the same product `nums[i] * nums[j] == nums[p] * nums[q]`.
  - Can they share an element? If `nums[i] == nums[p]`, dividing both sides by `nums[i] > 0` forces `nums[j] == nums[q]`, meaning `{i, j}` and `{p, q}` were the *exact same* pair!
  - Therefore, **any two distinct unordered pairs with equal product are automatically disjoint** (`4` distinct numbers)!
- How many ordered 4-tuples `(a, b, c, d)` come from one unordered pair of pairs `{{x, y}, {z, w}}`?
  - `2` choices for which pair goes on the left vs right (`{x, y}` first or `{z, w}` first)
  - `2` choices to order the first pair (`(x, y)` vs `(y, x)`)
  - `2` choices to order the second pair (`(z, w)` vs `(w, z)`)
  - Total = `2 * 2 * 2 = 8` ordered tuples per pair of matching-product pairs!
- If `v` unordered pairs share the same product `P`, there are `v * (v - 1) / 2` ways to choose 2 of those pairs, contributing `8 * v * (v - 1) / 2` tuples.

---

## Approach

### Brute Force Approach

Testing all 4-element combinations or permutations with 4 nested loops takes `O(n^4)` time (`~10^12` operations for `n = 1000`), and even 3 nested loops + a hash set takes `O(n^3)` (`~10^9`), both exceeding time limits.

### Optimized Approach

Iterate over all `n * (n - 1) / 2` unordered index pairs `(j, i)` (`0 <= j < i < n`), counting each product `x = nums[i] * nums[j]` in a `HashMap<Integer, Integer> cnt`. Sum `v * (v - 1) / 2` across all frequencies `v` in `cnt.values()`, and multiply the total by `8` using bitwise left shift `ans << 3`.

### Step-by-Step Thinking Process

1. Use a `HashMap<Integer, Integer> cnt` mapping product `x` to how many unordered pairs `(j, i)` (`j < i`) have `nums[i] * nums[j] == x`.
2. Note overflow safety: since `nums[i] <= 10^4`, `nums[i] * nums[j] <= 10^8`, which easily fits in a 32-bit `int`.
3. For each count `v` in `cnt.values()`, compute the number of ways to pick two unordered pairs with that product: `v * (v - 1) / 2`, and accumulate into `ans`.
4. Multiply `ans` by `8` (`ans << 3`) to account for the `8` valid permutations of `(a, b, c, d)` per pair-of-pairs.

### Algorithm / Intuition

In `tupleSameProduct`, `cnt.merge(x, 1, Integer::sum)` cleanly increments the frequency of product `x` (inserting `1` if absent). Accumulating `ans += v * (v - 1) / 2` first and doing a single `ans << 3` at the end is equivalent to adding `4 * v * (v - 1)` per bucket. Also check final `int` bounds: with `n <= 1000`, at most `500` disjoint pairs can share a single product, so `8 * 500 * 499 / 2 < 10^6` per product and total tuples across all products is well within `Integer.MAX_VALUE`.

---

## Dry Run

Tracing Example 1: `nums = [2, 3, 4, 6]` (`n = 4`):

1. **Pairwise products (`0 <= j < i < 4`):**
   - `(0, 1)`: `2 * 3 = 6` -> `cnt = {6: 1}`
   - `(0, 2)`: `2 * 4 = 8` -> `cnt = {6: 1, 8: 1}`
   - `(1, 2)`: `3 * 4 = 12` -> `cnt = {6: 1, 8: 1, 12: 1}`
   - `(0, 3)`: `2 * 6 = 12` -> `cnt = {6: 1, 8: 1, 12: 2}`
   - `(1, 3)`: `3 * 6 = 18` -> `cnt = {6: 1, 8: 1, 12: 2, 18: 1}`
   - `(2, 3)`: `4 * 6 = 24` -> `cnt = {6: 1, 8: 1, 12: 2, 18: 1, 24: 1}`

2. **Accumulate pair combinations `v * (v - 1) / 2`:**
   - For `v = 1` (`6, 8, 18, 24`): `1 * 0 / 2 = 0`.
   - For `v = 2` (product `12` from `{3, 4}` and `{2, 6}`): `2 * 1 / 2 = 1` -> `ans = 1`.

3. **Multiply by 8:** `ans << 3` = `1 << 3 = 8`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Iterates over all `n * (n - 1) / 2` index pairs with `O(1)` average-time `HashMap` updates, then iterates over at most `O(n^2)` distinct products.
- **Space Complexity:** `O(n^2)` — In the worst case where most pairwise products are distinct, `cnt` stores `O(n^2)` entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1726tuple-with-same-product.java](./1726tuple-with-same-product.java) |

---

## Key Learnings

- Meeting in the middle (`a * b = c * d`) reduces a 4-variable `O(n^4)` equation into two 2-variable `O(n^2)` halves joined by a hash map.
- Always check whether equal-value pairs can overlap! Here, distinct positive elements guarantee `a * b == a * d` implies `b == d`, so distinct unordered pairs never share an element.
- Counting unordered canonical structures first (`C(v, 2)`) and multiplying by symmetry permutations (`* 8` or `<< 3`) at the end prevents overcounting bugs.
