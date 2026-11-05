---
comments: true
difficulty: Medium
tags:
  - String
  - Backtracking
  - Stack
  - Greedy
---

# 2375. Construct Smallest Number From DI String

**[View Problem on LeetCode](https://leetcode.com/problems/construct-smallest-number-from-di-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2375` (`2375`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Backtracking`, `Stack`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 0-indexed string `pattern` of length `n` consisting of the characters `'I'` (increasing) and `'D'` (decreasing).

A 0-indexed string `num` of length `n + 1` is constructed using digits `'1'` to `'9'`, subject to the following rules:
- `num` consists of digits `'1'` to `'9'`, where each digit is used at most once.
- If `pattern[i] == 'I'`, then `num[i] < num[i + 1]`.
- If `pattern[i] == 'D'`, then `num[i] > num[i + 1]`.

Return the lexicographically smallest possible string `num` that meets the conditions.

---

## Examples

### Example 1

```text
Input: pattern = "IIIDIDDD"
Output: "123549876"
Explanation:
At indices 0, 1, 2, and 4 we must have that num[i] < num[i+1].
At indices 3, 5, 6, and 7 we must have that num[i] > num[i+1].
Some possible values of num are "245639871", "135749862", and "123849765".
It can be proven that "123549876" is the smallest possible num that meets the conditions.
Note that "123414321" is not possible because the digit '1' is used more than once.
```

### Example 2

```text
Input: pattern = "DDD"
Output: "4321"
Explanation:
Some possible values of num are "9876", "7321", and "8742".
It can be proven that "4321" is the smallest possible num that meets the conditions.
```

---

## Constraints

- `1 <= pattern.length <= 8`

- `pattern` consists of only the letters `'I'` and `'D'`.

---

## Problem Understanding

Key observations and constraints:
- `1 <= pattern.length <= 8`.
- The length of `num` is `n + 1 <= 9`, using digits chosen from `'1'` through `'9'` without duplicates.
- We want the lexicographically smallest valid number.
- Because `pattern.length <= 8`, the total permutations of 9 distinct digits is at most `9! = 362,880`. A backtracking search that tries digits in increasing order (`1, 2, ..., 9`) will guarantee that the VERY FIRST valid number generated is the lexicographically smallest one.

---

## Approach

### Brute Force Approach

A naive approach could generate all `9! = 362,880` permutations of the digits `'1'` to `'9'`, take prefixes of length `n + 1`, and filter for those satisfying the pattern, sorting them to find the minimum. This is unnecessary when a pruned backtracking DFS can stop at the first valid result.

### Optimized Approach

Use Depth-First Search (backtracking) to construct the digits one by one. Maintain a boolean array `vis[10]` to ensure each digit is used at most once, and a `StringBuilder t` to build the current sequence:
- In each step at depth `u`, iterate candidate digits `i` from `1` to `9`.
- If digit `i` is not visited, check pattern validity with the predecessor digit: if `pattern[u - 1] == 'I'` and `prev >= i`, or if `pattern[u - 1] == 'D'` and `prev <= i`, prune this branch.
- If valid, mark `vis[i] = true`, append `i`, recurse to `u + 1`, and backtrack.
- As soon as depth reaches `n + 1`, save the result to `ans` and prune all subsequent exploration.

### Step-by-Step Thinking Process

1. We need the lexicographically smallest number of length `n + 1` satisfying `pattern`.
2. Trying digits from `1` to `9` greedily in increasing order ensures the first complete valid sequence reached is the lexicographical minimum.
3. At depth `u > 0`, prune candidate digit `i` immediately if it violates `pattern[u - 1]` relative to `t[u - 1]`.
4. Once a valid full-length string is constructed, set `ans = t.toString()` and exit early.

### Algorithm / Intuition

In `Solution.smallestNumber`, `dfs(0)` initiates the search. If `ans != null`, any further recursive branches return immediately. When `u == p.length() + 1`, the candidate string `t` has satisfied all pattern conditions; `ans = t.toString()` is assigned and the search halts.

Inside `dfs(u)`, we loop `i` from `1` to `9`. If `!vis[i]`, we inspect the transition from `u - 1`: if `p.charAt(u - 1) == 'I'` and `t.charAt(u - 1) - '0' >= i`, candidate `i` does not increase, so we `continue`. Similarly, if `p.charAt(u - 1) == 'D'` and `t.charAt(u - 1) - '0' <= i`, candidate `i` does not decrease, so we `continue`. Otherwise, `i` is marked in `vis`, appended to `t`, and `dfs(u + 1)` is called, followed by standard backtracking cleanup.

---

## Dry Run

Consider `pattern = "IIIDIDDD"` with length 8 (producing a 9-digit number):
- `dfs(0)` picks digit `1` (`t = "1"`).
- `dfs(1)`: pattern[0] is `'I'`. Candidate `2 > 1` (valid) -> picks `2` (`t = "12"`).
- `dfs(2)`: pattern[1] is `'I'`. Candidate `3 > 2` (valid) -> picks `3` (`t = "123"`).
- `dfs(3)`: pattern[2] is `'I'`. Tries candidate `4`. Next pattern is `'D'`, but following digits also require 3 consecutive decreases, for which remaining smaller digits are exhausted if `4` is chosen.
- Backtracking explores candidate `5` for index 3, `4` for index 4, `9` for index 5, `8` for index 6, `7` for index 7, and `6` for index 8.
- All conditions match: `1 < 2 < 3 < 5 > 4 < 9 > 8 > 7 > 6` matches `"IIIDIDDD"`.
- Output: `"123549876"`.

---

## Complexity Analysis

- **Time Complexity:** `O(9! / (9 - (n + 1))!)` in the worst case, but heavily pruned by pattern checks at each depth. For `n <= 8`, DFS evaluates at most a few hundred states, executing in under 2ms.
- **Space Complexity:** `O(n)` — Recursion stack depth is at most `n + 2 <= 10`, and `StringBuilder t` stores at most 9 characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2375construct-smallest-number-from-di-string.java](./2375construct-smallest-number-from-di-string.java) |

---

## Key Learnings

- Ascending branch ordering in backtracking guarantees that the first valid terminal node is the lexicographical minimum.
- Pruning branches at depth $u$ based on local prefix validity avoids exponential subtree exploration.
- Small input sizes ($n \le 8$) make backtracking simple, robust, and optimal.
