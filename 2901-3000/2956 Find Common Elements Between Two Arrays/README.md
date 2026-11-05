---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
---

# 2956. Find Common Elements Between Two Arrays

**[View Problem on LeetCode](https://leetcode.com/problems/find-common-elements-between-two-arrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2956` (`2956`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | JavaScript |

---

## Problem Description

We are given two integer arrays `nums1` and `nums2` of lengths `n` and `m` respectively. We need to compute two counts:
1. `answer1`: The number of indices `i` in `nums1` such that `nums1[i]` exists at least once in `nums2`.
2. `answer2`: The number of indices `j` in `nums2` such that `nums2[j]` exists at least once in `nums1`.

We return `[answer1, answer2]` as an array of length 2.

---

## Examples

### Example 1

**Input:** `nums1 = [2,3,2], nums2 = [1,2]`

**Output:** `[2,1]`

**Explanation:**

### Example 2

**Input:** `nums1 = [4,3,2,3,1], nums2 = [2,2,5,2,3,6]`

**Output:** `[3,4]`

**Explanation:**

The elements at indices 1, 2, and 3 in `nums1` exist in `nums2` as well. So `answer1` is 3.

The elements at indices 0, 1, 3, and 4 in `nums2` exist in `nums1`. So `answer2` is 4.

### Example 3

**Input:** `nums1 = [3,4,2,3], nums2 = [1,5]`

**Output:** `[0,0]`

**Explanation:**

No numbers are common between `nums1` and `nums2`, so answer is [0,0].

---

## Constraints

- `n == nums1.length`

- `m == nums2.length`

- `1 <= n, m <= 100`

- `1 <= nums1[i], nums2[i] <= 100`

---

## Problem Understanding

Key observations and constraints:
- The constraints specify that `1 <= nums1[i], nums2[i] <= 100` and lengths `n, m <= 100`.
- We are counting indices, not unique values: duplicate numbers in `nums1` that occur in `nums2` are each counted.
- Since the values are strictly bounded by 100, we can use simple fixed-size boolean lookup tables (or arrays of size 101) instead of heavy hash maps for maximum efficiency.

---

## Approach

### Brute Force Approach

A brute-force solution uses nested loops: for each element in `nums1`, linearly search through `nums2` to see if it exists (taking `O(n * m)` time), and similarly for each element in `nums2`, search through `nums1` (taking `O(m * n)` time). While acceptable for `n, m <= 100`, it performs redundant searches for repeated values.

### Optimized Approach

We allocate two presence arrays `s1` and `s2` of size 101 filled with 0. In a single pass over `nums1`, we set `s1[x] = 1`. In a single pass over `nums2`, we set `s2[x] = 1`. Then, we iterate over `nums1` and add `s2[x]` to `ans[0]`, and iterate over `nums2` and add `s1[x]` to `ans[1]`. We return `ans`.

### Step-by-Step Thinking Process

1. We need to know set membership for each array.
2. Because value range is `[1, 100]`, a direct-addressed boolean array `s1` and `s2` of size 101 provides instant `O(1)` membership tests.
3. Mark `s1[x] = 1` for all `x in nums1` and `s2[x] = 1` for all `x in nums2`.
4. Iterate over `nums1`: for each `x`, if `s2[x] == 1`, increment the first answer.
5. Iterate over `nums2`: for each `x`, if `s1[x] == 1`, increment the second answer.

### Algorithm / Intuition

The JavaScript solution uses array indexing as a hash set:
1. Allocate `s1 = new Array(101).fill(0)` and `s2 = new Array(101).fill(0)`.
2. For each `x` in `nums1`, set `s1[x] = 1`.
3. For each `x` in `nums2`, set `s2[x] = 1`.
4. Initialize `ans = [0, 0]`.
5. Iterate `x` in `nums1` and execute `ans[0] += s2[x]`.
6. Iterate `x` in `nums2` and execute `ans[1] += s1[x]`.
7. Return `ans`.

---

## Dry Run

Trace on Example 1: `nums1 = [2, 3, 2]`, `nums2 = [1, 2]`

- Populate presence:
  - `s1[2] = 1`, `s1[3] = 1`.
  - `s2[1] = 1`, `s2[2] = 1`.
- Initialize `ans = [0, 0]`.
- Count `nums1` in `s2`:
  - `x = 2`: `s2[2] == 1` -> `ans[0] += 1` (`ans[0] = 1`).
  - `x = 3`: `s2[3] == 0` -> `ans[0] += 0` (`ans[0] = 1`).
  - `x = 2`: `s2[2] == 1` -> `ans[0] += 1` (`ans[0] = 2`).
- Count `nums2` in `s1`:
  - `x = 1`: `s1[1] == 0` -> `ans[1] += 0` (`ans[1] = 0`).
  - `x = 2`: `s1[2] == 1` -> `ans[1] += 1` (`ans[1] = 1`).
- Return `ans = [2, 1]`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n + m) — Two passes over `nums1` (length n) and two passes over `nums2` (length m) with O(1) array lookups.
- **Space Complexity:** O(1) — Fixed-size presence arrays of length 101 consume constant auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2956find-common-elements-between-two-arrays.js](./2956find-common-elements-between-two-arrays.js) |

---

## Key Learnings

- When value bounds are small and positive, direct-address arrays are faster and lighter than generic hash sets.
- Adding boolean presence indicator values directly (`ans[0] += s2[x]`) avoids branching statements.
