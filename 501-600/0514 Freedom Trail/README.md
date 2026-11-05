---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
  - Depth-First Search
  - Breadth-First Search
---

# 514. Freedom Trail

**[View Problem on LeetCode](https://leetcode.com/problems/freedom-trail/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0514` (`514`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Depth-First Search`, `Breadth-First Search` |
| **Solution Language** | Java |

---

## Problem Description

In the video game Fallout 4, the quest **"Road to Freedom"** requires players to reach a metal dial called the **"Freedom Trail Ring"** and use the dial to spell a specific keyword to open the door.

Given a string `ring` that represents the code engraved on the outer ring and another string `key` that represents the keyword that needs to be spelled, return *the minimum number of steps to spell all the characters in the keyword*.

Initially, the first character of the ring is aligned at the `"12:00"` direction (index `0`). You should spell all the characters in `key` one by one by rotating `ring` clockwise or anticlockwise to make each character of the string key aligned at the `"12:00"` direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character `key[i]`:
1. You can rotate the ring clockwise or anticlockwise by one place, which counts as **one step**. The final purpose of the rotation is to align one of `ring`'s characters at the `"12:00"` direction, where this character must equal `key[i]`.
2. If the character `key[i]` has been aligned at the `"12:00"` direction, press the center button to spell, which also counts as **one step**. After the pressing, you could begin to spell the next character in the key (next stage).

---

## Examples

### Example 1

```text
Input: ring = "godding", key = "gd"
Output: 4
Explanation:
For the first key character 'g', since it is already in place at index 0, we just need 1 step to press the button.
For the second key character 'd', we need to rotate the ring "godding" anticlockwise by two steps to align 'd' at index 2 (or clockwise by 5 steps). The minimum rotation distance is 2.
Also, we need 1 more step for button pressing.
Total = 1 + 2 + 1 = 4 steps.
```

### Example 2

```text
Input: ring = "godding", key = "godding"
Output: 13
```

---

## Constraints

- `1 <= ring.length, key.length <= 100`
- `ring` and `key` consist of only lowercase English letters.
- It is guaranteed that `key` could always be spelled by rotating `ring`.

---

## Problem Understanding

- The ring is circular of length `n`. Distance between position `j` and position `k` is the minimum of direct distance `|j - k|` and wrap-around distance `n - |j - k|`.
- Every character spelled requires exactly 1 button press. If `key` has length `m`, there will be exactly `m` button presses in total, plus the sum of rotation steps between consecutive target indices.
- A character in `key` may appear multiple times in `ring`. Greedily picking the nearest character can lead to a suboptimal overall path for subsequent characters, requiring dynamic programming or memoized search to find the global optimum.

---

## Approach

### Brute Force Approach

Explore every occurrence of `key[i]` on the ring recursively. At each step `i`, try all positions matching `key[i]`. With up to `n` occurrences per character across `m` characters, the recursion tree grows to `O(n^m)`, which results in Time Limit Exceeded for `m, n <= 100`.

### Optimized Approach

Use **Dynamic Programming**:
- Define `f[i][j]` as the minimum steps to spell the prefix `key[0..i]` ending with the ring aligned at index `j` (where `ring.charAt(j) == key.charAt(i)`).
- Precompute indices for each character: `pos[c]` stores all indices in `ring` where character `c` occurs.
- Base case (`i = 0`): For each index `j` in `pos[key[0]]`, the starting position is `0`. The cost is `min(j, n - j) + 1` (rotation + 1 press).
- State transitions (`i = 1 .. m - 1`):
  $$f[i][j] = \min_{k \in pos[key[i - 1]]} \left( f[i - 1][k] + \min(|j - k|, n - |j - k|) + 1
ight)$$
- Final answer: The minimum value among `f[m - 1][j]` for all `j` in `pos[key[m - 1]]`.

### Step-by-Step Thinking Process

1. Map each character `'a'..'z'` to a list of its occurrence indices in `ring` to avoid scanning the entire ring repeatedly.
2. Initialize DP table `f[m][n]` with a large sentinel value `(1 << 30)`.
3. Fill base row `f[0][j]` for every `j` where `ring[j] == key[0]`.
4. Iterate `i` from `1` to `m - 1`:
   - For every current position `j` matching `key[i]`:
     - Compare transitions from every previous position `k` matching `key[i - 1]`.
     - Calculate circular step cost: `Math.min(Math.abs(j - k), n - Math.abs(j - k)) + 1`.
5. Return the minimum value in `f[m - 1]`.

### Algorithm / Intuition

The circular distance formula `Math.min(Math.abs(j - k), n - Math.abs(j - k))` captures the shortest route between any two dial positions on a ring of length `n`. Dynamic programming memoizes the shortest cumulative cost to reach each valid dial configuration after spelling `i` characters.

---

## Dry Run

Tracing **Example 1**: `ring = "godding"`, `key = "gd"`, `n = 7`, `m = 2`.
1. **Index positions:**
   - `'g'`: indices `[0, 6]`
   - `'d'`: indices `[2, 3]`
2. **Base row (`i = 0`, char `'g'`):**
   - `j = 0`: `min(0, 7) + 1 = 1` -> `f[0][0] = 1`
   - `j = 6`: `min(6, 1) + 1 = 2` -> `f[0][6] = 2`
3. **Row 1 (`i = 1`, char `'d'`):**
   - For `j = 2`:
     - From `k = 0`: `f[0][0] + min(2, 5) + 1 = 1 + 2 + 1 = 4`
     - From `k = 6`: `f[0][6] + min(4, 3) + 1 = 2 + 3 + 1 = 6`
     - `f[1][2] = min(4, 6) = 4`
   - For `j = 3`:
     - From `k = 0`: `f[0][0] + min(3, 4) + 1 = 1 + 3 + 1 = 5`
     - From `k = 6`: `f[0][6] + min(3, 4) + 1 = 2 + 3 + 1 = 6`
     - `f[1][3] = min(5, 6) = 5`
4. **Answer:** `min(f[1][2], f[1][3]) = min(4, 5) = 4`. Matches Example 1 output.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n^2)` in the worst case (when all characters in `ring` are identical), where `m = key.length()` and `n = ring.length()`. With `m, n <= 100`, total operations are bounded by `100 * 100 * 100 = 10^6`, executing comfortably within 10 ms.
- **Space Complexity:** `O(m * n)` for the DP table `f`, plus `O(n)` auxiliary space for character position lists.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [514freedom-trail.java](./514freedom-trail.java) |

---

## Key Learnings

- Ring/circular buffer distance between indices `j` and `k` in an array of length `n` is cleanly computed as `min(|j - k|, n - |j - k|)`.
- When multiple choices exist at each step and greedy selection fails due to downstream cost dependencies, multi-stage DP effectively aggregates optimal subpaths.
- Pre-grouping character indices (`List<Integer>[] pos`) bounds the inner transition loops to only relevant dial positions.
