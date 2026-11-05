---
comments: true
difficulty: Medium
tags:
  - String
  - Backtracking
---

# 1415. The k-th Lexicographical String of All Happy Strings of Length n

**[View Problem on LeetCode](https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1415` (`1415`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

A happy string is a string consisting only of letters from the set `['a', 'b', 'c']` where no two adjacent characters are identical (i.e. `s[i] != s[i + 1]` for all valid indices).

Given two integers `n` and `k`, consider the list of all happy strings of length `n` sorted in lexicographical order. Return the `k`-th string in this list (using 1-based indexing). If there are fewer than `k` happy strings of length `n`, return an empty string `""`.

---

## Examples

### Example 1

```text
Input: n = 1, k = 3
Output: "c"
Explanation: The list ["a", "b", "c"] contains all happy strings of length 1. The third string is "c".
```

### Example 2

```text
Input: n = 1, k = 4
Output: ""
Explanation: There are only 3 happy strings of length 1.
```

### Example 3

```text
Input: n = 3, k = 9
Output: "cab"
Explanation: There are 12 different happy string of length 3 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]. You will find the 9^th string = "cab"
```

---

## Constraints

- `1 <= n <= 10`

- `1 <= k <= 100`

---

## Problem Understanding

Key observations:
- Characters are drawn from `['a', 'b', 'c']`.
- No two consecutive characters can match: `t.charAt(len - 1) != c`.
- Lexicographical order: If we generate strings recursively by choosing characters in alphabetical order (`'a'`, then `'b'`, then `'c'`), the generated strings are naturally produced in sorted order.
- Total number of happy strings of length `n`: There are 3 choices for the first character, and 2 choices for each subsequent character, yielding `3 * 2^{n - 1}` total happy strings.
- Constraints: `1 <= n <= 10` and `1 <= k <= 100`. For `n = 10`, there are at most `3 * 2^9 = 1536` strings.

---

## Approach

### Brute Force Approach

Generate all `3^n` strings of length `n` composed of `'a'`, `'b'`, and `'c'`, filter out those with adjacent duplicate characters, sort the valid strings, and retrieve the `(k - 1)`-th item. For `n = 10`, `3^{10} = 59,049`, which works, but generating only happy strings via backtracking pruned at each step avoids sorting and extra overhead.

### Optimized Approach

Depth-First Search (DFS) / Backtracking. Recursively construct strings of length `n` by iterating through `'a'`, `'b'`, and `'c'`. Skip character `c` if it matches the last character of the current string. When a string reaches length `n`, append it to list `ans`. If `ans.size() < k`, return `""`; otherwise, return `ans.get(k - 1)`.

### Step-by-Step Thinking Process

1. Note the small bounds: `n <= 10`, meaning at most 1536 valid happy strings exist.
2. Traverse choices in alphabetical order (`'a'`, `'b'`, `'c'`) so that the recursion naturally populates `ans` in lexicographical order.
3. Prune invalid branches immediately: if `t.length() > 0 && t.charAt(t.length() - 1) == c`, skip `c`.
4. When `t.length() == n`, add `t` to the global list `ans`.
5. After exploring all branches, check if `ans.size() < k`; return `""` if true, or `ans.get(k - 1)` (1-indexed).

### Algorithm / Intuition

The class defines a private list `ans`. The helper method `dfs(String t, int n)` checks if `t.length() == n`; if so, `ans.add(t)` and returns. Otherwise, it loops over `c` in `"abc".toCharArray()`. If `t.length() > 0` and the last character equals `c`, it continues; otherwise, it invokes `dfs(t + c, n)`. The main method `getHappyString` calls `dfs("", n)` and returns `ans.size() < k ? "" : ans.get(k - 1)`.

---

## Dry Run

Walkthrough on Example 1: `n = 1, k = 3`.
- Call `dfs("", 1)`:
  - `c = 'a'`: `dfs("a", 1)` -> `t.length() == 1` -> `ans.add("a")`.
  - `c = 'b'`: `dfs("b", 1)` -> `t.length() == 1` -> `ans.add("b")`.
  - `c = 'c'`: `dfs("c", 1)` -> `t.length() == 1` -> `ans.add("c")`.
- `ans = ["a", "b", "c"]`.
- `ans.size() = 3`. Check `ans.size() < 3` is `false`.
- Return `ans.get(3 - 1) = ans.get(2) = "c"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * 2^n)` — The total number of happy strings of length `n` is `3 * 2^{n - 1}`. Generating each string of length `n` via concatenation takes `O(n)` time. For `n = 10`, this is bounded by `10 * 1536 ~ 1.5 * 10^4` operations.
- **Space Complexity:** `O(n * 2^n)` — The `ans` list stores up to `3 * 2^{n - 1}` strings of length `n`, plus `O(n)` memory for the recursion call stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1415the-k-th-lexicographical-string-of-all-happy-strings-of-length-n.java](./1415the-k-th-lexicographical-string-of-all-happy-strings-of-length-n.java) |

---

## Key Learnings

- Generating search candidates in alphabetical order guarantees lexicographical ordering without post-sorting.
- Local pruning based on the previous character reduces the branching factor from 3 to 2.
- Backtracking is well-suited for combinatorial search when total output states are bounded by a few thousands.
