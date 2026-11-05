---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
  - Greedy
  - Recursion
---

# 44. Wildcard Matching

**[View Problem on LeetCode](https://leetcode.com/problems/wildcard-matching/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0044` (`44`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Greedy`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

Given an input string `s` (containing lowercase English letters) and a pattern string `p` (containing lowercase English letters, `'?'`, and `'*'`), determine whether `p` matches the **entire** string `s`.

The wildcard rules are:
- `'?'` matches any **single** character.
- `'*'` matches **any sequence** of characters, including the **empty** sequence (`""`).

---

## Examples

### Example 1

```text
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

### Example 2

```text
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.
```

### Example 3

```text
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
```

---

## Constraints

- `0 <= s.length, p.length <= 2000`

- `s` contains only lowercase English letters.

- `p` contains only lowercase English letters, `'?'` or `'*'`.

---

## Problem Understanding

- **Full-String Match:** Partial substring matches do not count; all characters of `s` and all tokens of `p` must be accounted for simultaneously.
- **Ambiguity of `'*'`:** Unlike `'?'` (which always consumes 1 character of `s` and 1 character of `p`), `'*'` can match `0` characters (advance `p` only) or `1` or more characters (advance `s` while keeping `'*'` active).
- **Empty String Edge Case:** When `s` reaches its end (`i == m`), `p` can still match if and only if every remaining character in `p[j..n-1]` is `'*'`. Conversely, if `p` reaches its end (`j == n`) while `s` still has characters (`i < m`), the match fails.

---

## Approach

### Brute Force Approach

Pure backtracking without memoization tries every possible expansion length (`0, 1, 2, ...` characters) whenever it encounters a `'*'`. When a pattern contains multiple stars—such as `p = "*a*a*a*b"` against `s = "aaaaaaaa...a"`—different combinations of star lengths repeatedly reach the exact same suffix pair `(i, j)`, causing exponential `O(2^(m + n))` blowup.

### Optimized Approach

Use **Top-Down Dynamic Programming (DFS with Memoization)**: define `dfs(i, j)` to indicate whether suffix `s[i..m-1]` matches suffix `p[j..n-1]`, caching each computed boolean result in a 2D wrapper table `Boolean[][] f` so every `(i, j)` subproblem is solved at most once.

### Step-by-Step Thinking Process

1. Convert `s` and `p` to `char[]` arrays of lengths `m` and `n` for fast indexed access, and allocate `Boolean[][] f = new Boolean[m][n]` where `null` represents an unvisited state.
2. Handle base cases first: if `i >= m` (`s` is completely consumed), return `true` if `j >= n` (`p` is also consumed) or if `p[j] == '*'` and `dfs(i, j + 1)` is `true`. Otherwise, if `j >= n` while `i < m`, return `false`.
3. Before branching, check `if (f[i][j] != null) return f[i][j]` to reuse previously solved subproblems.
4. When `p[j] == '*'`, branch into matching 1+ characters (`dfs(i + 1, j)`), matching 1 character (`dfs(i + 1, j + 1)`), or matching 0 characters (`dfs(i, j + 1)`).
5. When `p[j] != '*'`, the current characters match iff `p[j] == '?'` or `s[i] == p[j]`, combined with `dfs(i + 1, j + 1)` for the remaining suffixes.

### Algorithm / Intuition

In `isMatch`, `this.s` and `this.p` store character arrays of lengths `m` and `n`, and `f = new Boolean[m][n]` uses boxed `Boolean` references (`null`, `Boolean.TRUE`, `Boolean.FALSE`) so we don't need a separate `visited` matrix.

Inside `dfs(int i, int j)`:
- **Base Case 1 (`i >= m`):** If `s` is exhausted, `j >= n || (p[j] == '*' && dfs(i, j + 1))` verifies that any leftover pattern characters are exclusively `'*'`.
- **Base Case 2 (`j >= n`):** Since `i < m` here, `p` ran out of pattern tokens early, returning `false`.
- **Wildcard Branch (`p[j] == '*'`):** Evaluates `dfs(i + 1, j) || dfs(i + 1, j + 1) || dfs(i, j + 1)` with short-circuit `||`. Note that `dfs(i + 1, j)` (consume `s[i]` and keep `'*'`) followed by `dfs(i, j + 1)` at the next step already covers `dfs(i + 1, j + 1)`, and memoization ensures any shared state is evaluated only once in `O(1)`.
- **Literal / `'?'` Branch:** Evaluates `(p[j] == '?' || s[i] == p[j]) && dfs(i + 1, j + 1)`, advancing both indices simultaneously.

---

## Dry Run

**Input:** `s = "aa"`, `p = "a"` (`m = 2`, `n = 1`, `f = new Boolean[2][1]`)

1. Call `dfs(0, 0)`:
   - `i = 0 < 2`, `j = 0 < 1`, `f[0][0]` is `null`.
   - `p[0] = 'a'` (not `'*'`).
   - Checks `(p[0] == '?' || s[0] == p[0])` -> `('a' == 'a')` is `true`.
   - Recurses on `dfs(1, 1)`.
2. Call `dfs(1, 1)`:
   - `i = 1 < 2` (`s` still has `'a'` at index `1`).
   - `j = 1 >= 1` (`j >= n` is `true`, pattern `p` is exhausted!).
   - Base case `if (j >= n)` triggers and immediately returns `false`.
3. Back in `dfs(0, 0)`:
   - Stores `f[0][0] = true && false = false`.
   - Returns **`false`**.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — There are `m * n` memoized states `(i, j)` for `0 <= i < m, 0 <= j < n` (plus at most `n + 1` boundary calls along `i == m`), and each state performs `O(1)` non-recursive work.
- **Space Complexity:** `O(m * n)` — The memoization table `Boolean[][] f` uses `O(m * n)` memory, while the `char[]` copies and recursion call stack take `O(m + n)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [44wildcard-matching.java](./44wildcard-matching.java) |

---

## Key Learnings

- Boxed `Boolean[][]` in Java provides a clean 3-state (`null`, `true`, `false`) memoization table for top-down boolean DP without maintaining a separate `visited` array.
- Modeling `'*'` via local two-way/three-way transitions (`dfs(i + 1, j)` to stay on `'*'` vs `dfs(i, j + 1)` to skip `'*'`) avoids an inner `O(m)` loop over star expansion lengths, dropping complexity from `O(m^2 * n)` down to `O(m * n)`.
- Always verify the `i == m` boundary carefully in pattern-matching DP: an exhausted string `s` can still match a non-empty suffix of `p` if that suffix consists solely of `'*'`.
