---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Bit Manipulation
  - Counting
---

# 2206. Divide Array Into Equal Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/divide-array-into-equal-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2206` (`2206`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Bit Manipulation`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` of even length `2 * n`.

Determine whether `nums` can be partitioned into `n` pairs such that every element is used in **exactly one** pair and both elements in every pair are **equal**. Return `true` if such a pairing exists, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: nums = [3,2,3,2,2,2]
Output: true
Explanation:
There are 6 elements in nums, so they should be divided into 6 / 2 = 3 pairs.
If nums is divided into the pairs (2, 2), (3, 3), and (2, 2), it will satisfy all the conditions.
```

### Example 2

```text
Input: nums = [1,2,3,4]
Output: false
Explanation:
There is no way to divide nums into 4 / 2 = 2 pairs such that the pairs satisfy every condition.
```

---

## Constraints

- `nums.length == 2 * n`

- `1 <= n <= 500`

- `1 <= nums[i] <= 500`

---

## Problem Understanding

- **Even-Frequency Criterion:** Two elements can be paired together if and only if they have the exact same value. Therefore, all copies of any value `x` can be completely paired up if and only if `x` appears an **even** number of times (`count[x] % 2 == 0`).
- **Bounded Value Domain:** The constraints state `1 <= nums[i] <= 500`, which means we can use a small fixed-size integer array rather than a hash map or sorting.

---

## Approach

### Brute Force Approach

Sorting `nums` in `O(N log N)` time (where `N = 2 * n`) and checking adjacent pairs `nums[0] == nums[1]`, `nums[2] == nums[3]`, ..., or repeatedly searching for matching partners in `O(N^2)` time using a `visited` boolean array, does unnecessary comparison work compared to direct counting.

### Optimized Approach

Count the frequency of every element using a fixed-size integer array `int[] cnt = new int[510]`, then verify that every count in `cnt` is even (`v % 2 == 0`).

### Step-by-Step Thinking Process

1. Observe that `nums` can form `n` equal pairs if and only if every distinct integer in `nums` has an even frequency.
2. Since `1 <= nums[i] <= 500`, allocate `int[] cnt = new int[510]` initialized to zeros.
3. Iterate through `nums` and increment `++cnt[v]` for each value `v`.
4. Scan `cnt`: if any entry satisfies `v % 2 != 0`, return `false`; otherwise return `true`.

### Algorithm / Intuition

Because every pair consumes `2` identical values, a frequency `cnt[x]` leaves `0` leftover elements when `cnt[x]` is even and `1` unpairable element when `cnt[x]` is odd. Unused indices in `cnt` remain `0` (which is even: `0 % 2 == 0`), so scanning all `510` slots of `cnt` cleanly checks every present value without needing a separate key set.

---

## Dry Run

Trace on **Example 1**: `nums = [3, 2, 3, 2, 2, 2]`.

1. **Frequency pass:**
   - Process `3, 2, 3, 2, 2, 2` -> `cnt[2] = 4`, `cnt[3] = 2`, all other `cnt[idx] = 0`.
2. **Parity check pass:**
   - `cnt[2] = 4` (`4 % 2 == 0`)
   - `cnt[3] = 2` (`2 % 2 == 0`)
   - All other entries are `0` (`0 % 2 == 0`).
3. **Return:** `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(N + M)` — Where `N = nums.length` (`2 * n`) and `M = 510` is the bounded value range, counting takes `O(N)` and scanning `cnt` takes `O(M)`, which simplifies to `O(N)`.
- **Space Complexity:** `O(1)` — `cnt` has a constant size of `510` integers regardless of `nums.length`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2206divide-array-into-equal-pairs.java](./2206divide-array-into-equal-pairs.java) |

---

## Key Learnings

- Partitioning items into equal-value groups of size `k` reduces directly to checking `freq[x] % k == 0` for every distinct value `x`.
- When element values fall in a small bounded range (`[1, 500]`), a direct-indexed `int[]` array beats `HashMap<Integer, Integer>` in both speed and memory overhead.
