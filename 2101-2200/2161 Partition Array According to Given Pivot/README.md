---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Simulation
---

# 2161. Partition Array According to Given Pivot

**[View Problem on LeetCode](https://leetcode.com/problems/partition-array-according-to-given-pivot/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2161` (`2161`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** integer array `nums` and an integer `pivot` (which appears in `nums`). Rearrange `nums` so that:

1. Every element **strictly less** than `pivot` comes before every element equal to or greater than `pivot`.
2. Every element **equal** to `pivot` appears in the middle—after all smaller elements and before all larger elements.
3. The **relative order** among elements smaller than `pivot` is preserved, and the **relative order** among elements greater than `pivot` is also preserved.

Return the rearranged array.

---

## Examples

### Example 1

```text
Input: nums = [9,12,5,10,14,3,10], pivot = 10
Output: [9,5,3,10,10,12,14]
Explanation:
The elements 9, 5, and 3 are less than the pivot so they are on the left side of the array.
The elements 12 and 14 are greater than the pivot so they are on the right side of the array.
The relative ordering of the elements less than and greater than pivot is also maintained. [9, 5, 3] and [12, 14] are the respective orderings.
```

### Example 2

```text
Input: nums = [-3,4,3,2], pivot = 2
Output: [-3,2,4,3]
Explanation:
The element -3 is less than the pivot so it is on the left side of the array.
The elements 4 and 3 are greater than the pivot so they are on the right side of the array.
The relative ordering of the elements less than and greater than pivot is also maintained. [-3] and [4, 3] are the respective orderings.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-10^6 <= nums[i] <= 10^6`

- `pivot` equals to an element of `nums`.

---

## Problem Understanding

- **Stable Three-Way Partition:** Unlike QuickSort's standard Dutch National Flag (`3`-way) in-place partition—which swaps elements across ends and **destroys** relative ordering—this problem explicitly requires **stability** (preserving original relative order within `< pivot` and within `> pivot`).
- **Output Array Allows `O(n)` Stable Partitioning:** Allocating the result array `ans` of length `n` lets us write the three groups (`< pivot`, `== pivot`, `> pivot`) sequentially in left-to-right order.

---

## Approach

### Brute Force Approach

Attempting to partition **in-place** while preserving relative order by repeatedly bubbling/shifting smaller elements leftward (similar to insertion sort) shifts up to `O(n)` elements per move, resulting in `O(n^2)` time complexity (`~10^{10}` operations for `n = 10^5`).

### Optimized Approach

Allocate an output array `ans` of length `n` with a single write index `k = 0`, and perform **three linear scans** over `nums` to append elements `< pivot`, then `== pivot`, and finally `> pivot`.

### Step-by-Step Thinking Process

1. Notice that the output consists of three contiguous segments in order: `[elements < pivot] + [elements == pivot] + [elements > pivot]`.
2. Create `int[] ans = new int[n]` and write pointer `int k = 0`.
3. Pass 1: scan `nums` left-to-right and copy every `x < pivot` into `ans[k++]` (preserving relative order).
4. Pass 2: scan `nums` left-to-right and copy every `x == pivot` into `ans[k++]`.
5. Pass 3: scan `nums` left-to-right and copy every `x > pivot` into `ans[k++]` (preserving relative order), then return `ans`.

### Algorithm / Intuition

Because each pass iterates through `nums` strictly from index `0` to `n - 1`, any two elements `nums[i]` and `nums[j]` (`i < j`) belonging to the same category (`< pivot` or `> pivot`) are encountered and written into `ans[k++]` in that exact order, guaranteeing stability automatically. Furthermore, three simple sequential scans over a contiguous primitive `int[]` are heavily optimized by CPU hardware prefetching and avoid allocating extra dynamic `ArrayList` buckets.

---

## Dry Run

Trace on **Example 1**: `nums = [9, 12, 5, 10, 14, 3, 10]`, `pivot = 10` (`n = 7`, `k = 0`).

1. **Pass 1 (`x < 10`):**
   - Matches `9`, `5`, `3` in order -> writes to `ans[0..2]` -> `ans = [9, 5, 3, _, _, _, _]`, `k = 3`.
2. **Pass 2 (`x == 10`):**
   - Matches `10`, `10` -> writes to `ans[3..4]` -> `ans = [9, 5, 3, 10, 10, _, _]`, `k = 5`.
3. **Pass 3 (`x > 10`):**
   - Matches `12`, `14` in order -> writes to `ans[5..6]` -> `ans = [9, 5, 3, 10, 10, 12, 14]`, `k = 7`.
4. **Return `ans`:** `[9, 5, 3, 10, 10, 12, 14]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We make three linear passes over `nums` of length `n`, writing each element into `ans` exactly once.
- **Space Complexity:** `O(1)` auxiliary space (`O(n)` including the returned array `ans` of size `n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2161partition-array-according-to-given-pivot.java](./2161partition-array-according-to-given-pivot.java) |

---

## Key Learnings

- Standard Dutch National Flag (`O(1)` extra space swaps) is **unstable**; achieving a stable 3-way partition in `O(n)` time requires `O(n)` output space.
- Writing directly into a single pre-sized `int[] ans` across three passes uses less memory and fewer object allocations than building three separate `List<Integer>` lists and merging them.
