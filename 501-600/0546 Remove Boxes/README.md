---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Memoization
---

# 546. Remove Boxes

**[View Problem on LeetCode](https://leetcode.com/problems/remove-boxes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0546` (`546`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Memoization` |
| **Solution Language** | Java |

---

## Problem Description

You are given several `boxes` with different colors represented by different positive numbers.

You may experience several rounds to remove boxes until there is no box left. Each time you can choose some continuous boxes with the same color (i.e., composed of `k` boxes, `k >= 1`), remove them and get `k * k` points.

Return *the maximum points you can get*.

---

## Examples

### Example 1

```text
Input: boxes = [1,3,2,2,2,3,4,3,1]
Output: 23
Explanation:
[1, 3, 2, 2, 2, 3, 4, 3, 1]
----> [1, 3, 3, 4, 3, 1] (3*3=9 points by removing 2, 2, 2)
----> [1, 3, 3, 3, 1] (1*1=1 points by removing 4)
----> [1, 1] (3*3=9 points by removing 3, 3, 3)
----> [] (2*2=4 points by removing 1, 1)
Total points = 9 + 1 + 9 + 4 = 23.
```

### Example 2

```text
Input: boxes = [1,1,1]
Output: 9
Explanation: Remove all three boxes of color 1 at once: 3 * 3 = 9.
```

### Example 3

```text
Input: boxes = [1]
Output: 1
```

---

## Constraints

- `1 <= boxes.length <= 100`
- `1 <= boxes[i] <= 100`

---

## Problem Understanding

- Removing a contiguous segment of `k` boxes of identical color yields `k^2` points. Because $(a + b)^2 > a^2 + b^2$ for positive integers, it is always beneficial to merge separated boxes of the same color into a larger contiguous group before removal.
- Standard 2D interval DP `dp[i][j]` (maximum points to clear subarray `boxes[i..j]`) fails because the optimal strategy for `boxes[i..j]` depends heavily on whether boxes outside `[i..j]` can later attach to elements inside `[i..j]`.
- Thus, the state must incorporate external context: how many boxes following index `j` have the exact same color as `boxes[j]`.

---

## Approach

### Brute Force Approach

Simulating all sequences of valid contiguous box removals results in exponential branching $O(n!)$, which becomes intractable for $n > 15$.

### Optimized Approach (3D Interval DP / Memoization)

Define `dfs(i, j, k)` as the maximum points obtained from clearing `boxes[i..j]` given that there are already `k` boxes adjacent to and following `boxes[j]` that have the **same color** as `boxes[j]`:
1. **Contiguous run compression:** While `i < j` and `boxes[j] == boxes[j - 1]`, decrement `j` and increment `k`. This groups identical adjacent tail elements together immediately.
2. **Base case:** If `i > j`, return `0`.
3. **Memoization check:** If `f[i][j][k] > 0`, return `f[i][j][k]`.
4. **Strategy 1 (Direct removal):** Remove `boxes[j]` along with the `k` matching boxes attached to it. Points gained: `(k + 1) * (k + 1)`. The remaining subproblem is `dfs(i, j - 1, 0)`.
5. **Strategy 2 (Split & Merge):** Look for an earlier box `boxes[h]` (`i <= h < j`) that shares the same color as `boxes[j]`. Clear the intervening segment `boxes[h + 1 .. j - 1]` completely (earning `dfs(h + 1, j - 1, 0)`), which brings `boxes[h]` adjacent to `boxes[j]`, now having `k + 1` matching boxes to its right: `dfs(i, h, k + 1)`.
6. Take the maximum over Strategy 1 and all valid split points `h` in Strategy 2.

### Step-by-Step Thinking Process

1. Recognize that interval DP needs external context `k` (count of identical boxes attached to the right boundary).
2. Compress consecutive duplicate colors at the right end (`b[j] == b[j - 1]`) to shrink state space.
3. Compare:
   - Option A: Clear rightmost cluster `(k + 1)^2` and solve remaining prefix `[i, j - 1]`.
   - Option B: For each `h` where `b[h] == b[j]`, clear middle `[h + 1, j - 1]`, merging `b[h]` with the `k + 1` right elements.
4. Cache every state `(i, j, k)` in `f[n][n][n]`.

### Algorithm / Intuition

By carrying `k` (the count of matching elements accumulated to the right of `boxes[j]`), we preserve the possibility of clearing intermediate obstacles to form larger, super-quadratic reward clusters.

---

## Dry Run

Tracing **Example 2**: `boxes = [1, 1, 1]`, `n = 3`.
1. Call `dfs(0, 2, 0)`:
   - While loop: `b[2] == b[1]` -> `j = 1, k = 1`.
   - While loop: `b[1] == b[0]` -> `j = 0, k = 2`.
2. Now `i = 0, j = 0, k = 2`.
3. Strategy 1: `dfs(0, -1, 0) + (2 + 1)^2 = 0 + 9 = 9`.
4. Loop `h` from `0` to `-1` does not execute.
5. Memoize `f[0][0][2] = 9`.
6. Return `9`. Matches Example 2 output.

---

## Complexity Analysis

- **Time Complexity:** `O(n^4)` in the worst case (number of states is `O(n^3)` and computing each state explores up to `n` split points `h`). With `n <= 100` and aggressive duplicate run compression, the actual visited state count is far smaller, easily executing well within time limits.
- **Space Complexity:** `O(n^3)` for the 3D memoization array `f[n][n][n]`, plus `O(n)` recursion stack depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [546remove-boxes.java](./546remove-boxes.java) |

---

## Key Learnings

- When subproblem solutions depend on interactions with outside elements, augmenting standard interval DP states `(i, j)` with boundary context `k` is the canonical pattern.
- Compressing contiguous identical characters/elements before branching drastically reduces the recursion depth and redundant state evaluations.
- Quadratic scoring functions ($k^2$) strongly incentivize eliminating intervening elements to achieve maximal cluster size.
