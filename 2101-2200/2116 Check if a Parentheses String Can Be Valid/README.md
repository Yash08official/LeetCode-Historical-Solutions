---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Greedy
  - Bracket Sequences
---

# 2116. Check if a Parentheses String Can Be Valid

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2116` (`2116`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Greedy`, `Bracket Sequences` |
| **Solution Language** | Java |

---

## Problem Description

You are given a parentheses string `s` of length `n` (containing only `'('` and `')'`) and a binary string `locked` of length `n` (containing `'0'` and `'1'`).

- If `locked[i] == '1'`, character `s[i]` is fixed and cannot be modified.
- If `locked[i] == '0'`, character `s[i]` is unlocked and you may freely change it to either `'('` or `')'`.

Return `true` if `s` can be turned into a valid balanced parentheses string, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: s = "))()))", locked = "010100"
Output: true
Explanation: locked[1] == '1' and locked[3] == '1', so we cannot change s[1] or s[3].
We change s[0] and s[4] to '(' while leaving s[2] and s[5] unchanged to make s valid.
```

### Example 2

```text
Input: s = "()()", locked = "0000"
Output: true
Explanation: We do not need to make any changes because s is already valid.
```

### Example 3

```text
Input: s = ")", locked = "0"
Output: false
Explanation: locked permits us to change s[0].
Changing s[0] to either '(' or ')' will not make s valid.
```

### Example 4

```text
Input: s = "(((())(((())", locked = "111111010111"
Output: true
Explanation: locked permits us to change s[6] and s[8].
We change s[6] and s[8] to ')' to make s valid.
```

---

## Constraints

- `n == s.length == locked.length`

- `1 <= n <= 10^5`

- `s[i]` is either `'('` or `')'`.

- `locked[i]` is either `'0'` or `'1'`.

---

## Problem Understanding

- **Odd Length Immediately Fails:** Every valid parentheses string consists of matched pairs of `'('` and `')'`, so an odd length `n % 2 == 1` can never be valid.
- **Necessary & Sufficient Prefix/Suffix Conditions:**
  1. Moving **left to right**, no prefix `s[0..i]` may contain more locked `')'` characters than the combined count of locked `'('` and unlocked `'0'` positions before/at `i` (otherwise even turning every unlocked spot into `'('` still leaves an unmatched `')'`).
  2. Moving **right to left**, no suffix `s[i..n-1]` may contain more locked `'('` characters than the combined count of locked `')'` and unlocked `'0'` positions after/at `i` (otherwise even turning every unlocked spot into `')'` still leaves an unmatched `'('`).
- Together with `n` being even, passing both directional greedy checks is both **necessary and sufficient** for validity!

---

## Approach

### Brute Force Approach

For each unlocked position (`locked[i] == '0'`), branch recursively by trying both `'('` and `')'`, then validate the finished string at the leaves. With `u` unlocked characters (up to `10^5`), this explores `O(2^u)` states, which is completely infeasible.

### Optimized Approach

Reject odd-length strings immediately, then run **two `O(n)` greedy balance passes**—left-to-right treating unlocked indices as `'('` to absorb locked `')'`, and right-to-left treating unlocked indices as `')'` to absorb locked `'('`.

### Step-by-Step Thinking Process

1. Check parity first: if `n % 2 == 1`, return `false` immediately.
2. Sweep left-to-right (`i = 0` to `n - 1`) with balance counter `x = 0`: increment `x` whenever `s[i] == '('` or `locked[i] == '0'` (optimistically treating wildcards as `'('`); otherwise `s[i]` is a locked `')'`, so decrement `x` if `x > 0` or return `false` if `x == 0`.
3. Sweep right-to-left (`i = n - 1` down to `0`) resetting `x = 0`: increment `x` whenever `s[i] == ')'` or `locked[i] == '0'` (optimistically treating wildcards as `')'`); otherwise `s[i]` is a locked `'('`, so decrement `x` if `x > 0` or return `false` if `x == 0`.
4. If both sweeps succeed without `x` dropping below zero, return `true`.

### Algorithm / Intuition

Why do two independent optimistic passes guarantee a single consistent assignment exists? Think of unlocked positions as wildcards `'?'`:
- The **left-to-right pass** verifies that every locked `')'` can be matched with an earlier `'('` or `'?'`. Notice that if `x` remains positive at the end, `x` must be **even** (because every character changes `x` by `+1` or `-1`, so `x` has the same parity as `n`, which is even!). Any excess `'?'` pairs treated as `'('` during this pass could flip half of their excess to `')'` in pairs—*provided* no locked `'('` sits too far to the right to find a partner.
- The **right-to-left pass** symmetrically rules out that exact failure mode by verifying that every locked `'('` has enough `'?'` or locked `')'` characters to its right.

Thus, using a single integer `x` in two `O(n)` loops solves the problem in `O(1)` extra space without needing stacks of indices.

---

## Dry Run

Trace on **Example 1**: `s = "))()))"`, `locked = "010100"` (`n = 6`, even).

**Pass 1 — Left-to-Right (`'('` or `locked == '0'` increments `x`):**

| `i` | `s[i]` | `locked[i]` | Action | `x` after step |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `')'` | `'0'` | Unlocked -> `++x` | `1` |
| `1` | `')'` | `'1'` | Locked `')'`, `x > 0` -> `--x` | `0` |
| `2` | `'('` | `'0'` | `'('` / Unlocked -> `++x` | `1` |
| `3` | `')'` | `'1'` | Locked `')'`, `x > 0` -> `--x` | `0` |
| `4` | `')'` | `'0'` | Unlocked -> `++x` | `1` |
| `5` | `')'` | `'0'` | Unlocked -> `++x` | `2` |

Pass 1 succeeds!

**Pass 2 — Right-to-Left (`')'` or `locked == '0'` increments `x`):**
- `i = 5` (`')'`, `'0'`): `++x` -> `x = 1`
- `i = 4` (`')'`, `'0'`): `++x` -> `x = 2`
- `i = 3` (`')'`, `'1'`): `++x` -> `x = 3`
- `i = 2` (`'('`, `'0'`): `locked[2] == '0'` -> `++x` -> `x = 4`
- `i = 1` (`')'`, `'1'`): `++x` -> `x = 5`
- `i = 0` (`')'`, `'0'`): `++x` -> `x = 6`

Pass 2 succeeds -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We perform at most two linear scans of length `n` over `s` and `locked`.
- **Space Complexity:** `O(1)` — Only scalar integer variables (`n`, `x`, `i`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2116check-if-a-parentheses-string-can-be-valid.java](./2116check-if-a-parentheses-string-can-be-valid.java) |

---

## Key Learnings

- Wildcard parentheses validation reduces cleanly to checking even length plus two directional greedy balance invariants (left-to-right against excess `')'`, right-to-left against excess `'('`).
- A single-pass min/max open-count range `[minOpen, maxOpen]` or two-stack simulation also works, but the two-pass counter pattern is simpler and completely branch-safe in `O(1)` memory.
