---
comments: true
difficulty: Easy
tags:
  - Array
  - Binary Search
---

# 35. Search Insert Position

**[View Problem on LeetCode](https://leetcode.com/problems/search-insert-position/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0035` (`35`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Given a sorted array of **distinct** integers `nums` and an integer `target`, return the `0`-based index of `target` if it exists in `nums`. Otherwise, return the index where `target` would be inserted so that `nums` remains sorted.

Your algorithm must run in `O(log n)` time.

---

## Examples

### Example 1

```text
Input: nums = [1,3,5,6], target = 5
Output: 2
```

### Example 2

```text
Input: nums = [1,3,5,6], target = 2
Output: 1
```

### Example 3

```text
Input: nums = [1,3,5,6], target = 7
Output: 4
```

---

## Constraints

- `1 <= nums.length <= 10^4`

- `-10^4 <= nums[i] <= 10^4`

- `nums` contains **distinct** values sorted in **ascending** order.

- `-10^4 <= target <= 10^4`

---

## Problem Understanding

- **Exact lower-bound definition:** Whether `target` is present in `nums` or missing, the desired answer is always the **smallest index `i` in `[0 .. nums.length]`** such that all elements before `i` are `< target` and `nums[i] >= target` (or `i == nums.length` if `target` exceeds every element in `nums`).
- **Right endpoint `nums.length`:** Because `target` might need to be appended at the very end of `nums` (as in Example 3 where `nums = [1,3,5,6]` and `target = 7` returns `4`), the valid answer range is `[0, nums.length]`, not `[0, nums.length - 1]`.

---

## Approach

### Brute Force Approach

Scanning `nums` from index `0` upward and returning the first `i` where `nums[i] >= target` (or `nums.length` at the end) is simple, but takes `O(n)` linear time instead of `O(log n)`.

### Optimized Approach

The implemented Java solution uses **lower-bound binary search** over `[l, r)` initialized to `l = 0` and `r = nums.length`. At each midpoint `mid = (l + r) >>> 1`, if `nums[mid] >= target`, `mid` could be the insertion position so `r = mid`; otherwise `mid` is too small so `l = mid + 1`. When `l == r`, it returns `l`.

### Step-by-Step Thinking Process

1. Set search bounds `l = 0` and `r = nums.length` so every valid insertion index `0 .. n` is included.
2. Loop `while (l < r)` and compute `mid = (l + r) >>> 1` (since `l < r <= n`, `mid` is strictly `< n`, so `nums[mid]` never goes out of bounds).
3. If `nums[mid] >= target`, the answer cannot be to the right of `mid`—set `r = mid`.
4. Otherwise (`nums[mid] < target`), `target` must be inserted strictly after `mid`—set `l = mid + 1`.
5. Return `l` when `l` and `r` meet.

### Algorithm / Intuition

The loop maintains two crisp invariants at all times: every element in `nums[0 .. l - 1]` is `< target`, and every element in `nums[r .. n - 1]` is `>= target`. When the interval shrinks to zero width (`l == r`), `l` sits right on the dividing line between elements `< target` and elements `>= target`—which is simultaneously the index of `target` if present and its exact sorted insertion point if absent!

---

## Dry Run

Tracing Example 1 (`target = 5`), Example 2 (`target = 2`), and Example 3 (`target = 7`) on `nums = [1, 3, 5, 6]` (`n = 4`):

- **Example 1 (`target = 5`):**
  - `l = 0, r = 4` -> `mid = 2` (`nums[2] = 5 >= 5`) -> `r = 2`.
  - `l = 0, r = 2` -> `mid = 1` (`nums[1] = 3 < 5`) -> `l = 2`.
  - `l == r == 2` -> returns `2`.
- **Example 2 (`target = 2`):**
  - `l = 0, r = 4` -> `mid = 2` (`nums[2] = 5 >= 2`) -> `r = 2`.
  - `l = 0, r = 2` -> `mid = 1` (`nums[1] = 3 >= 2`) -> `r = 1`.
  - `l = 0, r = 1` -> `mid = 0` (`nums[0] = 1 < 2`) -> `l = 1`.
  - `l == r == 1` -> returns `1`.
- **Example 3 (`target = 7`):**
  - `l = 0, r = 4 -> mid = 2` (`5 < 7`) -> `l = 3`; `mid = 3` (`6 < 7`) -> `l = 4` -> returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(log n)` — Halves the search range `[l, r)` on every step.
- **Space Complexity:** `O(1)` — Uses only three integer variables (`l`, `r`, `mid`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [35search-insert-position.java](./35search-insert-position.java) |

---

## Key Learnings

- Initializing `r = nums.length` rather than `nums.length - 1` naturally includes the 'insert after last element' position without extra conditionals.
- Notice this `searchInsert` implementation is identical line-for-line to the `search(nums, x)` lower-bound helper used in **34. Find First and Last Position**.
