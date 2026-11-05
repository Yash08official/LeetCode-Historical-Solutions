---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Binary Search
  - Dynamic Programming
  - Sorting
---

# 2501. Longest Square Streak in an Array

**[View Problem on LeetCode](https://leetcode.com/problems/longest-square-streak-in-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2501` (`2501`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Binary Search`, `Dynamic Programming`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `nums`.

A subsequence of `nums` is called a **square streak** if:
1. The length of the subsequence is at least 2.
2. After sorting the subsequence in ascending order, each element (from the second element onward) is the square of the previous element (i.e., $x, x^2, x^4, x^8, \dots$).

Return the **maximum length** of a square streak in `nums`, or return `-1` if no square streak exists.

---

## Examples

### Example 1

```text
Input: nums = [4,3,6,16,8,2]
Output: 3
Explanation: Choose the subsequence [4,16,2]. After sorting it, it becomes [2,4,16].
- 4 = 2 * 2.
- 16 = 4 * 4.
Therefore, [4,16,2] is a square streak.
It can be shown that every subsequence of length 4 is not a square streak.
```

### Example 2

```text
Input: nums = [2,3,5,6,7]
Output: -1
Explanation: There is no square streak in nums so return -1.
```

---

## Constraints

- `2 <= nums.length <= 10^5`

- `2 <= nums[i] <= 10^5`

---

## Problem Understanding

A valid square streak is a chain where each subsequent element is the exact square of its predecessor. For example, starting with 2: $2 \to 4 \to 16 \to 256 \to 65536$. Because squares grow super-exponentially ($x^{2^k}$), any streak can contain at most 5 elements for values $\le 10^5$ (since $2^{16} = 65536$ and $2^{32} > 10^5$).

If we sort `nums` in ascending order, each number can only extend a streak from its integer square root. Specifically, for a number `num`, if $\lfloor\sqrt{\text{num}}\rfloor^2 == \text{num}$ and the square root is already present in our streak map, we can extend that streak: $\text{Streaks}[num] = \text{Streaks}[\sqrt{num}] + 1$.

---

## Approach

### Brute Force Approach

For each unique element $x$ in `nums`, repeatedly check if $x^2, x^4, \dots$ exist in a hash set. While this can also be made efficient with a set, iterating without sorting or tracking visited numbers could re-evaluate sub-streaks multiple times. In a naive implementation, searching unsorted arrays takes $O(n^2)$ time.

### Optimized Approach

Sort `nums` in ascending order. Use a hash map `Streaks` to store the longest streak ending at each number. For each `num`, compute `root = Math.floor(Math.sqrt(num))`. If `root * root === num` and `Streaks.has(root)`, set `Streaks.set(num, Streaks.get(root) + 1)` and update `max`. Otherwise, initialize `Streaks.set(num, 1)`. Finally, return `max` (which remains `-1` if no streak of length $\ge 2$ was found).

### Step-by-Step Thinking Process

1. Sort `nums` so that any square root $\sqrt{x}$ is encountered before its square $x$.
2. Maintain a hash map `Streaks` mapping each number to the length of the square streak ending at that number.
3. Initialize `max = -1`.
4. For each `num` in the sorted array:
  - Calculate `root = Math.floor(Math.sqrt(num))`.
  - Check if `num` is a perfect square (`root * root === num`) AND `Streaks.has(root)`.
  - If both hold, `Streaks.set(num, Streaks.get(root) + 1)`, and update `max = Math.max(Streaks.get(num), max)`.
  - Otherwise, start a new streak: `Streaks.set(num, 1)`.
5. Return `max` directly.

### Algorithm / Intuition

In the provided JavaScript solution:

1. `nums.sort((a, b) => a - b)` sorts elements in ascending order, guaranteeing that smaller predecessors appear first.
2. `Streaks` is a `Map` storing `{ value: streak_length }`.
3. For each `num`, `Math.floor(Math.sqrt(num))` finds the candidate root. The condition `root * root === num && Streaks.has(root)` verifies that `num` is a perfect square and its predecessor exists in the array.
4. When true, the streak extends by 1 (`Streaks.get(root) + 1`), and `max` tracks the global maximum streak length.
5. If false, `Streaks.set(num, 1)` marks `num` as the starting base of a potential future streak.
6. Because `max` is initialized to `-1` and only updated when a streak extends (reaching at least length 2), it naturally returns `-1` if no streak $\ge 2$ exists.

---

## Dry Run

Consider Example 1: `nums = [4, 3, 6, 16, 8, 2]`

1. Sort `nums`: `[2, 3, 4, 6, 8, 16]`. `max = -1`, `Streaks = {}`.
2. `num = 2`: `root = 1`, not in map -> `Streaks.set(2, 1)`.
3. `num = 3`: `root = 1`, not in map -> `Streaks.set(3, 1)`.
4. `num = 4`: `root = 2`, `2 * 2 === 4` and `Streaks.has(2)` -> `Streaks.set(4, 1 + 1 = 2)`. `max = max(-1, 2) = 2`.
5. `num = 6`: `root = 2`, `2 * 2 !== 6` -> `Streaks.set(6, 1)`.
6. `num = 8`: `root = 2`, `2 * 2 !== 8` -> `Streaks.set(8, 1)`.
7. `num = 16`: `root = 4`, `4 * 4 === 16` and `Streaks.has(4)` -> `Streaks.set(16, 2 + 1 = 3)`. `max = max(2, 3) = 3`.

Final Return: `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n \log n)` — Sorting `nums` takes $O(n \log n)$ time. The subsequent linear scan performs $O(1)$ math operations and hash map operations per element, adding $O(n)$ time.
- **Space Complexity:** `O(n)` — The `Streaks` hash map stores at most $n$ key-value pairs.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2501longest-square-streak-in-an-array.js](./2501longest-square-streak-in-an-array.js) |

---

## Key Learnings

- Sorting transforms sequence extension problems into dynamic programming with hash map lookups.
- Verifying `root * root === num` prevents floating point inaccuracies when checking for perfect squares.
- Initializing the answer tracker to `-1` avoids secondary conditional checks when minimum streak length is 2.
