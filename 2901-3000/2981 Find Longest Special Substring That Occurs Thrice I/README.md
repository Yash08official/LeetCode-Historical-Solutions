---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Binary Search
  - Sliding Window
  - Counting
---

# 2981. Find Longest Special Substring That Occurs Thrice I

**[View Problem on LeetCode](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2981` (`2981`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Binary Search`, `Sliding Window`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

We are given a string `s` consisting of lowercase English letters. A string is called special if it consists of only a single character repeated one or more times (for example, `"a"`, `"bbb"`, or `"zz"` are special, while `"abc"` or `"aab"` are not).

We want to find the length of the longest special substring that occurs at least three times in `s`. If no special substring occurs at least thrice, return `-1`.

---

## Examples

### Example 1

```text
Input: s = "aaaa"
Output: 2
Explanation: The longest special substring which occurs thrice is "aa": substrings "aaaa", "aaaa", and "aaaa".
It can be shown that the maximum length achievable is 2.
```

### Example 2

```text
Input: s = "abcdef"
Output: -1
Explanation: There exists no special substring which occurs at least thrice. Hence return -1.
```

### Example 3

```text
Input: s = "abcaba"
Output: 1
Explanation: The longest special substring which occurs thrice is "a": substrings "abcaba", "abcaba", and "abcaba".
It can be shown that the maximum length achievable is 1.
```

---

## Constraints

- `3 <= s.length <= 50`

- `s` consists of only lowercase English letters.

---

## Problem Understanding

Key properties and monotonicity:
- A substring is special if and only if all its characters are identical.
- Crucial monotonicity observation: If a special substring of length `L` (say `"aaaa"`) occurs at least 3 times in `s`, then any shorter special substring of the same character of length `L' < L` (e.g. `"aaa"`, `"aa"`, `"a"`) also occurs at least 3 times.
- This monotonicity allows us to binary search on the target length `L` in the range `[1, n]`.
- When checking if a length `x` is achievable, any contiguous run of identical characters of length `len = j - i` contains exactly `max(0, len - x + 1)` substrings of length `x`.

---

## Approach

### Brute Force Approach

A brute-force solution would enumerate all possible substrings of `s`, check if each substring is special, and count its occurrences across `s` using a hash map or frequency table. With string length `n <= 50`, `O(n^3)` substring extraction and comparison works, but does not scale well to larger inputs (like the companion problem 2982 where `n = 5 * 10^5`).

### Optimized Approach

We binary search on the answer length in `[0, n]`.
- The helper method `check(x)` scans `s` by grouping adjacent identical characters into maximal runs `[i, j)`.
- For each run of character `c` with length `len = j - i`, the number of special substrings of length `x` contributed is `Math.max(0, len - x + 1)`.
- We accumulate these counts in a 26-element array `cnt`. If any `cnt[k] >= 3`, length `x` is feasible and `check(x)` returns `true`.
- If the binary search converges to `l == 0`, no valid special substring exists, so we return `-1`; otherwise, we return `l`.

### Step-by-Step Thinking Process

1. We want the maximum length `x` such that some special substring of length `x` appears `>= 3` times.
2. Can we binary search on `x`? Yes, because if length `x` is valid, any length `< x` is also valid.
3. How to check if length `x` appears `>= 3` times in `O(n)`?
Decompose `s` into maximal contiguous runs of identical characters. For example, `"aaaa"` has one run of `'a'` of length 4.
4. A run of length `L` contains `L - x + 1` substrings of length `x` (if `L >= x`).
5. Sum these contributions across all runs for each letter `'a'` through `'z'`. If any letter achieves total count `>= 3`, then length `x` is valid.

### Algorithm / Intuition

The algorithm combines binary search with run-length decomposition:
1. Set binary search bounds `l = 0, r = n`.
2. While `l < r`:
   - Let `mid = (l + r + 1) >> 1` (ceiling midpoint to avoid infinite loop when `l = mid`).
   - If `check(mid)` is true, search higher: `l = mid`.
   - Else, search lower: `r = mid - 1`.
3. Inside `check(x)`:
   - Create `cnt = new int[26]`.
   - Use two pointers `i` and `j` to find maximal identical segments `s[i..j-1]`.
   - Add `Math.max(0, j - i - x + 1)` to `cnt[s.charAt(i) - 'a']`.
   - If `cnt[k] >= 3`, immediately return `true`.
   - Advance `i = j`.
4. Return `l == 0 ? -1 : l`.

---

## Dry Run

Trace on Example 1: `s = "aaaa"` (`n = 4`)

- Binary search range: `l = 0, r = 4`.
- Round 1: `mid = (0 + 4 + 1) >> 1 = 2`.
  - `check(2)`: Single run of `'a'` from `i = 0` to `j = 4`, length `4 - 0 = 4`.
  - Substrings of length 2 contributed: `max(0, 4 - 2 + 1) = 3`.
  - `cnt['a'] = 3 >= 3` -> `check(2)` returns `true`.
  - Update `l = 2`.
- Round 2: `l = 2, r = 4`. `mid = (2 + 4 + 1) >> 1 = 3`.
  - `check(3)`: Single run length 4. Substrings of length 3: `max(0, 4 - 3 + 1) = 2`.
  - `cnt['a'] = 2 < 3` -> `check(3)` returns `false`.
  - Update `r = 3 - 1 = 2`.
- Loop ends since `l == r == 2`.
- Result: `l != 0`, return `2`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(n log n) — The binary search takes O(log n) iterations, and each iteration calls `check` which scans the string of length n in O(n) time.
- **Space Complexity:** O(1) auxiliary space — The frequency array `cnt` has a fixed size of 26 integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2981find-longest-special-substring-that-occurs-thrice-i.java](./2981find-longest-special-substring-that-occurs-thrice-i.java) |

---

## Key Learnings

- Contiguous identical runs contain exactly `max(0, run_len - target_len + 1)` occurrences of a target special substring.
- Monotonicity allows binary searching the maximum length directly instead of testing all lengths.
- This `O(n log n)` solution also seamlessly solves the large-scale version (LeetCode 2982) where `n = 5 * 10^5`.
