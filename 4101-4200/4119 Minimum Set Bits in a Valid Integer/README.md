---
comments: true
difficulty: Hard
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 4119. Minimum Set Bits in a Valid Integer

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-set-bits-in-a-valid-integer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `4119` (`4119`) |
| **Difficulty** | Hard |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` of length `n` and an integer `k`.

Let `x_1, x_2, ..., x_n-k+1` denote the **bitwise AND** of each **subarray** of length `k` in `nums`, in order from left to right.

A positive integer `y` is called **valid** if `(y & x_i) != 0` for every `1 <= i <= n - k + 1`.

Return the **minimum** number of **set bits** in any **valid** integer `y`. If no valid integer exists, return -1.

---

## Examples

### Example 1

**Input:** nums = [6,7,3], k = 2

**Output:** 1

**Explanation:**

	
- The two subarrays of length `k = 2` are `[6, 7]` and `[7, 3]`.
	
- Their bitwise ANDs are `x_1 = 6 & 7 = 6` and `x_2 = 7 & 3 = 3`.
	
- `y = 2` is valid, since `2 & 6 = 2` and `2 & 3 = 2`, both non-zero.
	
- `y = 2` has 1 set bit (`"010"`), so the answer is 1.

### Example 2

**Input:** nums = [3,5,12], k = 1

**Output:** 2

**Explanation:**

	
- Since `k = 1`, each subarray has one element, so `x_1 = 3`, `x_2 = 5`, and `x_3 = 12`.
	
- `y = 9` is valid, since `9 & 3 = 1`, `9 & 5 = 1`, and `9 & 12 = 8`, all non-zero.
	
- `y = 9` has 2 set bits (`"1001"`), so the answer is 2.

### Example 3

**Input:** nums = [2,1], k = 2

**Output:** -1

**Explanation:**

	
- The only subarray of length `k = 2` is `[2, 1]`, with bitwise AND `x_1 = 2 & 1 = 0`.
	
- Since `x_1 = 0`, no `y` is valid. Thus, the answer is -1.

 

**

---

## Constraints

**

	
- `1 <= n == nums.length <= 10^5`
	
- `1 <= k <= n`
	
- `0 <= nums[i] <= 10^5`

---

## Problem Understanding

- Find the minimum number of set bits in a positive integer `y` such that for every contiguous window of length `k` in `nums`, the bitwise AND of the window has a non-zero bitwise AND with `y` (or `-1` if impossible).

---

## Approach

### Optimized Approach (Sliding Window Bit Counts + Sum Over Subsets (SOS) DP)
1. Use a sliding window of size `k` over `nums` tracking per-bit counts `count[0..16]` (`B = 17` bits): a bit is set in the window's bitwise AND iff `count[bit] == k`.
2. Record the frequency of each window AND mask in `freq[mask]`.
3. Run **Sum Over Subsets (SOS) DP** on `dp = freq.clone()` so `dp[m]` equals the number of windows whose AND mask is a submask of `m`.
4. A candidate `y` intersects every window's AND mask iff **zero** windows are completely contained inside `y`'s bitwise complement `complement = (size - 1) ^ y`, i.e., `dp[complement] == 0`.
5. Over all `y` in `[1, 2^17 - 1]` with `dp[complement] == 0`, return the minimum `Integer.bitCount(y)` (or `-1` if none).

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot B + B \cdot 2^B)$ where $B = 17$.\n- **Space Complexity:** $O(2^B)$ for `freq` and `dp` arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [4119minimum-set-bits-in-a-valid-integer.java](./4119minimum-set-bits-in-a-valid-integer.java) |

---

## Key Learnings

- Testing whether `y` hits every mask `m` (`(y & m) != 0`) is equivalent to checking that no mask `m` is a submask of `~y` (`dp[~y] == 0`), which SOS DP answers in $O(1)$ per candidate `y`.
