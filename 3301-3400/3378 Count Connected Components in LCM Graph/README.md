---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Math
  - Union-Find
  - Number Theory
  - Least Common Multiple
  - Euclidean Algorithm
  - Greatest Common Divisor
---

# 3378. Count Connected Components in LCM Graph

**[View Problem on LeetCode](https://leetcode.com/problems/count-connected-components-in-lcm-graph/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3378` (`3378`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Union-Find`, `Number Theory`, `Least Common Multiple`, `Euclidean Algorithm`, `Greatest Common Divisor` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` of `n` unique elements, and a positive integer `threshold`.

A graph contains `n` nodes, where node `i` has value `nums[i]`.

An undirected edge exists between node `i` and node `j` if and only if:
`lcm(nums[i], nums[j]) <= threshold`,
where `lcm(x, y)` denotes the least common multiple of `x` and `y`.

Return the total number of connected components in this graph.

---

## Examples

### Example 1

**Input:** `nums = [2,4,8,3,9], threshold = 5`

**Output:** `4`

**Explanation:**

The four connected components are `(2, 4)`, `(3)`, `(8)`, `(9)`.

### Example 2

**Input:** `nums = [2,4,8,3,9,12], threshold = 10`

**Output:** `2`

**Explanation:**

The two connected components are `(2, 3, 4, 8, 9)`, and `(12)`.

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

- All elements of `nums` are unique.

- `1 <= threshold <= 2 * 10^5`

---

## Problem Understanding

- **Threshold Upper Bound:** If `nums[i] > threshold`, then for any other integer `x >= 1`, `lcm(nums[i], x) >= nums[i] > threshold`. Therefore, any element strictly greater than `threshold` can NEVER have an edge to any other element and must form its own isolated component.
- **LCM Definition:** For two numbers `a` and `b`, `lcm(a, b) = (a * b) / gcd(a, b)`. If `lcm(a, b) <= threshold`, then both `a` and `b` must be `<= threshold`, and both `a` and `b` are multiples of their greatest common divisor `d = gcd(a, b)`.
- **Harmonic Sieve Grouping:** For each potential divisor `d` from 1 to `threshold`, consider all multiples `m = d, 2d, 3d, ... <= threshold`. If multiple such multiples exist in `nums`, check if `lcm(base, m) <= threshold`, and if so, union their components in a Disjoint Set Union (DSU) structure.
- **Component Counting:** Count all distinct DSU root representatives across all `n` nodes.

---

## Approach

### Brute Force Approach

Check all pairs `(i, j)` with `0 <= i < j < n`, compute `lcm(nums[i], nums[j])`, and add an edge if `lcm <= threshold`. With `n <= 10^5`, testing all `O(n^2)` pairs takes `10^{10}` operations, causing Time Limit Exceeded.

### Optimized Approach

We sort `nums` and build a hash map `pos` mapping `nums[i] -> i`. If `nums[0] > threshold`, no edges can exist, returning `n`. We initialize a `DSU` with `n` elements. We iterate divisor `d` from 1 to `threshold`. For each `d`, we iterate through its multiples `m = d, 2d, 3d, ... <= threshold`. The first multiple present in `pos` is designated `baseIndex`. For each subsequent multiple present at `idx`, we verify if `lcm(nums[baseIndex], nums[idx]) <= threshold`; if valid, we call `dsu.union(baseIndex, idx)`. Finally, we insert `dsu.find(i)` for all `0 <= i < n` into a `HashSet` and return its size.

### Step-by-Step Thinking Process

1. Any number `nums[i] > threshold` cannot connect to any other number since `lcm(nums[i], y) >= nums[i] > threshold`.
2. For numbers `<= threshold`, edges exist when `lcm(a, b) <= threshold`.
3. Notice that if `lcm(a, b) <= threshold`, `a` and `b` share a common divisor `d`.
4. Iterate divisor `d` from 1 to `threshold`. Step through multiples `d, 2d, 3d, ... <= threshold`.
5. The total number of pairs checked across all `d` is bounded by the harmonic series: `threshold * sum(1/d) = threshold * ln(threshold)`.
6. When two multiples of `d` exist in `nums`, check their actual LCM. If `<= threshold`, union them via DSU.
7. Count distinct roots via `dsu.find(i)` for all `n` elements.

### Algorithm / Intuition

In `Solution.countComponents`: after sorting `nums`, if `nums[0] > threshold`, `n` is returned. A map `pos` maps each value to its index. A `DSU` manages connectivity. The outer loop runs `for (int d = 1; d <= threshold; d++)` and the inner loop checks multiples `for (int m = d; m <= threshold; m += d)`. The first multiple present in `nums` becomes `baseIndex`. For any additional multiple `idx`, we compute `long g = gcd(a, b)` and `long l = (a / g) * b`. If `l <= threshold`, `dsu.union(baseIndex, idx)` links their components. Because `threshold <= 2 * 10^5`, the harmonic sum `sum_{d=1}^{threshold} (threshold / d) approx threshold * ln(threshold)` limits the inner loop to roughly `3 * 10^6` iterations. Finally, inserting `dsu.find(i)` into a set `components` yields the count of connected components.

---

## Dry Run

### Step-by-Step Execution on Example 1: `nums = [2, 4, 8, 3, 9]`, `threshold = 5`

- Sorted `nums = [2, 3, 4, 8, 9]`. `pos = {2:0, 3:1, 4:2, 8:3, 9:4}`.
- Numbers `<= threshold (5)`: 2 (idx 0), 3 (idx 1), 4 (idx 2).
- Numbers `> threshold (5)`: 8 (idx 3), 9 (idx 4) -> never touched, each remains in its own component.
- Iterate `d = 1..5`:
  - `d = 1`: multiples present: 2 (idx 0), 3 (idx 1), 4 (idx 2).
    - `baseIndex = 0` (val 2).
    - `idx = 1` (val 3): `lcm(2, 3) = 6 > 5` (No union).
    - `idx = 2` (val 4): `lcm(2, 4) = 4 <= 5` -> `dsu.union(0, 2)`. Component `{2, 4}` formed.
  - `d = 2`: multiples present: 2 (idx 0), 4 (idx 2).
    - `baseIndex = 0`, `idx = 2`: `lcm(2, 4) = 4 <= 5` -> already united.
  - `d = 3`: multiple 3 (idx 1). No other multiple `<= 5`.
  - `d = 4`: multiple 4 (idx 2). No other multiple.
  - `d = 5`: no multiples present.
- Distinct components: `{2, 4}`, `{3}`, `{8}`, `{9}`.
- Set of roots contains 4 distinct roots. Return `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n + threshold * log(threshold) * log(threshold))` — Sorting `nums` takes `O(n log n)`. The harmonic series iterates `O(threshold * log(threshold))` times; inside, `gcd` and DSU operations take near-constant time.
- **Space Complexity:** `O(n)` — Storing indices in `pos`, DSU arrays (`parent` and `rank`), and the `components` set takes `O(n)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3378count-connected-components-in-lcm-graph.java](./3378count-connected-components-in-lcm-graph.java) |

---

## Key Learnings

- Any element exceeding `threshold` is permanently disconnected in an LCM graph where edge weights are bounded by `threshold`.
- Harmonic sieve iteration over divisors `d` and their multiples `k * d` allows checking potential graph connections in `O(threshold * log(threshold))` instead of `O(n^2)`.
