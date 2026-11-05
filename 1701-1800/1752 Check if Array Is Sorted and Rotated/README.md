---
comments: true
difficulty: Easy
tags:
  - Array
---

# 1752. Check if Array Is Sorted and Rotated

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1752` (`1752`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, determine whether `nums` could have been formed by taking an array initially sorted in **non-decreasing** order and rotating it by zero or more positions.

Rotating an array `A` by `x` positions produces an array `B` of the same length where `B[i] == A[(i + x) % A.length]` for every index `i`. Duplicate elements are permitted. Return `true` if `nums` is sorted and rotated, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array.
You can rotate the array by x = 2 positions to begin on the element of value 3: [3,4,5,1,2].
```

### Example 2

```text
Input: nums = [2,1,3,4]
Output: false
Explanation: There is no sorted array once rotated that can make nums.
```

### Example 3

```text
Input: nums = [1,2,3]
Output: true
Explanation: [1,2,3] is the original sorted array.
You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.
```

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 100`

---

## Problem Understanding

- **Circular Order Property:** If we connect the end of a non-decreasing array back to its start to form a circle, a sorted array (no matter how many positions it is rotated) stays non-decreasing everywhere around the circle except possibly at the single boundary where the maximum element wraps back to the minimum element.
- **Duplicates:** Equal adjacent elements (`nums[i] == nums[i + 1]`) are valid in non-decreasing order; even if duplicates split across the wrap-around boundary (e.g., `[2, 1, 2]`), there is still only one strict drop (`2 > 1`).
- **All Equal Case:** An array like `[3, 3, 3]` has `0` strict drops around the circle.

---

## Approach

### Brute Force Approach

A brute-force approach tries all `n` possible rotation offsets `x` from `0` to `n - 1`, constructs or simulates the un-rotated array of length `n`, and checks whether each candidate is sorted in non-decreasing order. This takes `O(n^2)` time.

### Optimized Approach

Count how many cyclic adjacent pairs `(nums[i], nums[(i + 1) % n])` satisfy `nums[i] > nums[(i + 1) % n]`. Return `true` if and only if this inversion count `cnt` is at most `1`.

### Step-by-Step Thinking Process

1. Observe what happens to adjacent comparisons `nums[i] > nums[i + 1]` in a sorted non-decreasing array: there are `0` drops.
2. When we rotate the array at some pivot, both resulting halves remain non-decreasing internally, and every element of the first part (originally the tail) is `>=` every element of the second part (originally the head).
3. Check the wrap-around pair `(nums[n - 1], nums[0])` using modulo indexing `(i + 1) % n`.
4. If all elements are equal, `cnt == 0`. If rotated from a non-constant sorted array, there is exactly `1` drop (either inside `0..n-2` or at the wrap-around `n-1 -> 0`). Any array with `cnt >= 2` drops cannot be sorted and rotated.

### Algorithm / Intuition

The loop runs `i` from `0` to `n - 1` and compares `nums[i]` against `nums[(i + 1) % n]`. Using `(i + 1) % n` seamlessly includes the boundary check `nums[n - 1] > nums[0]` when `i = n - 1`. Why is checking the wrap-around essential? Consider `nums = [2, 1, 3]`: internally there is only one drop (`2 > 1`), yet it is NOT a valid rotation because `nums[2] = 3 > nums[0] = 2` creates a second cyclic drop! Thus `cnt <= 1` over all `n` cyclic pairs is both necessary and sufficient.

---

## Dry Run

Using **Example 1**: `nums = [3, 4, 5, 1, 2]`, `n = 5`

| `i` | `(i + 1) % 5` | Comparison `nums[i] > nums[(i + 1) % 5]` | `cnt` |
| :--- | :--- | :--- | :--- |
| `0` | `1` | `3 > 4` (`false`) | `0` |
| `1` | `2` | `4 > 5` (`false`) | `0` |
| `2` | `3` | `5 > 1` (`true`) | `1` |
| `3` | `4` | `1 > 2` (`false`) | `1` |
| `4` | `0` | `2 > 3` (`false`) | `1` |

Since `cnt = 1 <= 1`, the method returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We perform exactly `n` cyclic adjacent comparisons.
- **Space Complexity:** `O(1)` — Only loop indices and the counter `cnt` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1752check-if-array-is-sorted-and-rotated.java](./1752check-if-array-is-sorted-and-rotated.java) |

---

## Key Learnings

- Viewing a rotated array on a ring (modulo `n`) unifies rotated and un-rotated cases into a single invariant: at most one strict descent around the entire cycle.
- Forgetting the wrap-around comparison `nums[n - 1] > nums[0]` is a classic bug that fails on inputs like `[2, 1, 3, 4]`.
