---
comments: true
difficulty: Easy
tags:
  - String
  - Sliding Window
---

# 2379. Minimum Recolors to Get K Consecutive Black Blocks

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2379` (`2379`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Sliding Window` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed string `blocks` of length `n`, where `blocks[i]` is either `'W'` (white) or `'B'` (black). You are also given an integer `k`, which represents the desired number of consecutive black blocks.

In one operation, you can recolor a white block `'W'` such that it becomes black `'B'`.

Return the minimum number of recoloring operations needed such that there is at least one contiguous sequence of `k` consecutive black blocks.

---

## Examples

### Example 1

```text
Input: blocks = "WBBWWBBWBW", k = 7
Output: 3
Explanation:
One way to achieve 7 consecutive black blocks is to recolor the 0th, 3rd, and 4th blocks
so that blocks = "BBBBBBBWBW".
It can be shown that there is no way to achieve 7 consecutive black blocks in less than 3 operations.
Therefore, we return 3.
```

### Example 2

```text
Input: blocks = "WBWBBBW", k = 2
Output: 0
Explanation:
No changes need to be made, since 2 consecutive black blocks already exist.
Therefore, we return 0.
```

---

## Constraints

- `n == blocks.length`

- `1 <= n <= 100`

- `blocks[i]` is either `'W'` or `'B'`.

- `1 <= k <= n`

---

## Problem Understanding

Key observations and constraints:
- `n == blocks.length` with `1 <= n <= 100`, and `1 <= k <= n`.
- Having `k` consecutive black blocks means there is some substring of length `k` consisting entirely of `'B'`s.
- In any substring of length `k`, each `'W'` requires exactly 1 recoloring operation to become `'B'`. The number of operations required to turn that substring into all `'B'`s is therefore equal to the count of `'W'` characters in that window.
- Thus, the problem is equivalent to: find a sliding window of length `k` in `blocks` that contains the minimum number of `'W'` characters.

---

## Approach

### Brute Force Approach

A brute-force solution checks every starting index `i` from `0` to `n - k`. For each substring `blocks[i .. i + k - 1]`, it counts the number of `'W'` characters using an inner loop of size `k`. The minimum count found is returned. This takes `O((n - k + 1) * k) = O(n * k)` time. For `n <= 100`, this requires at most `10^4` operations.

### Optimized Approach

Use a fixed-size sliding window of length `k`. First, count the number of `'W'` characters in the initial window `blocks[0 .. k - 1]`, setting `ans = cnt`. Then, slide the window across `blocks` from index `k` to `n - 1`. At each step `i`:
- If the incoming character `blocks[i] == 'W'`, increment `cnt`.
- If the outgoing character `blocks[i - k] == 'W'`, decrement `cnt`.
- Update `ans = min(ans, cnt)`.
This runs in optimal `O(n)` time.

### Step-by-Step Thinking Process

1. We need a block of `k` consecutive `'B'`s with minimum recolors.
2. Every recolor changes a `'W'` to `'B'`. Thus, ops = number of `'W'`s in that window.
3. To minimize recolors, find a window of size `k` with the minimum count of `'W'`.
4. Compute the white count of the first window of size `k` in `O(k)`.
5. Slide the window one character at a time up to index `n - 1`, updating the count in `O(1)`.
6. Track and return the minimum count observed.

### Algorithm / Intuition

In `Solution.minimumRecolors`, an initial loop counts white blocks in the first window of length `k`: `cnt += blocks.charAt(i) == 'W' ? 1 : 0`, and initializes `ans = cnt`.

The second loop iterates `i` from `k` to `blocks.length() - 1`. For each index, it includes the newly entering block via `cnt += blocks.charAt(i) == 'W' ? 1 : 0` and removes the exiting block via `cnt -= blocks.charAt(i - k) == 'W' ? 1 : 0`. The running minimum is updated with `ans = Math.min(ans, cnt)`. Once the loop terminates, `ans` contains the fewest operations required.

---

## Dry Run

Consider `blocks = "WBBWWBBWBW"` and `k = 7` (length `n = 10`):
- Initial window `blocks[0..6] = "WBBWWBB"`:
  - Indices with `'W'`: 0, 3, 4 -> `cnt = 3`. Set `ans = 3`.
- Slide window:
  - `i = 7`: incoming `blocks[7] = 'W'`, outgoing `blocks[0] = 'W'`. `cnt = 3 + 1 - 1 = 3`. `ans = min(3, 3) = 3`.
  - `i = 8`: incoming `blocks[8] = 'B'`, outgoing `blocks[1] = 'B'`. `cnt = 3 + 0 - 0 = 3`. `ans = min(3, 3) = 3`.
  - `i = 9`: incoming `blocks[9] = 'W'`, outgoing `blocks[2] = 'B'`. `cnt = 3 + 1 - 0 = 4`. `ans = min(3, 4) = 3`.
- Loop ends. Return `ans = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single pass over the string: the first loop runs `k` times, and the second loop runs `n - k` times. Each character is checked twice, taking `O(1)` per step.
- **Space Complexity:** `O(1)` — Only a few primitive integer variables (`cnt`, `ans`, `i`) are stored.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2379minimum-recolors-to-get-k-consecutive-black-blocks.java](./2379minimum-recolors-to-get-k-consecutive-black-blocks.java) |

---

## Key Learnings

- Fixed-size sliding window pattern is the optimal choice for contiguous subarray/substring queries of length $k$.
- Translating problem requirements ('operations to make all characters B') into window metrics ('count of Ws in window of size $k$') simplifies the algorithm.
- Updating window state in $O(1)$ by adding the incoming element and subtracting the outgoing element achieves $O(n)$ overall runtime.
