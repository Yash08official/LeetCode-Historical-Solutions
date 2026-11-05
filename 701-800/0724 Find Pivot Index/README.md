---
comments: true
difficulty: Easy
tags:
  - Array
  - Prefix Sum
---

# 724. Find Pivot Index

**[View Problem on LeetCode](https://leetcode.com/problems/find-pivot-index/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0724` (`724`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, find its **pivot index** — an index `i` where the sum of all elements strictly to the left of `i` equals the sum of all elements strictly to the right of `i`.

Elements at index `i` itself are excluded from both sums. For index `0`, the left sum is treated as `0`; similarly, for index `nums.length - 1`, the right sum is `0`. Return the **leftmost** pivot index if one exists, or `-1` otherwise.

---

## Examples

### Example 1

```text
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11
```

### Example 2

```text
Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.
```

### Example 3

```text
Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0
```

---

## Constraints

- `1 <= nums.length <= 10^4`

- `-1000 <= nums[i] <= 1000`

**Note:** This question is the same as 1991: https://leetcode.com/problems/find-the-middle-index-in-array/

---

## Problem Understanding

- At any index `i`, `totalSum = leftSum + nums[i] + rightSum`, which means `rightSum = totalSum - leftSum - nums[i]`.
- Because array values can be negative, zero, or positive (`-1000 <= nums[i] <= 1000`), sums do not change monotonically — binary search or two-pointer inward shrinking will not work.
- Iterating `i` from `0` to `nums.length - 1` and returning on the first match guarantees we find the **leftmost** pivot index.

---

## Approach

### Brute Force Approach

For each candidate index `i` from `0` to `n - 1`, compute the sum of `nums[0 .. i - 1]` and the sum of `nums[i + 1 .. n - 1]` using two inner loops. This recomputes overlapping subarrays repeatedly and takes `O(n^2)` time.

### Optimized Approach

Compute the total array sum up front in `right`, initialize `left = 0`, and scan left-to-right: at each index `i`, subtract `nums[i]` from `right`, check if `left == right`, and then add `nums[i]` to `left`.

### Step-by-Step Thinking Process

1. Observe that as index `i` moves one step right, `nums[i]` leaves the suffix sum and enters the prefix sum for subsequent indices.
2. Precompute `right` as the sum of the entire array using `nums.reduce((a, b) => a + b)`, and start `left` at `0`.
3. Inside the loop at index `i`, first subtract `nums[i]` from `right` so `right` represents the sum strictly to the right of `i`.
4. Compare `left == right`; if equal, immediately return `i`. Otherwise, add `nums[i]` into `left` before moving to `i + 1`.

### Algorithm / Intuition

In `pivotIndex(nums)`:
- `right` starts at `sum(nums)` and `left` starts at `0`.
- On iteration `i`, `right -= nums[i]` strips the current element out of the remaining suffix sum, establishing the loop invariant:
  - `left == nums[0] + ... + nums[i - 1]`
  - `right == nums[i + 1] + ... + nums[n - 1]`
- If `left == right`, `i` is the first (leftmost) pivot index. Otherwise, `left += nums[i]` incorporates `nums[i]` into the prefix sum for `i + 1`. If the loop completes without a match, `-1` is returned.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 7, 3, 6, 5, 6]`. Initial `left = 0`, `right = 28`.

| `i` | `nums[i]` | `right` after `-= nums[i]` | `left` | `left == right`? | `left` after `+= nums[i]` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `1` | `27` | `0` | False | `1` |
| `1` | `7` | `20` | `1` | False | `8` |
| `2` | `3` | `17` | `8` | False | `11` |
| `3` | `6` | `11` | `11` | **True** -> return `3` | — |

The function returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — One full pass in `reduce` to compute the total sum and at most one pass in the `for` loop.
- **Space Complexity:** `O(1)` — Only two scalar accumulators (`left` and `right`) and the loop counter `i` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [724find-pivot-index.js](./724find-pivot-index.js) |

---

## Key Learnings

- Maintaining a running `left` prefix sum alongside a shrinking `right` suffix sum avoids allocating an `O(n)` prefix-sum array.
- Careful ordering of updates (`right -= nums[i]`, then check, then `left += nums[i]`) cleanly handles boundary indices `0` and `n - 1` without special cases.
