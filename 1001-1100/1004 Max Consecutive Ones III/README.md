---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Sliding Window
  - Prefix Sum
---

# 1004. Max Consecutive Ones III

**[View Problem on LeetCode](https://leetcode.com/problems/max-consecutive-ones-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1004` (`1004`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Sliding Window`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a binary array `nums` (containing only `0`s and `1`s) and an integer `k`, return the **maximum number of consecutive `1`s** you can obtain in `nums` if you are allowed to flip at most `k` `0`s to `1`s.

---

## Examples

### Example 1

```text
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

### Example 2

```text
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `nums[i]` is either 0 or 1.

- `0 <= k <= nums.length`

---

## Problem Understanding

- **Subarray Reformulation:** Flipping at most `k` `0`s to get consecutive `1`s is completely equivalent to finding the **longest contiguous subarray** `[left .. right]` that contains **at most `k` zeros**.
- **Counting Ones vs. Zeros:** In any window `[left .. right]` of length `L = right - left + 1` containing `onesCount` ones, the number of zeros is `L - onesCount`. Thus `zeros <= k` is identical to `right - left + 1 <= k + onesCount`.

---

## Approach

### Brute Force Approach

Checking every subarray `[i .. j]` (`0 <= i <= j < n`) and stopping each inner scan once more than `k` zeros are seen takes `O(n^2)` time—up to `5 * 10^9` iterations for `n = 10^5`.

### Optimized Approach

Use a **Non-Shrinking Sliding Window** (`left`, `right`, `onesCount`): expand `right` by `1` each step, and whenever `right - left + 1 > k + onesCount` (meaning zeros exceed `k`), shift `left` right by `1` so the window never shrinks below the best width found so far.

### Step-by-Step Thinking Process

1. Maintain window bounds `[left, right]` and the count of `1`s inside the window (`onesCount`).
2. Advance `right` from `0` to `nums.length - 1`, incrementing `onesCount` if `nums[right] === 1`.
3. Check whether the window has too many zeros: `(right - left + 1) - onesCount > k`, written without subtraction on `onesCount` as `right - left + 1 > k + onesCount`.
4. Instead of a `while` loop that shrinks the window back to validity, use a single `if`: advance `left` by `1` (decrementing `onesCount` if `nums[left] === 1`). Because we only care about **exceeding** the best length seen so far, preserving the maximum width achieved to date is sufficient!
5. Update `maxOnes = Math.max(maxOnes, right - left + 1)` at each step.

### Algorithm / Intuition

In `longestOnes`, notice the subtle use of `if (right - left + 1 > k + onesCount)` rather than `while`:
- Whenever a valid window reaches width `W`, `maxOnes` becomes `W`.
- If the next `right` step introduces an invalid `(k + 1)`-th zero, `right` moves `+1` and the `if` block moves `left` `+1`. Thus the window slides forward **maintaining constant width `W`** (even if it temporarily still holds `> k` zeros!).
- Width can only **grow** to `W + 1` on a step where `right - left + 1 <= k + onesCount` holds—meaning that new `(W + 1)`-length window genuinely has `<= k` zeros!

Therefore, `maxOnes` (and in fact `right - left + 1` at the end of the loop) equals the exact maximum valid window length.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]`, `k = 2`

| `right` | `nums[right]` | `onesCount` (pre-`if`) | `len > 2 + ones`? | Action on `left` | `[left..right]` | `maxOnes` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `0..2` | `1, 1, 1` | `1 -> 2 -> 3` | No (`3 <= 5`) | stay `0` | `[0..2]` (len `3`) | `3` |
| `3` | `0` | `3` | No (`4 <= 5`) | stay `0` | `[0..3]` (len `4`) | `4` |
| `4` | `0` | `3` | No (`5 <= 5`) | stay `0` | `[0..4]` (len `5`) | `5` |
| `5` | `0` | `3` | Yes (`6 > 5`) | `nums[0]=1 -> ones=2, left=1` | `[1..5]` (len `5`) | `5` |
| `6` | `1` | `3` | Yes (`6 > 5`) | `nums[1]=1 -> ones=2, left=2` | `[2..6]` (len `5`) | `5` |
| `7` | `1` | `3` | Yes (`6 > 5`) | `nums[2]=1 -> ones=2, left=3` | `[3..7]` (len `5`) | `5` |
| `8` | `1` | `3` | Yes (`6 > 5`) | `nums[3]=0 -> ones=3, left=4` | `[4..8]` (len `5`) | `5` |
| `9` | `1` | `4` | No (`6 <= 6`) | stay `4` | `[4..9]` (len `6`) | `6` |
| `10` | `0` | `4` | Yes (`7 > 6`) | `nums[4]=0 -> ones=4, left=5` | `[5..10]` (len `6`) | `6` |

- **Final Result:** Returns `maxOnes = 6`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates `right` once over `nums` with `O(1)` operations per element.
- **Space Complexity:** `O(1)` — Uses only constant integer variables (`maxOnes`, `left`, `onesCount`, `right`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1004max-consecutive-ones-iii.js](./1004max-consecutive-ones-iii.js) |

---

## Key Learnings

- In maximum-length sliding window problems, replacing `while (invalid)` with `if (invalid)` creates a **monotonic non-shrinking window** whose size only grows when a strictly wider valid subarray is discovered.
- Do **not** use the non-shrinking `if` trick when counting the *number* of valid subarrays or finding the *minimum* window—those require every intermediate window to be strictly valid via `while`.
