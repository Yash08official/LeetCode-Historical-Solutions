---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 81. Search in Rotated Sorted Array II

**[View Problem on LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0081` (`81`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

There is an integer array `nums` sorted in non-decreasing order (not necessarily with **distinct** values).

Before being passed to your function, `nums` is **rotated** at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,4,4,5,6,6,7]` might be rotated at pivot index `5` and become `[4,5,6,6,7,0,1,2,4,4]`.

Given the array `nums` after the rotation and an integer `target`, return `true` *if* `target` *is in* `nums`, *or* `false` *if it is not in* `nums`.

You must decrease the overall operation steps as much as possible.

---

## Examples

### Example 1

```text
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
```

### Example 2

```text
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
```

---

## Constraints

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is guaranteed to be rotated at some pivot.
- `-10^4 <= target <= 10^4`
---

## Follow-up

This problem is similar to [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/), but `nums` may contain **duplicates**. Would this affect the runtime complexity? How and why?

---

## Problem Understanding

- Unlike LeetCode 33 where all elements are distinct, duplicate elements here can cause `nums[mid] == nums[r]`, obscuring which half is sorted.
- In each iteration, if `nums[mid] > nums[r]`, the left subarray `[l, mid]` is strictly sorted.
- If `nums[mid] < nums[r]`, the right subarray `[mid, r]` is strictly sorted.
- If `nums[mid] == nums[r]`, we cannot determine which half is sorted; however, we know `nums[r]` cannot uniquely determine the search boundary, so we can safely decrement `r--`.

---

## Approach

### Optimized Approach (Modified Binary Search with Duplicate Pruning)

1. Set two pointers `l = 0` and `r = nums.length - 1`.
2. While `l < r`:
   - Compute `mid = (l + r) >> 1`.
   - **Case 1: `nums[mid] > nums[r]`**
     - The left half `[l, mid]` is sorted.
     - If `nums[l] <= target && target <= nums[mid]`, target lies in the left half: `r = mid`.
     - Otherwise, target lies in the right half: `l = mid + 1`.
   - **Case 2: `nums[mid] < nums[r]`**
     - The right half `[mid, r]` is sorted.
     - If `nums[mid] < target && target <= nums[r]`, target lies in the right half: `l = mid + 1`.
     - Otherwise, target lies in the left half: `r = mid`.
   - **Case 3: `nums[mid] == nums[r]`**
     - Since `nums[mid]` equals `nums[r]`, duplicate values obscure which partition is monotonic. Safely decrement `--r` to eliminate the redundant boundary element.
3. After the loop, return `nums[l] == target`.

---

## Dry Run

Consider `nums = [2,5,6,0,0,1,2]`, `target = 0`:
1. `l = 0, r = 6`, `mid = 3`: `nums[3] = 0`, `nums[6] = 2`. Since `0 < 2`, right half `[3, 6]` is sorted. `nums[3] < 0 <= nums[6]` is false (`0 < 0` false), so `r = 3`.
2. `l = 0, r = 3`, `mid = 1`: `nums[1] = 5`, `nums[3] = 0`. Since `5 > 0`, left half `[0, 1]` is sorted. `nums[0] <= 0 <= nums[1]` is `2 <= 0 <= 5` (false), so `l = mid + 1 = 2`.
3. `l = 2, r = 3`, `mid = 2`: `nums[2] = 6`, `nums[3] = 0`. Since `6 > 0`, left half is sorted. `nums[2] <= 0 <= nums[2]` is false, so `l = mid + 1 = 3`.
4. `l == r == 3`. Loop terminates.
5. Check `nums[3] == target`: `0 == 0` -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log N)$ on average; degrades to $O(N)$ in the worst case when all elements are duplicates (e.g., `[1, 1, 1, 1, 1]` searching for `2`).
- **Space Complexity:** $O(1)$ auxiliary memory since only index pointers are maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [81search-in-rotated-sorted-array-ii.java](./81search-in-rotated-sorted-array-ii.java) |

---

## Key Learnings

- When duplicates are introduced into rotated sorted arrays, binary search worst-case complexity drops from $O(\log N)$ to $O(N)$ because equality `nums[mid] == nums[r]` forces linear boundary reduction.
- Decrementing `r` preserves correctness because either `target` is present at another index or `nums[r]` was genuinely redundant.
