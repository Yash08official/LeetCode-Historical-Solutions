---
comments: true
difficulty: Easy
tags:
  - Array
  - Two Pointers
---

# 27. Remove Element

**[View Problem on LeetCode](https://leetcode.com/problems/remove-element/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0027` (`27`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and an integer `val`, remove every occurrence of `val` from `nums` **in-place** and return `k`, the count of elements not equal to `val`.

After your function finishes, the first `k` slots (`nums[0 .. k - 1]`) must contain all elements that are not equal to `val` (in any order); values left at indices `>= k` do not matter.

---

## Examples

### Example 1

```text
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

### Example 2

```text
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

---

## Constraints

- `0 <= nums.length <= 100`

- `0 <= nums[i] <= 50`

- `0 <= val <= 100`

---

## Problem Understanding

- **In-place compaction:** We need to pack all elements `!= val` into the front `k` positions of `nums` without allocating another array.
- **Edge cases:** `nums` can be empty (`nums.length == 0`), all elements might equal `val` (returning `0`), or `val` might not appear in `nums` at all (`val > 50` while `nums[i] <= 50`, returning `nums.length`).

---

## Approach

### Brute Force Approach

A naive in-place approach scans `nums` and, whenever `nums[i] == val`, shifts every subsequent element `nums[i + 1 .. n - 1]` left by one slot. If many elements equal `val`, repeated shifting degrades time complexity to `O(n^2)`.

### Optimized Approach

The implemented Java solution uses a **single-pass write pointer `k`**. It iterates over every element `x` in `nums` and copies `nums[k++] = x` whenever `x != val`, compacting all kept elements into `nums[0 .. k - 1]` in linear time.

### Step-by-Step Thinking Process

1. Initialize `k = 0` as the next available write index for elements we want to keep.
2. Scan through `nums` element-by-element using `for (int x : nums)`.
3. If `x == val`, skip it without advancing `k`.
4. If `x != val`, write `nums[k++] = x` to place `x` at index `k` and increment `k`.
5. Return `k` as the count of retained elements.

### Algorithm / Intuition

Instead of deleting `val` by shifting tails repeatedly, think of `nums` as both the input stream and the output buffer. The read loop consumes one element `x` per step while write index `k` trails behind or stays equal (`k <= readIndex`). Every valid `x != val` is appended straight to `nums[k]`, preserving relative order and touching each element once.

---

## Dry Run

Tracing Example 1: `nums = [3, 2, 2, 3]`, `val = 3`

| Step | Read `x` | `x != 3`? | Action | `nums` State | `k` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `3` | `false` | Skip | `[3, 2, 2, 3]` | `0` |
| 2 | `2` | `true` | `nums[0] = 2` | `[2, 2, 2, 3]` | `1` |
| 3 | `2` | `true` | `nums[1] = 2` | `[2, 2, 2, 3]` | `2` |
| 4 | `3` | `false` | Skip | `[2, 2, 2, 3]` | `2` |

Returns `k = 2`, with `nums[0..1] = [2, 2]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates through all `n` elements of `nums` exactly once.
- **Space Complexity:** `O(1)` — Uses only constant extra variables (`k` and `x`) to overwrite `nums` in-place.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [27remove-element.java](./27remove-element.java) |

---

## Key Learnings

- Overwriting kept elements via a slow write pointer `k` turns `O(n^2)` repeated array deletions into a clean `O(n)` single pass.
- When `val` is very rare and array writes are expensive, an alternative two-end swap (`nums[i] = nums[n - 1]`) minimizes writes by taking advantage of arbitrary output order, though `nums[k++] = x` is simpler and preserves order.
