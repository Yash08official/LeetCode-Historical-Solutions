---
comments: true
difficulty: Hard
tags:
  - Array
  - Stack
  - Monotonic Stack
  - Range Minimum/Maximum Query
---

# 84. Largest Rectangle in Histogram

**[View Problem on LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0084` (`84`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Stack`, `Monotonic Stack`, `Range Minimum/Maximum Query` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `heights` where `heights[i]` represents the height of the `i`-th vertical bar in a histogram and every bar has width `1`, return the area of the largest axis-aligned rectangle that fits completely inside the histogram bars.

---

## Examples

### Example 1

```text
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
```

### Example 2

```text
Input: heights = [2,4]
Output: 4
```

---

## Constraints

- `1 <= heights.length <= 10^5`

- `0 <= heights[i] <= 10^4`

---

## Problem Understanding

- Any maximal rectangle inside the histogram must be limited vertically by the height of at least one bar `heights[i]` fully contained within it.
- If we fix bar `i` as the shortest bar determining the rectangle's height `heights[i]`, we want to extend horizontally as far left and right as possible until hitting a bar strictly shorter than `heights[i]`.
- Specifically, if `left[i]` is the nearest index `< i` with `heights[left[i]] < heights[i]` (or `-1` if none) and `right[i]` is the nearest index `> i` with `heights[right[i]] < heights[i]` (or `n` if none), the widest rectangle of height `heights[i]` has width `right[i] - left[i] - 1`.

---

## Approach

### Brute Force Approach

For each bar `i`, scanning linearly left and right to find the first shorter bar takes `O(n)` time per bar, or `O(n^2)` overall (alternatively enumerating all pairs `(l, r)` and tracking `minHeight` also takes `O(n^2)`). With `heights.length <= 10^5`, `O(n^2)` requires up to `10^10` operations and times out.

### Optimized Approach

Use a **Monotonic Increasing Stack** (`stk`) in a single left-to-right pass to populate `left[i]` and `right[i]` boundary arrays, then compute the maximum `heights[i] * (right[i] - left[i] - 1)` across all bars in `O(n)` time.

### Step-by-Step Thinking Process

1. Create `left` of length `n` and `right` of length `n` initialized to `n` (the default right boundary if no shorter bar appears to the right).
2. Maintain a stack `stk` of indices whose `heights` are strictly increasing from bottom to top.
3. As we visit index `i`, while the stack top `top` has `heights[top] >= heights[i]`, pop `top` and set `right[top] = i`.
4. Subtlety with equal heights (`>=`): if `heights[top] == heights[i]`, `right[top]` is cut short at `i`, **but** because `top` was popped, `left[i]` reaches all the way back to the true strictly smaller element before `top`, ensuring index `i` (the rightmost equal bar in that run) captures the full optimal width!
5. Set `left[i]` to the new stack top (or `-1` if `stk` is empty), push `i`, and after the pass take the maximum `heights[i] * (right[i] - left[i] - 1)`.

### Algorithm / Intuition

In `largestRectangleArea(heights)`, `stk` holds indices in strictly increasing order of height:
- `right` starts filled with `n` (`new Array(n).fill(n)`), so any index still left on `stk` at the end automatically retains `right[idx] = n`.
- During the first loop `for (let i = 0; i < n; ++i)`, `while (stk.length && heights[stk[stk.length - 1]] >= heights[i])` pops every index whose bar cannot extend past `i` (or yields its span to an equal bar at `i`) and assigns `right[stk.pop()] = i`.
- Immediately afterward, `stk` contains only bars strictly shorter than `heights[i]`, so `left[i] = stk.length ? stk[stk.length - 1] : -1` records the exact previous strictly smaller index.
- Finally, the second loop evaluates `heights[i] * (right[i] - left[i] - 1)` for every bar `i` and updates `res`.

---

## Dry Run

Tracing Example 1 with `heights = [2, 1, 5, 6, 2, 3]` (`n = 6`, `right = [6, 6, 6, 6, 6, 6]`):

| `i` | `heights[i]` | Popped indices (`right[p] = i`) | `left[i]` | `stk` after push |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `2` | None | `-1` | `[0]` |
| `1` | `1` | `0` (`right[0] = 1`) | `-1` | `[1]` |
| `2` | `5` | None | `1` | `[1, 2]` |
| `3` | `6` | None | `2` | `[1, 2, 3]` |
| `4` | `2` | `3` (`right[3] = 4`), `2` (`right[2] = 4`) | `1` | `[1, 4]` |
| `5` | `3` | None | `4` | `[1, 4, 5]` |

Resulting arrays:
- `left  = [-1, -1, 1, 2, 1, 4]`
- `right = [ 1,  6, 4, 4, 6, 6]`
- Areas `heights[i] * (right[i] - left[i] - 1)`:
  - `i = 0`: `2 * (1 - (-1) - 1) = 2`
  - `i = 1`: `1 * (6 - (-1) - 1) = 6`
  - `i = 2`: `5 * (4 - 1 - 1) = 10` **(Max)**
  - `i = 3`: `6 * (4 - 2 - 1) = 6`
  - `i = 4`: `2 * (6 - 1 - 1) = 8`
  - `i = 5`: `3 * (6 - 4 - 1) = 3`

Returns `res = 10`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each index `0 .. n - 1` is pushed onto `stk` once and popped at most once, followed by a single `O(n)` area-calculation pass.
- **Space Complexity:** `O(n)` — Arrays `left` and `right` and stack `stk` each hold at most `n` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [84largest-rectangle-in-histogram.js](./84largest-rectangle-in-histogram.js) |

---

## Key Learnings

- A monotonic increasing stack finds both **previous smaller** (`left[i]`) and **next smaller** (`right[i]`) boundaries in a single pass.
- Using `>=` when popping guarantees that in runs of equal heights, the rightmost equal element obtains both the true `left` and true `right` boundaries, preserving the exact global maximum.
- Pre-filling `right` with `n` handles remaining elements on the stack automatically without needing a post-loop cleanup pass.
