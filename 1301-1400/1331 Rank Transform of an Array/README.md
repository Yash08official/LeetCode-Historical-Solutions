---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Sorting
---

# 1331. Rank Transform of an Array

**[View Problem on LeetCode](https://leetcode.com/problems/rank-transform-of-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1331` (`1331`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `arr`, replace every element with its **1-based rank** (also known as coordinate compression or dense ranking) and return the resulting array.

The rank follows three rules:
1. Ranks start at `1` for the smallest element in `arr`.
2. Strictly larger elements receive strictly larger ranks, while equal elements share the **exact same rank**.
3. Ranks must be consecutive integers (`1, 2, ..., m` where `m` is the number of distinct values) with no gaps.

---

## Examples

### Example 1

```text
Input: arr = [40,10,20,30]
Output: [4,1,2,3]
Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.
```

### Example 2

```text
Input: arr = [100,100,100]
Output: [1,1,1]
Explanation: Same elements share the same rank.
```

### Example 3

```text
Input: arr = [37,12,28,9,100,56,80,5,12]
Output: [5,3,4,2,8,6,7,1,3]
```

---

## Constraints

- `0 <= arr.length <= 10^5`

- `-10^9 <= arr[i] <= 10^9`

---

## Problem Understanding

- Notice this is **dense ranking** (like SQL `DENSE_RANK()`), not competition ranking: for `[10, 10, 20]`, the ranks are `[1, 1, 2]`, **not** `[1, 1, 3]`.
- Equivalently, the rank of `arr[i]` is `(number of strictly smaller UNIQUE values in arr) + 1`.
- `arr` can be empty (`0 <= arr.length <= 10^5`), and elements span `[-10^9, 10^9]`, so direct value-indexed counting arrays cannot be used.

---

## Approach

### Brute Force Approach

For each element `arr[i]`, insert all strictly smaller elements of `arr` into a `Set` and take `set.size + 1`. Doing an `O(n)` scan and set construction for each of the `n` positions takes `O(n^2)` time, which times out when `n = 10^5`.

### Optimized Approach

Copy and sort `arr` into `t`, deduplicate `t` **in-place** into its prefix `t[0..m-1]`, and for each element `arr[i]` find its 0-based index in `t[0..m-1]` via lower-bound `binarySearch` (adding `1` for 1-based rank)—avoiding hash table overhead altogether.

### Step-by-Step Thinking Process

1. Handle the edge case `arr.length === 0` upfront by returning `[]`.
2. Clone `arr` into `t` with `arr.slice()` and sort numerically using `t.sort((a, b) => a - b)` (crucial in JS, where default `.sort()` sorts lexicographically as strings!).
3. Compact unique sorted elements into the front of `t` using a write pointer `m`: whenever `i === 0 || t[i] !== t[i - 1]`, write `t[m++] = t[i]`.
4. Now `t[0..m - 1]` is strictly increasing, and `t[k]` has 1-based rank `k + 1`.
5. For each `arr[i]`, run `binarySearch(t, 0, m, arr[i])` to locate its exact index in `[0, m)` in `O(log m)` time and store `index + 1` in `ans[i]`.

### Algorithm / Intuition

This implementation performs **coordinate compression** purely with flat arrays. After sorting `t`, all duplicates sit adjacent to each other, so the two-pointer pass (`i` reading, `m` writing) compacts unique values into `t[0..m - 1]` without allocating a second array or `Map`. Then `binarySearch(t, 0, m, arr[i])` implements standard half-open `[left, right)` lower-bound search: `if (arr[mid] < target) left = mid + 1; else right = mid;`. Because every `arr[i]` is guaranteed to exist in `t[0..m - 1]`, `left` converges to the exact 0-based unique index of `arr[i]`, and `+ 1` converts it to a 1-based rank. (Note: the solution file also includes 4 `console.log` test invocations at the bottom of the script.)

---

## Dry Run

Tracing `arr = [40, 10, 20, 30]` (**Example 1**, `n = 4`):

1. **Clone & sort:** `t = [10, 20, 30, 40]`.
2. **Deduplicate in-place:** all 4 adjacent pairs differ -> `t[0..3] = [10, 20, 30, 40]`, `m = 4`.
3. **Binary search ranks (`ans`):**
   - `i = 0`, `arr[0] = 40`: `binarySearch(t, 0, 4, 40)` -> `mid=2 (30<40) -> left=3`, `mid=3 (40<40 false) -> right=3` -> returns `3`; `ans[0] = 3 + 1 = 4`.
   - `i = 1`, `arr[1] = 10`: `binarySearch(t, 0, 4, 10)` -> returns `0`; `ans[1] = 0 + 1 = 1`.
   - `i = 2`, `arr[2] = 20`: `binarySearch(t, 0, 4, 20)` -> returns `1`; `ans[2] = 1 + 1 = 2`.
   - `i = 3`, `arr[3] = 30`: `binarySearch(t, 0, 4, 30)` -> returns `2`; `ans[3] = 2 + 1 = 3`.

Return `ans = [4, 1, 2, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting `t` takes `O(n log n)`, in-place deduplication takes `O(n)`, and `n` binary searches over `m <= n` elements take `O(n log m) <= O(n log n)`.
- **Space Complexity:** `O(n)` — Auxiliary array `t` uses `O(n)` space (plus `O(n)` for the returned `ans` array).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1331rank-transform-of-an-array.js](./1331rank-transform-of-an-array.js) |

---

## Key Learnings

- Sort + deduplicate + lower-bound binary search is the canonical **coordinate compression** pattern across competitive programming, mapping values in `[-10^9, 10^9]` onto `[0, m - 1]` without hash collisions or object-boxing overhead.
- Always pass `(a, b) => a - b` to `Array.prototype.sort()` in JavaScript when sorting numbers; default `.sort()` orders `-10` before `-2` and `100` before `20`!
- A `Map` mapping each unique sorted value to `rank` achieves the same `O(n log n)` overall complexity (`O(n)` lookup phase), trading slightly higher memory for `O(1)` average lookups.
