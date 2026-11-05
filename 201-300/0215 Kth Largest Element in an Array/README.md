---
comments: true
difficulty: Medium
tags:
  - Array
  - Divide and Conquer
  - Sorting
  - Heap (Priority Queue)
  - Quickselect
---

# 215. Kth Largest Element in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0215` (`215`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Divide and Conquer`, `Sorting`, `Heap (Priority Queue)`, `Quickselect` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array.

Note that we want the `k`-th largest element in **sorted order** (counting duplicates individually), not the `k`-th distinct value. Try to solve it without fully sorting the array.

---

## Examples

### Example 1

```text
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

### Example 2

```text
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

---

## Constraints

- `1 <= k <= nums.length <= 10^5`

- `-10^4 <= nums[i] <= 10^4`

---

## Problem Understanding

If `nums` were sorted in non-decreasing order from index `0` to `n - 1`, the `1`-st largest element would sit at `n - 1`, the `2`-nd largest at `n - 2`, and in general the `k`-th largest element sits at **0-based index `n - k`**. Duplicate elements can appear heavily (and LeetCode includes all-equal or adversarial test cases), so our partitioning scheme must split duplicate pivot values evenly rather than creating `O(n^2)` unbalanced partitions on equal elements.

---

## Approach

### Brute Force Approach

Sorting the entire array in ascending order via `Arrays.sort(nums)` and returning `nums[nums.length - k]` takes `O(n log n)` time. Doing unnecessary work to order the `n - 1` other indices that do not contain `n - k` wastes time when we only need a single order statistic.

### Optimized Approach

Use Quickselect with Hoare's two-pointer partition around the midpoint pivot `nums[(l + r) >>> 1]`, converting `k`-th largest into target ascending index `this.k = nums.length - k` and recursing only into the side containing `this.k`.

### Step-by-Step Thinking Process

1. Translate `k`-th largest into 0-indexed ascending position `this.k = nums.length - k`.
2. Define recursive helper `quickSort(l, r)` to find the element belonging at `this.k` within subarray `nums[l..r]`. Base case: when `l == r`, only one candidate remains, so return `nums[l]`.
3. Choose midpoint pivot `x = nums[(l + r) >>> 1]` (using unsigned shift `>>> 1` to avoid overflow) and run Hoare's partition with pointers `i = l - 1` and `j = r + 1`.
4. Advance `++i` while `nums[i] < x` and `--j` while `nums[j] > x`; swap `nums[i]` and `nums[j]` whenever `i < j`.
5. Once `i >= j`, Hoare's invariant guarantees every element in `nums[l..j]` is `<= x` and every element in `nums[j + 1..r]` is `>= x`. Recurse right (`quickSort(j + 1, r)`) if `j < this.k`, else recurse left (`quickSort(l, j)`).

### Algorithm / Intuition

Why is Hoare's partition (`while (nums[++i] < x)` and `while (nums[--j] > x)`) so effective here?
1. **Balanced splitting on duplicates:** Because both inner loops stop on elements **equal** to `x` (`< x` and `> x` are strict), an array of identical values swaps at every step and splits right down the middle (`O(n)` time instead of degenerating to `O(n^2)`).
2. **Single-branch recursion:** Unlike full Quicksort which recurses on both `[l, j]` and `[j + 1, r]`, `findKthLargest` checks `if (j < k)` and discards the irrelevant subarray completely, shrinking expected work geometrically (`n + n/2 + n/4 + ... = 2n`).
Note: with Hoare partition, `j` is a split boundary rather than the final resting index of a single pivot element, which is why the left branch recurses on `(l, j)` inclusive rather than `(l, j - 1)`.

---

## Dry Run

Tracing Example 1: `nums = [3, 2, 1, 5, 6, 4]`, `k = 2` -> target index `this.k = 6 - 2 = 4`:

1. **`quickSort(0, 5)`**: `x = nums[(0 + 5) >>> 1] = nums[2] = 1`, `i = -1`, `j = 6`.
   - `++i` stops at `0` (`3 >= 1`); `--j` stops at `2` (`1 <= 1`). `0 < 2` -> swap `nums[0]` & `nums[2]` -> `[1, 2, 3, 5, 6, 4]`.
   - Next: `++i` moves to `1` (`2 >= 1`); `--j` moves to `0` (`1 <= 1`). Loop ends (`i = 1 >= j = 0`).
   - Since `j = 0 < 4`, recurse right: `quickSort(1, 5)`.
2. **`quickSort(1, 5)`**: `x = nums[3] = 5`, `i = 0`, `j = 6`.
   - `i` advances to `3` (`nums[3] = 5`); `j` moves to `5` (`nums[5] = 4 <= 5`). `3 < 5` -> swap `nums[3]` & `nums[5]` -> `[1, 2, 3, 4, 6, 5]`.
   - `i` advances to `4` (`6 >= 5`); `j` moves to `3` (`4 <= 5`). Loop ends (`i = 4 >= j = 3`).
   - Since `j = 3 < 4`, recurse right: `quickSort(4, 5)`.
3. **`quickSort(4, 5)`**: `x = nums[4] = 6`, `i = 3`, `j = 6`.
   - `i = 4` (`6 >= 6`), `j = 5` (`5 <= 6`) -> swap `nums[4]` & `nums[5]` -> `[1, 2, 3, 4, 5, 6]`.
   - `i = 5`, `j = 4` -> loop ends (`j = 4`).
   - Since `j = 4 < 4` is false, recurse left: `quickSort(4, 4)`.
4. **`quickSort(4, 4)`**: `l == r == 4`, returns `nums[4] = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` average, `O(n^2)` worst case — Expected partition sizes halve geometrically (`O(n)` total work), though a specifically crafted input against deterministic midpoint pivots can degrade to `O(n^2)`.
- **Space Complexity:** `O(log n)` average (`O(n)` worst case) — Partitioning is performed in-place; extra memory comes solely from the recursion call stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [215kth-largest-element-in-an-array.java](./215kth-largest-element-in-an-array.java) |

---

## Key Learnings

- Converting `k`-th largest into `n - k`-th smallest (0-indexed) keeps array comparisons uniform and intuitive.
- Hoare's partition with strict `< x` and `> x` inner loops gracefully splits arrays containing massive runs of duplicate values in `O(n)` time.
- With Hoare partitioning, use midpoint `(l + r) >>> 1` as pivot (never `nums[r]`) and recurse on `(l, j)` and `(j + 1, r)` to prevent infinite recursion on 2-element subarrays.
