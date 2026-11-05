---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Divide and Conquer
  - Binary Indexed Tree
  - Segment Tree
  - Merge Sort
  - Ordered Set
  - Treap
---

# 327. Count of Range Sum

**[View Problem on LeetCode](https://leetcode.com/problems/count-of-range-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0327` (`327`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Divide and Conquer`, `Binary Indexed Tree`, `Segment Tree`, `Merge Sort`, `Ordered Set`, `Treap` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and two bounds `lower` and `upper` (`lower <= upper`), return the total number of contiguous subarray range sums `S(i, j) = nums[i] + nums[i + 1] + ... + nums[j]` (`0 <= i <= j < nums.length`) that fall inside the closed interval `[lower, upper]`.

---

## Examples

### Example 1

```text
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
Explanation: The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.
```

### Example 2

```text
Input: nums = [0], lower = 0, upper = 0
Output: 1
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-2^31 <= nums[i] <= 2^31 - 1`

- `-10^5 <= lower <= upper <= 10^5`

- The answer is **guaranteed** to fit in a **32-bit** integer.

---

## Problem Understanding

- Rewriting range sums with prefix sums `s[0] = 0, s[k] = nums[0] + ... + nums[k - 1]` gives `S(i, j) = s[j + 1] - s[i]`.
- For a fixed right endpoint `x = s[j + 1]`, we want to count how many earlier prefix sums `s[i]` (`0 <= i <= j`) satisfy `lower <= x - s[i] <= upper`.
- Rearranging the inequality for `s[i]` isolates the query interval: `x - upper <= s[i] <= x - lower`!
- Because individual `nums[i]` span `[-2^31, 2^31 - 1]`, prefix sums `s[i]` and shifted bounds `x - lower`, `x - upper` require `64`-bit `long` arithmetic.

---

## Approach

### Brute Force Approach

Computing prefix sums and checking `lower <= s[j + 1] - s[i] <= upper` over all pairs `0 <= i <= j < n` takes `O(n^2)` time, which exceeds time limits for `n = 10^5` (`~5 * 10^9` pairs).

### Optimized Approach

Compute `64`-bit prefix sums `s[0..n]`, coordinate-compress all values `{s[i], s[i] - lower, s[i] - upper}` into sorted unique array `arr[0..m-1]`, and sweep through `s` using binary search (`search`) and a `BinaryIndexedTree` to count prior prefix sums in `[x - upper, x - lower]`.

### Step-by-Step Thinking Process

1. Build `long[] s = new long[n + 1]` with `s[0] = 0` and `s[i + 1] = s[i] + nums[i]`.
2. Populate `long[] arr = new long[n * 3 + 3]` containing every `s[i]`, `s[i] - lower`, and `s[i] - upper` so every value we will ever insert or query has an exact slot.
3. Sort `arr` and deduplicate it in-place into `arr[0 .. m - 1]`. Write binary search `search(arr, m, val)` returning its `1`-based index (`1..m`).
4. Initialize `BinaryIndexedTree tree = new BinaryIndexedTree(m)` and iterate `for (long x : s)` from `s[0]` through `s[n]`:
5. Query `l = search(arr, m, x - upper)` and `r = search(arr, m, x - lower)`, add `tree.query(r) - tree.query(l - 1)` to `ans`, and then insert `x` via `tree.update(search(arr, m, x), 1)`.

### Algorithm / Intuition

Notice how elegantly `s[0] = 0` integrates into the loop `for (long x : s)`! When `x = s[0]` is processed first, `tree` is completely empty, so `tree.query(r) - tree.query(l - 1)` adds `0` to `ans`, and then `s[0]` is inserted into `tree`. Thereafter, when processing `x = s[j + 1]`, `tree` contains **exact** prefix sums `s[0], s[1], ..., s[j]`, so counting elements in `[x - upper, x - lower]` counts every valid subarray ending at index `j` (including prefix subarrays starting at index `0` via `s[0]`)!

---

## Dry Run

Tracing **Example 1** (`nums = [-2, 5, -1]`, `lower = -2`, `upper = 2`):

- Prefix sums `s = [0, -2, 3, 2]`.
- Deduplicated sorted coordinates `arr` (`m = 9`): `[-4, -2, 0, 1, 2, 3, 4, 5]` (ranks `1..8`).
- Sweep `x` through `s = [0, -2, 3, 2]`:
  1. `x = 0`: query `[-2, 2]` on empty tree -> `+0`; insert `0`.
  2. `x = -2`: query `[-4, 0]` (`0` is inside `[-4, 0]`) -> `+1` (`S(0,0) = -2`); insert `-2`.
  3. `x = 3`: query `[1, 5]` (tree holds `{0, -2}`, neither in `[1, 5]`) -> `+0`; insert `3`.
  4. `x = 2`: query `[0, 4]` (tree holds `{0, -2, 3}`, both `0` and `3` lie in `[0, 4]`) -> `+2` (`S(0,2) = 2` and `S(2,2) = -1`); insert `2`.
- Total `ans = 0 + 1 + 0 + 2 = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting `3n + 3` `long` values takes `O(n log n)`, and each of the `n + 1` prefix sums performs 3 binary searches and 3 Fenwick Tree operations in `O(log n)` time.
- **Space Complexity:** `O(n)` — Prefix array `s` (`n + 1`), coordinate array `arr` (`3n + 3`), and Fenwick array `c` (`m + 1 <= 3n + 4`) all scale linearly.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [327count-of-range-sum.java](./327count-of-range-sum.java) |

---

## Key Learnings

- Algebraically isolating the earlier variable (`x - upper <= s[i] <= x - lower`) turns an arbitrary subarray range check into a standard 1D orthogonal range-count query.
- Including query endpoints (`s[i] - lower` and `s[i] - upper`) inside the coordinate-compression universe guarantees exact rank hits during binary search without boundary off-by-one ambiguity.
- Sorting and deduplicating a primitive `long[]` with binary search avoids millions of `Long` object boxing allocations in `HashSet`/`HashMap`.
