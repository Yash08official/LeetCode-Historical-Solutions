---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Sliding Window
---

# 2401. Longest Nice Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/longest-nice-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2401` (`2401`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array `nums` consisting of positive integers.

A subarray of `nums` is called nice if the bitwise AND of every pair of elements at distinct positions in the subarray is equal to `0`.

Return the length of the longest nice subarray. Note that a subarray is a contiguous sequence of elements, and any subarray of length 1 is always nice.

---

## Examples

### Example 1

```text
Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48]. This subarray satisfies the conditions:
- 3 AND 8 = 0.
- 3 AND 48 = 0.
- 8 AND 48 = 0.
It can be proven that no longer nice subarray can be obtained, so we return 3.
```

### Example 2

```text
Input: nums = [3,1,5,11,13]
Output: 1
Explanation: The length of the longest nice subarray is 1. Any subarray of length 1 can be chosen.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

---

## Problem Understanding

Key observations and constraints:
- `1 <= nums.length <= 10^5` and `1 <= nums[i] <= 10^9`.
- Pairwise bitwise AND being `0` means that NO two numbers in the subarray can share a `1` bit at the same position. That is, every bit position in the binary representation can be set by AT MOST ONE element across the entire subarray.
- Because `nums[i] <= 10^9 < 2^{30}`, any number has at most 30 bits.
- By the Pigeonhole Principle, since each bit can appear at most once in a nice subarray, any nice subarray can contain AT MOST 30 elements!
- This fundamental mathematical invariant means the sliding window will never exceed size 30, guaranteeing optimal linear time.

---

## Approach

### Brute Force Approach

A brute-force solution checks all pairs within every possible subarray. Because a nice subarray cannot exceed length 30, even checking all subarrays of length up to 30 takes `O(30^2 * n) = O(900 * n)` time, but a two-pointer sliding window is much simpler and runs in `O(n)` time.

### Optimized Approach

Use a sliding window `[l, r]` with a bitmask `mask` representing the bitwise OR of all elements currently inside the window. As we expand `r` from `0` to `n - 1`:
- If `(mask & nums[r]) != 0`, there is a conflicting bit. Shrink the window from the left: remove `nums[l]` by XORing `mask ^= nums[l++]` until the conflict is resolved.
- Add the current number into the window: `mask |= nums[r]`.
- Update `ans = max(ans, r - l + 1)`.
Return `ans`.

### Step-by-Step Thinking Process

1. Pairwise AND equal to 0 means no bit position is shared by two elements in the subarray.
2. Numbers are `<= 10^9 < 2^{30}`, so at most 30 bits are available. Maximum subarray length is `<= 30`.
3. Maintain a running bitmask `mask` of active bits in the current sliding window `[l, r]`.
4. When `nums[r]` introduces a set bit already in `mask`, remove elements from the left using `mask ^= nums[l++]`.
5. Once no conflict exists, include `nums[r]` with `mask |= nums[r]` and update the maximum length.

### Algorithm / Intuition

In `Solution.longestNiceSubarray`, `mask = 0` stores the bitwise OR of all elements in the current window, and `ans = 0` tracks the maximum window length. Pointers `l` and `r` define the sliding window boundaries.

For each incoming element `nums[r]`, if `(mask & nums[r]) != 0`, a bit conflict exists between `nums[r]` and at least one element in the current window. The `while` loop removes elements from the left by XORing `mask ^= nums[l++]`. Because elements in a valid nice window have completely disjoint bits, XORing out `nums[l]` perfectly resets only its bits without affecting any other elements. Once the conflict is cleared, `mask |= nums[r]` incorporates `nums[r]`, and `ans = Math.max(ans, r - l + 1)` updates the maximum length.

---

## Dry Run

Consider `nums = [1, 3, 8, 48, 10]`:
- Binary representations: `1 = 000001`, `3 = 000011`, `8 = 001000`, `48 = 110000`, `10 = 001010`.
- `r = 0`: `nums[0] = 1`. `mask = 0`. No conflict. `mask |= 1` (`mask = 1`). Window `[1]`, length 1. `ans = 1`.
- `r = 1`: `nums[1] = 3`. `mask & 3 = 1 & 3 = 1 != 0` (conflict on bit 0).
  - Remove `nums[0] = 1`: `mask ^= 1` (`mask = 0`), `l = 1`.
  - Now `mask & 3 == 0`. `mask |= 3` (`mask = 3`). Window `[3]`, length 1. `ans = 1`.
- `r = 2`: `nums[2] = 8`. `mask & 8 = 3 & 8 = 0`. No conflict.
  - `mask |= 8` (`mask = 11`). Window `[3, 8]`, length 2. `ans = 2`.
- `r = 3`: `nums[3] = 48`. `mask & 48 = 11 & 48 = 0`. No conflict.
  - `mask |= 48` (`mask = 59`). Window `[3, 8, 48]`, length 3. `ans = 3`.
- `r = 4`: `nums[4] = 10`. `mask & 10 = 59 & 10 = 10 != 0` (conflict on bit 1 and bit 3).
  - Remove `nums[1] = 3`: `mask ^= 3` (`mask = 56`), `l = 2`. `mask & 10 = 56 & 10 = 8 != 0`.
  - Remove `nums[2] = 8`: `mask ^= 8` (`mask = 48`), `l = 3`. `mask & 10 = 48 & 10 = 0`.
  - Now no conflict. `mask |= 10` (`mask = 58`). Window `[48, 10]`, length 2. `ans = 3`.
- Output: `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Both pointers `l` and `r` advance at most `n` times. The window size never exceeds 30 due to bit constraints, so the inner `while` loop runs at most 30 times across the entire algorithm.
- **Space Complexity:** `O(1)` — Only scalar variables (`ans`, `mask`, `l`, `r`) are stored.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2401longest-nice-subarray.java](./2401longest-nice-subarray.java) |

---

## Key Learnings

- Pigeonhole Principle on bits: numbers bounded by $10^9 < 2^{30}$ guarantee that any nice subarray cannot exceed 30 elements.
- Bitwise XOR removes elements cleanly from a bitwise OR mask when all active elements share no overlapping bits.
- Two-pointer sliding window combined with bitmasking provides an elegant $O(n)$ solution.
