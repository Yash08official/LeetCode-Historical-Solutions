---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 33. Search in Rotated Sorted Array

**[View Problem on LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0033` (`33`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` of **distinct** values that was originally sorted in ascending order and then possibly left-rotated at some unknown pivot index, along with an integer `target`.

Return the `0`-based index of `target` in `nums`, or `-1` if `target` does not exist in `nums`. Your algorithm must run in `O(log n)` time.

---

## Examples

### Example 1

```text
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

### Example 2

```text
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

### Example 3

```text
Input: nums = [1], target = 0
Output: -1
```

---

## Constraints

- `1 <= nums.length <= 5000`

- `-10^4 <= nums[i] <= 10^4`

- All values of `nums` are **unique**.

- `nums` is an ascending array that is possibly rotated.

- `-10^4 <= target <= 10^4`

---

## Problem Understanding

- **Two sorted halves relative to `nums[0]`:** After a rotation (e.g. `[4,5,6,7,0,1,2]`), `nums` splits into at most two strictly increasing segments: a left high-value segment (`>= nums[0]`) and a right low-value segment (`<= nums[n - 1] < nums[0]`). If unrotated, the entire array belongs to the first segment.
- **Distinct elements:** Because all elements are unique, `nums[0] <= nums[mid]` unambiguously tells us that `mid` lies in the first sorted segment `[0 .. mid]`.

---

## Approach

### Brute Force Approach

Scanning `nums` linearly from index `0` to `n - 1` finds `target` without worrying about the rotation point, but runs in `O(n)` time instead of the required `O(log n)`.

### Optimized Approach

The implemented Java solution uses **binary search anchored against `nums[0]` and `nums[n - 1]`** over `[left, right]`. At each `mid = (left + right) >> 1`, if `nums[0] <= nums[mid]`, `mid` lies in the unrotated left prefix so it checks whether `nums[0] <= target && target <= nums[mid]`; otherwise `mid` lies in the rotated right suffix so it checks whether `nums[mid] < target && target <= nums[n - 1]`. Finally, when `left == right`, it checks `nums[left] == target`.

### Step-by-Step Thinking Process

1. Initialize `left = 0` and `right = n - 1`, shrinking the candidate range with `while (left < right)` until a single index remains.
2. Compute `mid = (left + right) >> 1` and determine which sorted portion `mid` belongs to by comparing `nums[0] <= nums[mid]`.
3. Case 1 (`nums[0] <= nums[mid]`): indices `0 .. mid` form a contiguous sorted block. If `nums[0] <= target && target <= nums[mid]`, `target` can only be in `[left, mid]`, so set `right = mid`; otherwise set `left = mid + 1`.
4. Case 2 (`nums[0] > nums[mid]`): indices `mid .. n - 1` form a contiguous sorted block. If `nums[mid] < target && target <= nums[n - 1]`, `target` can only be in `[mid + 1, right]`, so set `left = mid + 1`; otherwise set `right = mid`.
5. Once `left == right`, return `nums[left] == target ? left : -1`.

### Algorithm / Intuition

Comparing `nums[mid]` against the fixed array endpoints `nums[0]` and `nums[n - 1]` (instead of moving `nums[left]` and `nums[right]`) makes reasoning about sorted intervals rock-solid: in a rotated array of distinct values, every element in the front part is `>= nums[0]`, and every element in the rotated back part is `<= nums[n - 1]`. Using asymmetric updates `right = mid` and `left = mid + 1` with floor division `(left + right) >> 1` guarantees `mid < right` whenever `left < right`, so the loop never stalls in an infinite cycle.

---

## Dry Run

Tracing Example 1: `nums = [4, 5, 6, 7, 0, 1, 2]` (`n = 7`, `nums[0] = 4`, `nums[6] = 2`), `target = 0`

| Step | `left` | `right` | `mid` | `nums[mid]` | `nums[0] <= nums[mid]`? | Range Check | Update |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `0` | `6` | `3` | `7` | `4 <= 7` (`true`) | `4 <= 0 <= 7` (`false`) | `left = 4` |
| 2 | `4` | `6` | `5` | `1` | `4 <= 1` (`false`) | `1 < 0 <= 2` (`false`) | `right = 5` |
| 3 | `4` | `5` | `4` | `0` | `4 <= 0` (`false`) | `0 < 0 <= 2` (`false`) | `right = 4` |

Loop ends at `left = 4, right = 4`. `nums[4] == 0` is `true` -> returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(log n)` — Each iteration halves the interval `[left, right]`, terminating in `ceil(log_2 n)` steps.
- **Space Complexity:** `O(1)` — Uses only integer variables (`n`, `left`, `right`, `mid`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [33search-in-rotated-sorted-array.java](./33search-in-rotated-sorted-array.java) |

---

## Key Learnings

- Comparing `nums[0] <= nums[mid]` cleanly classifies whether `mid` sits before or after the rotation drop whenever elements are distinct.
- Pairing `while (left < right)` with `mid = (left + right) >> 1`, `right = mid`, and `left = mid + 1` defers the equality check to a single post-loop check `nums[left] == target`.
