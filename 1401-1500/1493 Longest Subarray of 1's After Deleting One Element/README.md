---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Sliding Window
---

# 1493. Longest Subarray of 1's After Deleting One Element

**[View Problem on LeetCode](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1493` (`1493`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Sliding Window` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a binary array `nums` (containing only `0`s and `1`s). You **must delete exactly one element** from `nums`.

Return the length of the **longest contiguous subarray consisting solely of `1`s** in the resulting array (or `0` if no `1` remains).

---

## Examples

### Example 1

```text
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
```

### Example 2

```text
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
```

### Example 3

```text
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `nums[i]` is either 0 or 1.

---

## Problem Understanding

Deleting an element at index `i` glues `nums[0..i - 1]` directly next to `nums[i + 1..n - 1]`:
- Specifically, the run of consecutive `1`s ending immediately at `i - 1` merges with the run of consecutive `1`s starting immediately at `i + 1`!
- Notice why the **mandatory deletion** rule (`Example 3: [1, 1, 1] -> 2`) works out automatically under this view: even if `nums` has **no `0`s at all**, deleting index `i` still excludes `nums[i]` itself and sums only the `1`s strictly to its left plus the `1`s strictly to its right (`left + right = n - 1`).
- If `nums` has length `1` (e.g., `[1]` or `[0]`), deleting index `0` leaves `0` ones on the left and `0` ones on the right, returning `0`.

---

## Approach

### Brute Force Approach

Simulating the deletion of `nums[i]` for every index `i` (`0 <= i < n`) and scanning the remaining `n - 1` elements to find the longest streak of `1`s takes `O(n)` per index, or `O(n^2)` total time — too slow for `n = 10^5`.

### Optimized Approach

The solution uses **prefix and suffix dynamic programming arrays (`left` and `right`)**:
1. Build `left[0..n]` where `left[i]` stores the number of consecutive `1`s immediately to the **left** of index `i` (ending at `nums[i - 1]`).
2. Build `right[0..n]` where `right[i]` stores the number of consecutive `1`s starting **at** index `i` and extending right (so `right[i + 1]` is the streak immediately to the right of `i`).
3. For every deletion candidate `i` (`0 <= i < n`), compute `left[i] + right[i + 1]` and return the maximum.

### Step-by-Step Thinking Process

1. Allocate `left` and `right` of size `n + 1` filled with `0` so boundary lookups (`left[0]` and `right[n]`) require no out-of-bounds checks.
2. Sweep left-to-right (`i = 1..n`): if `nums[i - 1] === 1`, extend the streak `left[i] = left[i - 1] + 1`; otherwise leave `left[i] = 0`.
3. Sweep right-to-left (`i = n - 1..0`): if `nums[i] === 1`, extend the streak `right[i] = right[i + 1] + 1`; otherwise leave `right[i] = 0`.
4. Evaluate deleting each index `i` (`0 <= i < n`): the merged streak of `1`s across deleted index `i` has exact length `left[i] + right[i + 1]`.
5. Track `ans = Math.max(ans, left[i] + right[i + 1])` and return `ans`.

### Algorithm / Intuition

Look at how cleanly the 1-shifted indexing in `left` and `right` aligns:
- `left[i]` looks at `nums[0..i-1]` (ending at `i - 1`).
- `right[i + 1]` looks at `nums[i+1..n-1]` (starting at `i + 1`).

Neither term includes `nums[i]`! So `left[i] + right[i + 1]` is **always** the exact length of the contiguous block of `1`s formed at the seam when `nums[i]` is deleted — whether `nums[i]` was a `0` bridging two `1`-islands or a `1` sacrificed from an all-`1`s array.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 1, 0, 1]` (`n = 4`)

1. **Build `left` (`i = 1..4`)**:
   - `i = 1` (`nums[0] = 1`): `left[1] = 1`
   - `i = 2` (`nums[1] = 1`): `left[2] = 2`
   - `i = 3` (`nums[2] = 0`): `left[3] = 0`
   - `i = 4` (`nums[3] = 1`): `left[4] = 1`
   - `left = [0, 1, 2, 0, 1]`
2. **Build `right` (`i = 3..0`)**:
   - `i = 3` (`nums[3] = 1`): `right[3] = 1`
   - `i = 2` (`nums[2] = 0`): `right[2] = 0`
   - `i = 1` (`nums[1] = 1`): `right[1] = 1`
   - `i = 0` (`nums[0] = 1`): `right[0] = 2`
   - `right = [2, 1, 0, 1, 0]`
3. **Try Deleting Each `i` (`left[i] + right[i + 1]`)**:
   - `i = 0`: `left[0] + right[1] = 0 + 1 = 1`
   - `i = 1`: `left[1] + right[2] = 1 + 0 = 1`
   - `i = 2`: `left[2] + right[3] = 2 + 1 = 3`
   - `i = 3`: `left[3] + right[4] = 0 + 0 = 0`

Maximum `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Three sequential `O(n)` loops over the array of length `n`.
- **Space Complexity:** `O(n)` — Two auxiliary arrays `left` and `right` of length `n + 1` are allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1493longest-subarray-of-1s-after-deleting-one-element.js](./1493longest-subarray-of-1s-after-deleting-one-element.js) |

---

## Key Learnings

- Precomputing `left` and `right` streak arrays is a versatile pattern for any 'delete or flip at most one element' problem (e.g., Maximum Subarray Sum with One Deletion).
- Sizing `left` and `right` to `n + 1` eliminates edge-case `if (i > 0)` / `if (i + 1 < n)` guards when combining `left[i] + right[i + 1]`.
- If `O(1)` space is needed, a sliding window maintaining at most one `0` (`right - left` window span minus 1) achieves the same `O(n)` time.
