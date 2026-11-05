---
comments: true
difficulty: Easy
tags:
  - String
  - String Matching
---

# 796. Rotate String

**[View Problem on LeetCode](https://leetcode.com/problems/rotate-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0796` (`796`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `String Matching` |
| **Solution Language** | Java |

---

## Problem Description

Given two strings `s` and `goal`, return `true` if `s` can be transformed into `goal` through zero or more **left cyclic shifts**, and `false` otherwise.

One shift moves the first character of `s` to the end of `s` (for example, shifting `"abcde"` once produces `"bcdea"`).

---

## Examples

### Example 1

**Input:** `s = "abcde", goal = "cdeab"`

**Output:** `true`

**Explanation:**

Rotating `s` to the left by 2 positions moves `"ab"` to the end, resulting in `"cdeab"`, which is equal to `goal`.

### Example 2

**Input:** `s = "abcde", goal = "abced"`

**Output:** `false`

**Explanation:**

No sequence of rotations of `s` can produce `"abced"`. The characters appear in a different relative order, so `goal` is not a rotation of `s`.

---

## Constraints

- `1 <= s.length, goal.length <= 100`

- `s` and `goal` consist of lowercase English letters.

---

## Problem Understanding

- Rotating a string never changes its length, so if `s.length() != goal.length()`, `goal` can **never** be a rotation of `s`.
- Every cyclic rotation of `s = s[0 .. n-1]` has the form `s[k .. n-1] + s[0 .. k-1]`, which appears as a contiguous length-`n` substring inside `s + s`!
- Checking lengths first is mandatory — without `s.length() == goal.length()`, a shorter substring like `goal = "ab"` would falsely match inside `"abcdeabcde"`.

---

## Approach

### Brute Force Approach

Explicitly constructing all `n` cyclic rotations of `s` (via `s.substring(i) + s.substring(0, i)` for `0 <= i < n`) and comparing each rotation with `goal` allocates `O(n)` new strings and takes `O(n^2)` time.

### Optimized Approach

Verify `s.length() == goal.length()`, concatenate `doubles = s + s`, and check whether `goal` appears as a substring via `doubles.contains(goal)`.

### Step-by-Step Thinking Process

1. First guard against mismatched lengths: if `s.length() != goal.length()`, return `false` immediately.
2. Observe that concatenating `s` with itself (`s + s`) lays out every cyclic wrap-around boundary continuously.
3. Specifically, rotation by `k` positions equals `(s + s).substring(k, k + n)`.
4. Therefore, `goal` is a valid rotation of `s` if and only if `doubles.contains(goal)` returns `true`.

### Algorithm / Intuition

In `rotateString(String s, String goal)`:
- `if (s.length() != goal.length()) return false;` ensures `goal` has exact length `n`.
- `String doubles = s + s;` builds a string of length `2n` whose length-`n` windows are literally all rotations of `s`.
- `doubles.contains(goal)` delegates to `String.indexOf(goal) >= 0`, returning `true` iff `goal` matches one of those windows.

---

## Dry Run

Trace on **Example 1**: `s = "abcde"`, `goal = "cdeab"`.

1. Length check: `s.length()` (`5`) == `goal.length()` (`5`) -> passes.
2. `doubles = "abcde" + "abcde" = "abcdeabcde"`.
3. `doubles.contains("cdeab")`:
   - Matches `doubles.substring(2, 7)` (`ab[cdeab]cde`).
   - Returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Building `s + s` takes `O(n)`, and Java's `String.contains` (`indexOf`) takes `O(n^2)` worst-case character comparisons (`O(n)` if implemented with KMP/Z-algorithm; instantaneous here since `n <= 100`).
- **Space Complexity:** `O(n)` — Allocates the concatenated string `doubles` of length `2n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [796rotate-string.java](./796rotate-string.java) |

---

## Key Learnings

- The `s + s` concatenation trick reduces cyclic rotation checks to a standard substring search.
- Always pair the `(s + s).contains(goal)` trick with an explicit `s.length() == goal.length()` check.
