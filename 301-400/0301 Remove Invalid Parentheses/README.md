---
comments: true
difficulty: Hard
tags:
  - String
  - Backtracking
  - Breadth-First Search
---

# 301. Remove Invalid Parentheses

**[View Problem on LeetCode](https://leetcode.com/problems/remove-invalid-parentheses/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0301` (`301`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Backtracking`, `Breadth-First Search` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` containing lowercase English letters as well as `'('` and `')'` characters, delete the **minimum possible number** of invalid parentheses so that the resulting string has balanced parentheses.

Return a list of all **unique** valid strings achievable with that minimum removal count, in any order. Letters cannot be removed.

---

## Examples

### Example 1

```text
Input: s = "()())()"
Output: ["(())()","()()()"]
```

### Example 2

```text
Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]
```

### Example 3

```text
Input: s = ")("
Output: [""]
```

---

## Constraints

- `1 <= s.length <= 25`

- `s` consists of lowercase English letters and parentheses `'('` and `')'`.

- There will be at most `20` parentheses in `s`.

---

## Problem Understanding

- A parenthesis string is valid if and only if every prefix has at least as many `'('` as `')'` (`lcnt >= rcnt`) and the complete string has equal counts (`lcnt == rcnt`).
- Instead of guessing how many characters to delete, we can compute the **exact** number of misplaced `'('` (`l`) and misplaced `')'` (`r`) upfront in a single linear scan.
- Multiple distinct deletion indices can yield the exact same resulting string (e.g., deleting either `')'` in `"())"` produces `"()"`), so results must be deduplicated.

---

## Approach

### Brute Force Approach

A breadth-first search (BFS) level-by-level generates all strings with `1` deletion, then `2` deletions, and so on until finding a level with valid strings. While BFS naturally finds the minimum removal count, generating `O(n)` substrings at every node creates heavy intermediate string/hash-set memory churn before even knowing how many `'('` vs `')'` actually need removal.

### Optimized Approach

First count the exact minimum removals required—`l` extra `'('` and `r` extra `')'`—in `O(n)` time, then run pruned DFS backtracking (`dfs(i, l, r, lcnt, rcnt, t)`) collecting unique valid strings in a `HashSet<String> ans`.

### Step-by-Step Thinking Process

1. Scan `s` once to compute `l` and `r`: `'('` increments `l`; `')'` decrements `l` if an unmatched `'('` exists (`l > 0`), or else increments `r` (an unmatched `')'` that must be removed).
2. Run `dfs(i, l, r, lcnt, rcnt, t)` over index `i`, remaining `'('` deletions `l`, remaining `')'` deletions `r`, kept `'('` count `lcnt`, kept `')'` count `rcnt`, and built string `t`.
3. Base case at `i == n`: if `l == 0 && r == 0`, add `t` to `Set<String> ans` (since `l` and `r` matched exact excess counts and `lcnt >= rcnt` held throughout, `lcnt == rcnt` is guaranteed!).
4. Prune immediately if `n - i < l + r` (fewer characters left in `s` than required deletions) or `lcnt < rcnt` (kept prefix already has an unmatched `')'`).
5. At `c = s.charAt(i)`, try deleting `c` if `c == '(' && l > 0` or `c == ')' && r > 0`, and always try keeping `c` (updating `lcnt` or `rcnt` if `c` is a parenthesis).

### Algorithm / Intuition

Precomputing `(l, r)` transforms an open-ended optimization search into a fixed-budget constrained search. Two pruning rules keep the search space tight: `n - i < l + r` aborts branches that waited too long to delete excess parentheses, and `lcnt < rcnt` aborts any prefix like `")("` the instant a closing parenthesis lacks a matching opening parenthesis. Finally, `HashSet<String> ans` collapses duplicate results arising from deleting adjacent identical parentheses.

---

## Dry Run

Tracing **Example 1** (`s = "()())()"`, `n = 7`):

1. **Precomputation:**
   - `'('` (`l=1`), `')'` (`l=0`), `'('` (`l=1`), `')'` (`l=0`), `')'` (`l=0 -> r=1`), `'('` (`l=1`), `')'` (`l=0`).
   - Minimum removals needed: `l = 0` (`'('`), `r = 1` (`')'`).
2. **DFS (`dfs(0, 0, 1, 0, 0, "")`):**
   - Only one `')'` can be deleted (`r = 1`), and `lcnt < rcnt` prunes any branch that keeps 3 `')'` before a third `'('`.
   - Deleting `s[1] = ')'` -> builds `"(())()"` (`l=0, r=0` at `i=7`) -> added to `ans`.
   - Deleting `s[3] = ')'` -> builds `"()()()"` -> added to `ans`.
   - Deleting `s[4] = ')'` -> builds `"()()()"` -> deduplicated by `ans`.
   - Keeping `s[0..4]` (`"()())"`) hits `lcnt = 2 < rcnt = 3` at `i = 5` -> pruned immediately!
3. Returns `["(())()", "()()()"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * 2^n)` — There are at most 20 parentheses, each branching into at most 2 choices (delete or keep), with `O(n)` string concatenation and hashing along paths.
- **Space Complexity:** `O(n^2 + |ans| * n)` — Recursion depth is `n` with prefix strings `t` up to length `n` on the call stack, plus `HashSet` storage for unique valid outputs.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [301remove-invalid-parentheses.java](./301remove-invalid-parentheses.java) |

---

## Key Learnings

- Counting unmatched `'('` (`l`) and unmatched `')'` (`r`) in `O(n)` gives the exact minimum deletion count before any search begins.
- Combining remaining-budget pruning (`n - i < l + r`) with prefix-validity pruning (`lcnt < rcnt`) eliminates dead branches early.
