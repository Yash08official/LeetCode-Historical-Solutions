---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Sorting
---

# 3011. Find if Array Can Be Sorted

**[View Problem on LeetCode](https://leetcode.com/problems/find-if-array-can-be-sorted/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3011` (`3011`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed array of positive integers `nums`. In one operation, we are allowed to swap any two adjacent elements `nums[i]` and `nums[i + 1]` if and only if they have the exact same number of set bits (1s in their binary representation).

We can perform this adjacent swap operation any number of times (including zero). We need to determine whether it is possible to sort the array in non-decreasing order, returning `true` if possible, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: nums = [8,4,2,30,15]
Output: true
Explanation: Let's look at the binary representation of every element. The numbers 2, 4, and 8 have one set bit each with binary representation "10", "100", and "1000" respectively. The numbers 15 and 30 have four set bits each with binary representation "1111" and "11110".
We can sort the array using 4 operations:
- Swap nums[0] with nums[1]. This operation is valid because 8 and 4 have one set bit each. The array becomes [4,8,2,30,15].
- Swap nums[1] with nums[2]. This operation is valid because 8 and 2 have one set bit each. The array becomes [4,2,8,30,15].
- Swap nums[0] with nums[1]. This operation is valid because 4 and 2 have one set bit each. The array becomes [2,4,8,30,15].
- Swap nums[3] with nums[4]. This operation is valid because 30 and 15 have four set bits each. The array becomes [2,4,8,15,30].
The array has become sorted, hence we return true.
Note that there may be other sequences of operations which also sort the array.
```

### Example 2

```text
Input: nums = [1,2,3,4,5]
Output: true
Explanation: The array is already sorted, hence we return true.
```

### Example 3

```text
Input: nums = [3,16,8,4,2]
Output: false
Explanation: It can be shown that it is not possible to sort the input array using any number of operations.
```

---

## Constraints

- `1 <= nums.length <= 100`

- `1 <= nums[i] <= 2^8`

---

## Problem Understanding

Key structural invariants:
- Adjacent swaps of elements with the same set bit count allow any contiguous group of elements sharing the same set bit count to be sorted arbitrarily among themselves (just like bubble sort).
- Crucially, elements with different set bit counts can never swap past each other.
- Thus, the array is partitioned into contiguous segments where all elements in each segment have identical set bit counts.
- For the entire array to end up sorted, the maximum element in any segment must be less than or equal to the minimum element of the next segment (i.e. `max(segment_k) <= min(segment_{k+1})`).
- If at any point the previous segment's maximum exceeds the current segment's minimum (`preMx > mi`), it is impossible to sort the array.

---

## Approach

### Brute Force Approach

A brute-force approach would simulate bubble sort: make multiple passes over the array, swapping `nums[i]` and `nums[i+1]` whenever `nums[i] > nums[i+1]` and `Integer.bitCount(nums[i]) == Integer.bitCount(nums[i+1])`. Repeat until no more swaps are possible, then check if the array is sorted. In the worst case, this takes `O(n^2)` time.

### Optimized Approach

We process the array in a single pass using two pointers `i` and `j` to identify each maximal contiguous segment having the same bit count `cnt = Integer.bitCount(nums[i])`.
- For each segment `[i, j)`, we compute its minimum `mi` and maximum `mx`.
- We compare `mi` against `preMx` (the maximum value from the preceding segment).
- If `preMx > mi`, elements cannot pass each other to form a sorted order, so we immediately return `false`.
- Otherwise, we update `preMx = mx` and advance `i = j` to the next segment.
- If all segments satisfy `preMx <= mi`, we return `true`.

### Step-by-Step Thinking Process

1. Elements with identical popcount can freely swap and rearrange among themselves.
2. Elements with different popcount form impermeable boundaries.
3. Hence, the array naturally divides into contiguous blocks of constant popcount.
4. Within each block, we can sort its elements freely. So the block will eventually range from its minimum `mi` to its maximum `mx`.
5. For the global array to be sorted, every element of block `k-1` must be `<= ` every element of block `k`.
6. This is satisfied if and only if `max(block_{k-1}) <= min(block_k)` for all consecutive blocks.

### Algorithm / Intuition

Let's trace the state machine of the two-pointer segmentation:
1. Initialize `preMx = 0`, `i = 0`, `n = nums.length`.
2. While `i < n`:
   - Calculate `cnt = Integer.bitCount(nums[i])`.
   - Initialize `mi = nums[i]`, `mx = nums[i]`, and `j = i + 1`.
   - While `j < n && Integer.bitCount(nums[j]) == cnt`, expand the segment: `mi = min(mi, nums[j])`, `mx = max(mx, nums[j])`, and `j++`.
   - Check: if `preMx > mi`, return `false` because an element from the previous block is strictly larger than an element in the current block, and they can never swap past each other.
   - Update `preMx = mx` and advance `i = j`.
3. If loop finishes without violation, return `true`.

---

## Dry Run

Trace on Example 1: `nums = [8, 4, 2, 30, 15]`

- Set bit counts: `bitCount(8)=1, bitCount(4)=1, bitCount(2)=1, bitCount(30)=4, bitCount(15)=4`.
- Segment 1 (`i = 0`):
  - `cnt = bitCount(8) = 1`.
  - Scan `j = 1` (`4`, popcount 1), `j = 2` (`2`, popcount 1).
  - At `j = 3` (`30`, popcount 4 != 1), segment ends.
  - `mi = min(8, 4, 2) = 2`, `mx = max(8, 4, 2) = 8`.
  - `preMx (0) > mi (2)` is false. Update `preMx = 8`.
  - `i` advances to 3.
- Segment 2 (`i = 3`):
  - `cnt = bitCount(30) = 4`.
  - Scan `j = 4` (`15`, popcount 4).
  - Segment reaches end of array (`j = 5`).
  - `mi = min(30, 15) = 15`, `mx = max(30, 15) = 30`.
  - `preMx (8) > mi (15)` is false. Update `preMx = 30`.
  - `i` advances to 5 (loop terminates).
- Returns `true`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n) — Each element is examined once by the two pointers `i` and `j`, and `Integer.bitCount` runs in O(1) time.
- **Space Complexity:** O(1) auxiliary space — Only primitive integer variables (`preMx`, `i`, `j`, `mi`, `mx`, `cnt`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3011find-if-array-can-be-sorted.java](./3011find-if-array-can-be-sorted.java) |

---

## Key Learnings

- Permeable vs. impermeable swap conditions simplify sorting questions into block-level comparisons.
- Checking `max(previous_block) <= min(current_block)` guarantees whether independent internal block permutations can yield a globally sorted array.
- Single-pass two-pointer segmentation achieves optimal `O(n)` time.
