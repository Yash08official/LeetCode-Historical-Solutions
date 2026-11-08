---
comments: true
difficulty: Easy
tags:
  - Array
  - Two Pointers
  - Sorting
---

# 88. Merge Sorted Array

**[View Problem on LeetCode](https://leetcode.com/problems/merge-sorted-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0088` (`88`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Two Pointers`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be *stored inside the array* `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

---

## Examples

### Example 1

```text
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
```

### Example 2

```text
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```

### Example 3

```text
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
```

---

## Constraints

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-10^9 <= nums1[i], nums2[j] <= 10^9`

---

## Problem Understanding

- Merging from the front requires shifting elements or allocating extra buffer memory to prevent overwriting unmerged elements in `nums1`.
- Because `nums1` has $n$ empty trailing slots, merging **from back to front** ensures existing values in `nums1` are never prematurely overwritten.

---

## Approach

### Optimized Approach (Three-Pointer Reverse Merge)

1. Initialize pointers:
   - `i = m - 1`: points to the end of valid elements in `nums1`.
   - `j = n - 1`: points to the end of `nums2`.
   - `k = m + n - 1`: points to the end of the total buffer in `nums1`.
2. While elements remain in `nums2` (`j >= 0`):
   - If `i >= 0 && nums1[i] > nums2[j]`, place `nums1[i--]` at index `k`.
   - Else, place `nums2[j--]` at index `k`.
   - Decrement `k`.

---

## Complexity Analysis

- **Time Complexity:** $O(m + n)$ — Each position from $m + n - 1$ down to $0$ is filled in a single pass.
- **Space Complexity:** $O(1)$ — In-place reverse merge with zero auxiliary array allocation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [88merge-sorted-array.java](./88merge-sorted-array.java) |

---

## Key Learnings

- Reverse two-pointer placement solves in-place merge buffer conflicts by writing into unused trailing space.
- The loop can terminate as soon as `j < 0` because any remaining elements in `nums1` are already in their correct sorted positions.
