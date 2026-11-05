---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Stack
  - Monotonic Stack
---

# 962. Maximum Width Ramp

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-width-ramp/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0962` (`962`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Stack`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, a **ramp** is a pair of indices `(i, j)` satisfying `i < j` and `nums[i] <= nums[j]`. The **width** of the ramp is `j - i`.

Return the **maximum width** among all valid ramps in `nums`, or `0` if no ramp exists.

---

## Examples

### Example 1

```text
Input: nums = [6,0,8,2,1,5]
Output: 4
Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.
```

### Example 2

```text
Input: nums = [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.
```

---

## Constraints

- `2 <= nums.length <= 5 * 10^4`

- `0 <= nums[i] <= 5 * 10^4`

---

## Problem Understanding

- **Not Nearest Greater Element:** Unlike Next Greater Element, we want the **farthest** index `j > i` where `nums[j] >= nums[i]`, maximizing `j - i`.
- **Dominance on Left Endpoints (`i`):** Suppose `i_1 < i_2` and `nums[i_1] <= nums[i_2]`. Any right endpoint `j > i_2` with `nums[j] >= nums[i_2]` also satisfies `nums[j] >= nums[i_1]` and achieves a strictly wider ramp `j - i_1 > j - i_2`! Therefore, `i_2` can **never** be the left endpoint of an optimal ramp—only indices forming a **strictly decreasing** prefix sequence need to be kept.
- **Dominance on Right Endpoints (`j`):** If we sweep `j` from right to left (`n - 1` down to `0`), the first time a candidate `i` satisfies `nums[i] <= nums[j]`, `j - i` is the **widest** ramp `i` can ever form (any earlier `j' < j` would give `j' - i < j - i`), so `i` can be popped permanently!

---

## Approach

### Brute Force Approach

Testing all pairs `(i, j)` with `0 <= i < j < n` and tracking the maximum `j - i` whenever `nums[i] <= nums[j]` takes `O(n^2)` time. With `n <= 5 * 10^4`, `~1.25 * 10^9` comparisons exceed the time limit.

### Optimized Approach

Use a two-pass **Monotonic Decreasing Stack** (`ArrayDeque<Integer> stk`): first push indices of strictly decreasing prefix minimums from left to right, then sweep `i` from `n - 1` down to `0`, popping every stack top with `nums[stk.peek()] <= nums[i]` to update `ans = Math.max(ans, i - stk.pop())`.

### Step-by-Step Thinking Process

1. Prune candidate left endpoints in a left-to-right pass (`0 .. n - 1`): push index `i` onto `stk` only if `stk` is empty or `nums[stk.peek()] > nums[i]`.
2. Notice the top of `stk` now holds the index of the smallest value in `nums` (and the largest index among the kept prefix minimums).
3. Sweep right endpoint `i` backward from `n - 1` down to `0`.
4. While `stk` is non-empty and `nums[stk.peek()] <= nums[i]`, `(stk.peek(), i)` is a valid ramp at the farthest possible right endpoint for `stk.peek()`, so update `ans = Math.max(ans, i - stk.pop())`.
5. Break early once `stk.isEmpty()` since no candidate left endpoints remain.

### Algorithm / Intuition

In `maxWidthRamp`, `stk` is built from left to right so that indices from bottom to top are strictly increasing (`i_0 < i_1 < ... < i_k`) while their values are strictly decreasing (`nums[i_0] > nums[i_1] > ... > nums[i_k]`).

During the backward sweep (`i` from `n - 1` down to `0`), `stk.peek()` is the smallest value among remaining left candidates, making it the **easiest** to satisfy `nums[stk.peek()] <= nums[i]`. Whenever it matches: (1) no future `i' < i` can give `stk.peek()` a larger width than `i - stk.peek()`, justifying `stk.pop()`, and (2) popping exposes the next larger value on `stk` so the same `i` can immediately test wider left candidates (`stk` bottomward has smaller indices!). Note that if `i == stk.peek()`, `i - stk.pop() == 0`, which safely leaves `ans >= 0` unchanged while discarding a self-pair that no `i' < i` could ever sit to the right of anyway.

---

## Dry Run

Trace on **Example 1**: `nums = [6, 0, 8, 2, 1, 5]` (`n = 6`)

1. **Pass 1 (Build Monotonic Decreasing Stack):**
   - `i = 0` (`6`): `stk` empty -> push `0`. `stk = [0]` (`nums`: `[6]`)
   - `i = 1` (`0`): `nums[0] = 6 > 0` -> push `1`. `stk = [1, 0]` (top is `1`, `nums`: `[0, 6]`)
   - `i = 2..5` (`8, 2, 1, 5`): none are `< nums[1] = 0` -> ignored.

2. **Pass 2 (Sweep Right Endpoint Backward):**
   - **`i = 5` (`nums[5] = 5`):**
     - `nums[stk.peek()] = nums[1] = 0 <= 5` -> pop `1`, `ans = max(0, 5 - 1) = 4`.
     - Next top: `nums[0] = 6 <= 5` is `false` -> `while` ends.
   - **`i = 4` (`1`), `i = 3` (`2`):** `nums[0] = 6 > nums[i]` -> no pop.
   - **`i = 2` (`nums[2] = 8`):**
     - `nums[0] = 6 <= 8` -> pop `0`, `ans = max(4, 2 - 0) = 4`.
     - `stk` is now empty -> `break`!

3. **Final Result:** Returns `ans = 4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Pass 1 scans `n` elements, Pass 2 scans at most `n` elements, and each index is pushed and popped from `stk` at most once.
- **Space Complexity:** `O(n)` — `stk` stores up to `n` indices in the worst case (when `nums` is strictly decreasing).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [962maximum-width-ramp.java](./962maximum-width-ramp.java) |

---

## Key Learnings

- For 'farthest pair `(i, j)` with `nums[i] <= nums[j]`' problems, a prefix-minimum decreasing stack paired with a right-to-left sweep solves in `O(n)` without `O(n log n)` sorting.
- Always verify why popping is safe: iterating `j` from `n - 1` down to `0` guarantees the first match for `stk.peek()` maximizes `j - stk.peek()`.
