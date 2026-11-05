---
comments: true
difficulty: Easy
tags:
  - Array
  - Two Pointers
---

# 26. Remove Duplicates from Sorted Array

**[View Problem on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0026` (`26`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` sorted in non-decreasing order, remove duplicate values **in-place** so that each distinct integer appears only once while preserving their original sorted order.

Return `k`, the count of unique elements. The first `k` slots of `nums` (`nums[0 .. k - 1]`) must hold the unique sorted values; whatever remains at indices `>= k` is ignored by the judge.

---

## Examples

### Example 1

```text
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

### Example 2

```text
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

---

## Constraints

- `1 <= nums.length <= 3 * 10^4`

- `-100 <= nums[i] <= 100`

- `nums` is sorted in **non-decreasing** order.

---

## Problem Understanding

- **Sorted property:** Because `nums` is sorted in non-decreasing order, all equal elements appear in contiguous blocks—meaning a value `x` is unique if and only if it differs from the most recently kept unique value `nums[k - 1]`.
- **In-place write safety:** Since the write index `k` never overtakes the read scan index, writing `nums[k++] = x` never clobbers an unread element.

---

## Approach

### Brute Force Approach

A naive approach inserts all elements into a `LinkedHashSet` or `TreeSet` to deduplicate them and copies the unique elements back into `nums`. While `O(n)` with `LinkedHashSet`, this allocates `O(n)` extra memory and violates the in-place requirement.

### Optimized Approach

The implemented Java solution uses a **two-pointer / write-index scan**: integer `k = 0` tracks how many unique elements have been written so far, while an enhanced `for` loop (`for (int x : nums)`) scans every element and writes `nums[k++] = x` whenever `k == 0` or `x != nums[k - 1]`.

### Step-by-Step Thinking Process

1. Initialize write pointer `k = 0`, representing the length of the deduplicated prefix `nums[0 .. k - 1]`.
2. Iterate through each value `x` in `nums` from left to right.
3. For the very first element (`k == 0`), always keep it; for subsequent elements, compare `x` against the last written unique value `nums[k - 1]`.
4. If `x != nums[k - 1]`, write `nums[k++] = x` to append `x` to the unique prefix and advance `k`.
5. Return `k` after scanning the entire array.

### Algorithm / Intuition

At every point during execution, `nums[0 .. k - 1]` is a strictly increasing prefix containing all unique values seen so far. Because the input array is non-decreasing, any new value `x` is either equal to `nums[k - 1]` (a duplicate to skip) or strictly greater than `nums[k - 1]` (a brand-new unique number to store at `nums[k]`). This invariant generalizes easily: changing `k < 1` and `nums[k - 1]` to `k < m` and `nums[k - m]` solves the 'keep at most `m` duplicates' variant.

---

## Dry Run

Tracing Example 1: `nums = [1, 1, 2]`

| Read `x` | `k` (before) | Condition `k == 0 \|\| x != nums[k - 1]` | Action | `nums` State | `k` (after) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `0` | `k == 0` -> `true` | `nums[0] = 1` | `[1, 1, 2]` | `1` |
| `1` | `1` | `1 != nums[0]` (`1 != 1`) -> `false` | Skip | `[1, 1, 2]` | `1` |
| `2` | `1` | `2 != nums[0]` (`2 != 1`) -> `true` | `nums[1] = 2` | `[1, 2, 2]` | `2` |

Returns `k = 2`, with `nums[0..1] = [1, 2]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Single pass over all `n` elements of `nums` with `O(1)` work per element.
- **Space Complexity:** `O(1)` — Modifies `nums` in-place using only two integer variables (`k` and `x`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [26remove-duplicates-from-sorted-array.java](./26remove-duplicates-from-sorted-array.java) |

---

## Key Learnings

- In a sorted array, duplicate detection reduces from `O(n)` hash-set tracking to an `O(1)` comparison against `nums[k - 1]`.
- The `k == 0 || x != nums[k - 1]` pattern generalizes directly to LeetCode 80 (Remove Duplicates II) as `k < 2 || x != nums[k - 2]`.
- Because `k` increments at most once per loop iteration, the write pointer can never overwrite elements ahead of the reader.
