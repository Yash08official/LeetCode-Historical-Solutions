---
comments: true
difficulty: Medium
tags:
  - Two Pointers
  - String
---

# 2825. Make String a Subsequence Using Cyclic Increments

**[View Problem on LeetCode](https://leetcode.com/problems/make-string-a-subsequence-using-cyclic-increments/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2825` (`2825`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | Java |

---

## Problem Description

We are given two 0-indexed strings `str1` and `str2` consisting of lowercase English letters.

In a single operation, we are allowed to select any set of indices in `str1` and cyclically increment each character at those indices by 1 position (i.e., `'a'` becomes `'b'`, `'b'` becomes `'c'`, ..., and `'z'` wraps around to `'a'`). This operation may be performed **at most once** on any subset of characters.

We need to return `true` if it is possible to make `str2` a **subsequence** of `str1`, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: str1 = "abc", str2 = "ad"
Output: true
Explanation: Select index 2 in str1.
Increment str1[2] to become 'd'.
Hence, str1 becomes "abd" and str2 is now a subsequence. Therefore, true is returned.
```

### Example 2

```text
Input: str1 = "zc", str2 = "ad"
Output: true
Explanation: Select indices 0 and 1 in str1.
Increment str1[0] to become 'a'.
Increment str1[1] to become 'd'.
Hence, str1 becomes "ad" and str2 is now a subsequence. Therefore, true is returned.
```

### Example 3

```text
Input: str1 = "ab", str2 = "d"
Output: false
Explanation: In this example, it can be shown that it is impossible to make str2 a subsequence of str1 using the operation at most once.
Therefore, false is returned.
```

---

## Constraints

- `1 <= str1.length <= 10^5`

- `1 <= str2.length <= 10^5`

- `str1` and `str2` consist of only lowercase English letters.

---

## Problem Understanding

Key properties:
- Each character `c = str1[j]` can either remain `c` or be changed to `d = (c == 'z' ? 'a' : c + 1)`.
- Subsequence matching requires matching characters of `str2` in order from left to right.
- Because we can choose any arbitrary set of indices independently, the choice to increment a character at index `j` does not restrict our choice at any other index!
- Therefore, `str1[j]` can match `str2[i]` if `str2[i] == c` or `str2[i] == d`.
- A greedy two-pointer match from left to right is optimal for subsequence checking.

---

## Approach

### Brute Force Approach

A brute-force approach might try to generate all $2^{|str1|}$ possible modified strings by deciding whether to increment each character or not, and then testing if `str2` is a subsequence of any of them. For $|str1| \le 10^5$, $2^{100000}$ is astronomically large and completely infeasible.

### Optimized Approach

The solution uses a greedy two-pointer strategy in a single pass:
1. Initialize pointer `i = 0` to track the current required character in `str2`.
2. Iterate through each character `c` in `str1`. Determine its cyclically incremented counterpart `d = (c == 'z' ? 'a' : (char)(c + 1))`.
3. If `i < n` and `str2.charAt(i)` matches either `c` or `d`, we greedily match `str2[i]` with the current character of `str1` and advance `++i`.
4. After the loop, return `i == n` (true if all characters of `str2` were matched).

### Step-by-Step Thinking Process

1. Subsequence matching is inherently greedy: matching the earliest possible occurrence of `str2[i]` leaves the most remaining characters of `str1` for future matches.
2. For each character `c` in `str1`, it can either remain `c` or become `d` (cyclic successor).
3. Whenever `c == str2[i]` or `d == str2[i]`, we should greedily consume `str2[i]` by advancing `i++`.
4. If `i` reaches `str2.length()`, all characters of `str2` have been matched in relative order.
5. Return `i == n`.

### Algorithm / Intuition

The greedy choice property guarantees optimality: matching `str2[i]` as early as possible in `str1` never eliminates any valid subsequence completions that could be achieved by waiting for a later match. In each step of the loop over `str1`, `c` is the original character and `d` is `c == 'z' ? 'a' : (char) (c + 1)`. Checking `str2.charAt(i) == c || str2.charAt(i) == d` tests whether `str1` can supply the needed character at index `i`. If so, `++i` advances the target pointer. At the end, if `i == n`, `str2` is fully matched.

---

## Dry Run

We trace Example 1 with `str1 = "abc"` and `str2 = "ad"`:

- Target string length `n = 2`, `i = 0`.
- Character 1: `c = 'a'`, `d = 'b'`. Does `str2[0]` ('a') equal `c` or `d`? Yes, `'a' == 'a'`. `++i` -> `i = 1`.
- Character 2: `c = 'b'`, `d = 'c'`. Does `str2[1]` ('d') equal `'b'` or `'c'`? No. `i` remains 1.
- Character 3: `c = 'c'`, `d = 'd'`. Does `str2[1]` ('d') equal `'c'` or `'d'`? Yes, `'d' == 'd'`. `++i` -> `i = 2`.
- Loop finishes. Check `i == n` -> `2 == 2` is `true`.
- Return `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(m)` where `m = str1.length()`. We traverse `str1` in a single pass, doing constant-time operations per character.
- **Space Complexity:** `O(1)` auxiliary space beyond the input strings (or `O(m)` if converting via `.toCharArray()`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2825make-string-a-subsequence-using-cyclic-increments.java](./2825make-string-a-subsequence-using-cyclic-increments.java) |

---

## Key Learnings

- Greedy matching from left to right is the optimal strategy for subsequence verification problems.
- Independent per-index choices mean local decisions don't restrict future choices, preventing the need for DP or backtracking.
- Cyclic character incrementing `'z' -> 'a'` is cleanly expressed with a ternary check `c == 'z' ? 'a' : (char)(c + 1)`.
