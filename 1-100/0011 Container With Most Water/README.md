---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Greedy
---

# 11. Container With Most Water

**[View Problem on LeetCode](https://leetcode.com/problems/container-with-most-water/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0011` (`11`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `height` of length `n`, where each element `height[i]` represents a vertical wall drawn from `(i, 0)` to `(i, height[i])`.

Choose two distinct walls `i` and `j` that, together with the horizontal x-axis, hold the **maximum area of water** without slanting. Return that maximum water area.

---

## Examples

### Example 1

```text
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

### Example 2

```text
Input: height = [1,1]
Output: 1
```

---

## Constraints

- `n == height.length`

- `2 <= n <= 10^5`

- `0 <= height[i] <= 10^4`

---

## Problem Understanding

- **Area formula:** Between indices `i` and `j` (`i < j`), the horizontal width is `j - i`, and water spills over the shorter wall, making the height `min(height[i], height[j])`. Thus `Area(i, j) = min(height[i], height[j]) * (j - i)`.
- **Scale:** `n` can reach `10^5`, ruling out quadratic `O(n^2)` pair enumeration.
- **Limiting factor:** Moving the **taller** wall inward can never increase the area because width strictly shrinks (`j - i` decreases by `1`) while height remains capped at or below the unchanged shorter wall.

---

## Approach

### Brute Force Approach

Evaluate `Math.min(height[i], height[j]) * (j - i)` across all `n * (n - 1) / 2` pairs `(i, j)` using two nested loops and track the maximum. With `n = 10^5`, roughly `5 * 10^9` comparisons exceed the time limit (`O(n^2)`).

### Optimized Approach

Place two pointers `i = 0` and `j = n - 1` at the widest container and greedily move whichever pointer points to the **shorter** wall inward at each step.

### Step-by-Step Thinking Process

1. Start with maximum possible width: `i = 0` and `j = height.length - 1`, initializing `ans = 0`.
2. While `i < j`, compute the current container area `t = Math.min(height[i], height[j]) * (j - i)` and update `ans = Math.max(ans, t)`.
3. Observe that if `height[i] < height[j]`, pairing `i` with any index `k` (`i < k < j`) produces width `k - i < j - i` and height `<= height[i]`, so `i` can never form a larger container with any remaining partner — safely increment `++i`.
4. Otherwise (`height[i] >= height[j]`), symmetrically `j` cannot form a better container with any `k` (`i < k < j`), so decrement `--j`.

### Algorithm / Intuition

In `11container-with-most-water.java`, `i` and `j` start `n - 1` units apart and step toward each other once per iteration. What happens when `height[i] == height[j]`? The `else` branch decrements `j` (`--j`). That is completely safe because neither `i` nor `j` alone can beat their current area `height[i] * (j - i)` unless **both** walls eventually get replaced by strictly taller inner walls, which moving `--j` first still reaches!

---

## Dry Run

**Input:** `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`

| Step | `i` (`height[i]`) | `j` (`height[j]`) | Width `j - i` | `t = min * width` | `ans` | Pointer Move |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `0` (`1`) | `8` (`7`) | `8` | `1 * 8 = 8` | `8` | `1 < 7` -> `++i` (`1`) |
| `2` | `1` (`8`) | `8` (`7`) | `7` | `7 * 7 = 49` | `49` | `8 >= 7` -> `--j` (`7`) |
| `3` | `1` (`8`) | `7` (`3`) | `6` | `3 * 6 = 18` | `49` | `8 >= 3` -> `--j` (`6`) |
| `4` | `1` (`8`) | `6` (`8`) | `5` | `8 * 5 = 40` | `49` | `8 >= 8` -> `--j` (`5`) |
| `5` | `1` (`8`) | `5` (`4`) | `4` | `4 * 4 = 16` | `49` | `8 >= 4` -> `--j` (`4`) |
| `6` | `1` (`8`) | `4` (`5`) | `3` | `5 * 3 = 15` | `49` | `8 >= 5` -> `--j` (`3`) |
| `7` | `1` (`8`) | `3` (`2`) | `2` | `2 * 2 = 4` | `49` | `8 >= 2` -> `--j` (`2`) |
| `8` | `1` (`8`) | `2` (`6`) | `1` | `6 * 1 = 6` | `49` | `8 >= 6` -> `--j` (`1`) |

Loop terminates when `i == j` (`1 == 1`). **Output:** `49`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each iteration increments `i` or decrements `j`, executing exactly `n - 1` constant-time steps.
- **Space Complexity:** `O(1)` — Only integer variables `i`, `j`, `ans`, and `t` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [11container-with-most-water.java](./11container-with-most-water.java) |

---

## Key Learnings

- Greedy elimination works with two pointers whenever discarding one endpoint provably rules out an entire row/column of worse pairs.
- Starting from maximum width ensures the only way to beat `ans` inward is by finding strictly taller walls, justifying discarding the shorter wall.
- Equal-height walls (`height[i] == height[j]`) can move either pointer safely because any superior future pair must exclude both.
