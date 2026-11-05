---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Prefix Sum
---

# 2381. Shifting Letters II

**[View Problem on LeetCode](https://leetcode.com/problems/shifting-letters-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2381` (`2381`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` of lowercase English letters and a 2D integer array `shifts` where `shifts[i] = [start_i, end_i, direction_i]`. For each shift, modify characters in `s` from index `start_i` to index `end_i` (inclusive):
- If `direction_i = 1`, shift characters forward (e.g., `'a'` becomes `'b'`, and `'z'` wraps around to `'a'`).
- If `direction_i = 0`, shift characters backward (e.g., `'b'` becomes `'a'`, and `'a'` wraps around to `'z'`).

Return the final string after all shifts have been applied.

---

## Examples

### Example 1

```text
Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
Output: "ace"
Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".
```

### Example 2

```text
Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
Output: "catz"
Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".
```

---

## Constraints

- `1 <= s.length, shifts.length <= 5 * 10^4`

- `shifts[i].length == 3`

- `0 <= start_i <= end_i < s.length`

- `0 <= direction_i <= 1`

- `s` consists of lowercase English letters.

---

## Problem Understanding

Key observations and constraints:
- `1 <= s.length, shifts.length <= 5 * 10^4`.
- Multiple overlapping range updates on an array of characters. Applying each shift directly across range `[start, end]` takes `O(length)` per shift, resulting in `O(s.length * shifts.length) ~ 2.5 * 10^9` operations, which will cause Time Limit Exceeded.
- Shifts are linear and commutative: shifting forward by 1 is `+1`, shifting backward by 1 is `-1`. The net displacement at any character is the algebraic sum of all overlapping shifts.
- This is the classic range update problem, solvable via a Difference Array in `O(shifts.length + s.length)` time.
- Modulo arithmetic on character shifts must handle negative displacements properly: `(original - 'a' + net_shift % 26 + 26) % 26`.

---

## Approach

### Brute Force Approach

A brute-force solution iterates through each shift in `shifts` and modifies every character from `start_i` to `end_i` one by one. In the worst case where every shift covers the entire string, the running time is `O(m * n)` where `n = s.length` and `m = shifts.length`. With `n, m = 50,000`, this takes `2.5 * 10^9` operations and results in TLE.

### Optimized Approach

Use a Difference Array `int[] d = new int[n + 1]`. For each shift `[start, end, dir]`:
- Determine shift value: if `dir == 1`, value is `+1`; if `dir == 0`, value is `-1`.
- Add the shift value at `d[start]` and subtract it at `d[end + 1]` in `O(1)` time.
After processing all shifts, compute the prefix sums of `d` in a single pass to obtain the net displacement for every index `i`. Finally, compute each new character using `(s.charAt(i) - 'a' + d[i] % 26 + 26) % 26` and append to a `StringBuilder`.

### Step-by-Step Thinking Process

1. Multiple range additions on an array strongly suggest using a difference array.
2. Represent direction 0 as `-1` and direction 1 as `+1`.
3. For each query `[start, end, dir]`, update `d[start] += val` and `d[end + 1] -= val`.
4. Compute prefix sums: `d[i] += d[i - 1]` to recover net displacement at each index.
5. Shift each character circularly using safe positive modulo: `(char_val + net % 26 + 26) % 26`.

### Algorithm / Intuition

In `Solution.shiftingLetters`, `int[] d = new int[n + 1]` is initialized. For each shift `e` in `shifts`: if `e[2] == 0`, decrementing `e[2]` converts `0` into `-1`. Then `d[e[0]] += e[2]` and `d[e[1] + 1] -= e[2]` record the boundary changes in `O(1)`.

Next, a prefix sum loop `for (int i = 1; i <= n; ++i) d[i] += d[i - 1]` computes the cumulative net shift for each index `i`. Finally, a `StringBuilder ans` constructs the transformed string: for each character, `int j = (s.charAt(i) - 'a' + d[i] % 26 + 26) % 26` calculates the 0-25 alphabet index, and `(char) ('a' + j)` appends the new character.

---

## Dry Run

Consider `s = "abc"` (`n = 3`), `shifts = [[0,1,0],[1,2,1],[0,2,1]]`:
- Difference array `d = [0, 0, 0, 0]`.
- Shift 1 `[0, 1, 0]`: direction 0 -> `-1`. `d[0] += -1`, `d[2] -= (-1) = +1` -> `d = [-1, 0, 1, 0]`.
- Shift 2 `[1, 2, 1]`: direction 1 -> `+1`. `d[1] += 1`, `d[3] -= 1` -> `d = [-1, 1, 1, -1]`.
- Shift 3 `[0, 2, 1]`: direction 1 -> `+1`. `d[0] += 1`, `d[3] -= 1` -> `d = [0, 1, 1, -2]`.
- Prefix sums on `d`:
  - `d[0] = 0`
  - `d[1] = 0 + 1 = 1`
  - `d[2] = 1 + 1 = 2`
- Character adjustments:
  - `i = 0`: 'a' shifted by `0` -> `'a'`.
  - `i = 1`: 'b' shifted by `1` -> `'c'`.
  - `i = 2`: 'c' shifted by `2` -> `'e'`.
- Output: `"ace"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m)` — where `n = s.length()` and `m = shifts.length`. Processing `m` shifts takes `O(m)`. Computing prefix sums takes `O(n)`. Building the resulting string takes `O(n)`. Total time is `O(n + m)`.
- **Space Complexity:** `O(n)` — Required for the difference array `d` of size `n + 1` and the `StringBuilder` of size `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2381shifting-letters-ii.java](./2381shifting-letters-ii.java) |

---

## Key Learnings

- Difference array reduces the cost of arbitrary range additions from $O(n)$ to $O(1)$ per operation.
- Shifting characters in opposite directions can be modeled as signed additions ($+1$ and $-1$).
- Safe positive modulo: `(val % M + M) % M` is essential in Java/C++ to avoid negative results from `%` on negative integers.
