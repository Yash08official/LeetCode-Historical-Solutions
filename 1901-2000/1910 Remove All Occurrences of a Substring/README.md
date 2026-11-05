---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Simulation
---

# 1910. Remove All Occurrences of a Substring

**[View Problem on LeetCode](https://leetcode.com/problems/remove-all-occurrences-of-a-substring/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1910` (`1910`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given two lowercase English strings `s` and `part`, repeatedly find the **leftmost** occurrence of `part` as a contiguous substring in `s` and remove it, continuing until `part` no longer appears anywhere in `s`.

Return the final string `s` after all occurrences of `part` have been removed.

---

## Examples

### Example 1

```text
Input: s = "daabcbaabcbc", part = "abc"
Output: "dab"
Explanation: The following operations are done:
- s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
- s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
- s = "dababc", remove "abc" starting at index 3, so s = "dab".
Now s has no occurrences of "abc".
```

### Example 2

```text
Input: s = "axxxxyyyyb", part = "xy"
Output: "ab"
Explanation: The following operations are done:
- s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
- s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
- s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
- s = "axyb", remove "xy" starting at index 1 so s = "ab".
Now s has no occurrences of "xy".
```

---

## Constraints

- `1 <= s.length <= 1000`

- `1 <= part.length <= 1000`

- `s`​​​​​​ and `part` consists of lowercase English letters.

---

## Problem Understanding

- **Cascading Removals:** Deleting `part` can stitch characters before and after it together to form a *new* occurrence of `part` (e.g., removing `"xy"` from `"axxyb"` produces `"axyb"`, which again contains `"xy"`).
- **Leftmost Rule:** Notice that removing the *leftmost* match specifically matters when overlapping instances of `part` exist (e.g., `part = "aba"` inside `"ababa"`).
- **Modest Constraints:** Both `s.length` and `part.length` are at most `1000`, and both contain only lowercase letters `'a'-'z'`.

---

## Approach

### Brute Force Approach

Manually writing nested character loops to search from index `0` after every single deletion and rebuilding character arrays by hand is verbose, though conceptually identical to direct iterative simulation.

### Optimized Approach

Directly simulate the process using Java's built-in string methods: while `s.contains(part)` is `true`, replace the leftmost match with an empty string via `s = s.replaceFirst(part, "")`.

### Step-by-Step Thinking Process

1. Observe that with `s.length() <= 1000`, at most `s.length() / part.length() <= 1000` removals can ever happen.
2. Check whether `part` still exists in `s` using `s.contains(part)`.
3. Remove only the **first** (leftmost) occurrence using `s.replaceFirst(part, "")` — not `s.replace(part, "")`, which would remove all non-overlapping occurrences simultaneously instead of strictly leftmost-first!
4. Repeat until `s.contains(part)` returns `false`, then return `s`.

### Algorithm / Intuition

Each iteration of `while (s.contains(part))` verifies whether `part` appears in `s`. If so, `s.replaceFirst(part, "")` finds the earliest match from index `0` and returns a new string with that single substring excised. Note an important Java detail: `String.replaceFirst` interprets its first argument as a **regular expression**, which works safely as a literal match here solely because `part` is guaranteed by the constraints to contain only lowercase letters `'a'-'z'` (no regex metacharacters like `.` or `*`).

---

## Dry Run

Using **Example 1**: `s = "daabcbaabcbc"`, `part = "abc"`

| Iteration | `s` Before | `s.contains("abc")` | Leftmost Match Index | `s` After `replaceFirst` |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `"daabcbaabcbc"` | `true` | index `2` (`da[abc]baabcbc`) | `"dabaabcbc"` |
| 2 | `"dabaabcbc"` | `true` | index `4` (`daba[abc]bc`) | `"dababc"` |
| 3 | `"dababc"` | `true` | index `3` (`dab[abc]`) | `"dab"` |
| 4 | `"dab"` | `false` | — | Loop terminates |

Final return value: `"dab"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Let `n = s.length()` and `m = part.length()`. Each removal shrinks `s` by `m`, so the loop runs at most `n / m` times; each step scans/matches in `O(n * m)` worst-case time, giving `O((n / m) * (n * m)) = O(n^2)` total operations (plus small constant-factor regex compilation overhead).
- **Space Complexity:** `O(n + m)` — Each iteration allocates a new `String` of length up to `n` and compiles a `Pattern` of length `m` (garbage-collected across iterations).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1910remove-all-occurrences-of-a-substring.java](./1910remove-all-occurrences-of-a-substring.java) |

---

## Key Learnings

- Be careful with `replace` vs. `replaceFirst`: if `s = "ababa"` and `part = "aba"`, leftmost removal can differ from simultaneous non-overlapping replacement if cascading creates different prefixes.
- Java's `String.replaceFirst(regex, replacement)` parses `regex` as a regular expression — if inputs could contain punctuation, wrap `part` in `Pattern.quote(part)` or use `indexOf` + `StringBuilder`.
- For much larger constraints (`n <= 10^5`), simulating a character stack (`StringBuilder`) combined with KMP prefix-automaton state tracking solves this in optimal `O(n + m)` time.
