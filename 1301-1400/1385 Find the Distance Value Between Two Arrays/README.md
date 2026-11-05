---
comments: true
difficulty: Easy
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Sorting
---

# 1385. Find the Distance Value Between Two Arrays

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-distance-value-between-two-arrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1385` (`1385`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given two integer arrays `arr1` and `arr2`, along with a non-negative integer `d`, return the **distance value** between `arr1` and `arr2`.

The distance value is the count of elements `x` in `arr1` for which **no** element `y` in `arr2` satisfies `|x - y| <= d` (meaning every element in `arr2` is at a strict distance greater than `d` from `x`).

---

## Examples

### Example 1

```text
Input: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
Output: 2
Explanation:
For arr1[0]=4 we have:
|4-10|=6 > d=2
|4-9|=5 > d=2
|4-1|=3 > d=2
|4-8|=4 > d=2
For arr1[1]=5 we have:
|5-10|=5 > d=2
|5-9|=4 > d=2
|5-1|=4 > d=2
|5-8|=3 > d=2
For arr1[2]=8 we have:
|8-10|=2 <= d=2
|8-9|=1 <= d=2
|8-1|=7 > d=2
|8-8|=0 <= d=2
```

### Example 2

```text
Input: arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
Output: 2
```

### Example 3

```text
Input: arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
Output: 1
```

---

## Constraints

- `1 <= arr1.length, arr2.length <= 500`

- `-1000 <= arr1[i], arr2[j] <= 1000`

- `0 <= d <= 100`

---

## Problem Understanding

- Rewrite the forbidden condition `|x - y| <= d` without absolute values: `-d <= y - x <= d`, which is equivalent to `x - d <= y <= x + d`.
- Therefore, an element `x` from `arr1` is **valid** (counted in the answer) if and only if `arr2` contains **zero** elements inside the closed interval `[x - d, x + d]`!
- Once `arr2` is sorted in ascending order, checking whether any element falls inside `[L, R] = [x - d, x + d]` takes a single binary search: find the **smallest element in `arr2` that is `>= x - d`**, and check whether it either doesn't exist or is strictly `> x + d`!

---

## Approach

### Brute Force Approach

For each element `x` in `arr1`, scan every element `y` in `arr2` to verify `Math.abs(x - y) > d`. This takes `O(n * m)` time (where `n = arr1.length`, `m = arr2.length`), which passes for `500 x 500` but scales poorly compared to sorting `arr2` once and binary searching intervals.

### Optimized Approach

Sort `arr2` in ascending order, then for each `x` in `arr1` use `Arrays.binarySearch(arr2, x - d)` to locate the first index `i` where `arr2[i] >= x - d`. Increment `ans` whenever `i == arr2.length` or `arr2[i] > x + d`.

### Step-by-Step Thinking Process

1. Sort `arr2` with `Arrays.sort(arr2)` so elements inside any range `[x - d, x + d]` are contiguous.
2. For each `x` in `arr1`, search for the left endpoint `x - d` using `int i = Arrays.binarySearch(arr2, x - d)`.
3. Decode Java's `binarySearch` return contract: if `i >= 0`, `arr2[i] == x - d` was found directly; if `i < 0`, `i == -(insertionPoint) - 1`, so `i = -i - 1` yields the exact index of the first element strictly greater than `x - d` (or `arr2.length` if all elements are `< x - d`).
4. Check if `[x - d, x + d]` is empty in `arr2`: if `i == arr2.length` (all elements `< x - d`) or `arr2[i] > x + d` (even the smallest element `>= x - d` already exceeds `x + d`), increment `ans`.

### Algorithm / Intuition

One subtle question about `Arrays.binarySearch(arr2, x - d)` when `arr2` contains **duplicates**: if `x - d` appears multiple times in `arr2`, `Arrays.binarySearch` may return *any* matching index `i` rather than the very first one. Does that ever break our check `arr2[i] > x + d`? **No!** Because `arr2[i] == x - d` and `d >= 0`, we always have `x - d <= x + d`, so `arr2[i] > x + d` is guaranteed `false` regardless of which duplicate of `x - d` was returned! And whenever `x - d` is **not** in `arr2`, `i = -i - 1` is guaranteed to be the exact lower-bound insertion point.

---

## Dry Run

Tracing `arr1 = [4, 5, 8]`, `arr2 = [10, 9, 1, 8]`, `d = 2` (**Example 1**):

1. **Sort `arr2`:** `arr2 = [1, 8, 9, 10]` (length `4`).
2. **Test each `x` in `arr1` (`[x - 2, x + 2]`):**
   - `x = 4`, interval `[2, 6]`: `binarySearch(arr2, 2)` -> not found, insertion point `1`, returns `-2` -> `i = -(-2) - 1 = 1`. Check `arr2[1] = 8 > 6` -> **`true`** -> `ans = 1`.
   - `x = 5`, interval `[3, 7]`: `binarySearch(arr2, 3)` -> returns `-2` -> `i = 1`. Check `arr2[1] = 8 > 7` -> **`true`** -> `ans = 2`.
   - `x = 8`, interval `[6, 10]`: `binarySearch(arr2, 6)` -> returns `-2` -> `i = 1`. Check `i == 4` (`false`) || `arr2[1] = 8 > 10` (`false`) -> not counted (`8` lies in `[6, 10]`).

Return `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O((n + m) log m)` — Let `n = arr1.length` and `m = arr2.length`. Sorting `arr2` takes `O(m log m)`, and each of the `n` elements in `arr1` performs an `O(log m)` binary search.
- **Space Complexity:** `O(log m)` — `Arrays.sort(int[])` sorts in-place using Dual-Pivot Quicksort with `O(log m)` call-stack space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1385find-the-distance-value-between-two-arrays.java](./1385find-the-distance-value-between-two-arrays.java) |

---

## Key Learnings

- Rewrite absolute-value proximity conditions `|x - y| <= d` into closed interval membership `y in [x - d, x + d]`, which turns "no close element exists" into an empty-range query over a sorted array.
- Memorize Java's `Arrays.binarySearch` negative return idiom: when `idx < 0`, `-idx - 1` (or `~idx` via bitwise NOT!) recovers the exact `insertionPoint`.
- If both `arr1` and `arr2` are sorted (`O(n log n + m log m)`), a linear two-pointer sweep can also answer all interval checks in `O(n + m)` after sorting.
