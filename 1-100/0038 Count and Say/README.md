---
comments: true
difficulty: Medium
tags:
  - String
---

# 38. Count and Say

**[View Problem on LeetCode](https://leetcode.com/problems/count-and-say/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0038` (`38`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

The **count-and-say** sequence of digit strings starts with `countAndSay(1) = "1"`, and for every `n > 1`, `countAndSay(n)` is the **run-length encoding (RLE)** of `countAndSay(n - 1)`.

To compute the run-length encoding of a string, split it into maximal contiguous groups of identical digits and replace each group with its count followed by the digit itself (for instance, `"21"` has one `'2'` then one `'1'`, becoming `"1211"`). Given `n`, return the `n`-th term of the sequence.

---

## Examples

### Example 1

**Input:** `n = 4`

**Output:** `"1211"`

**Explanation:**

```text
countAndSay(1) = "1"
countAndSay(2) = RLE of "1" = "11"
countAndSay(3) = RLE of "11" = "21"
countAndSay(4) = RLE of "21" = "1211"
```

### Example 2

**Input:** `n = 1`

**Output:** `"1"`

**Explanation:**

This is the base case.

---

## Constraints

- `1 <= n <= 30`

---

## Follow-up Questions

Could you solve it iteratively?

The implemented Java solution already solves the problem **iteratively** via `while (--n > 0)`, maintaining only the previous term `s` and current `StringBuilder t` instead of `O(n)` recursive stack frames.

---

## Problem Understanding

- **Sequential dependency:** Term `k` depends only on term `k - 1`, meaning we only ever need to keep the current string `s` in memory while building the next string `t`.
- **Two-pointer group counting:** Finding maximal runs of identical consecutive characters in `s` is a linear two-pointer scan where `j` advances from `i` while `s.charAt(j) == s.charAt(i)`, giving run length `j - i`.

---

## Approach

### Brute Force Approach

Solving recursively while concatenating immutable Java `String` objects via `res += count + ch` inside inner loops repeatedly reallocates and copies character arrays in `O(L^2)` time per term instead of `O(L)`.

### Optimized Approach

The implemented Java solution computes the sequence **iteratively** (`while (--n > 0)`), starting from `String s = "1"`. In each round, a `StringBuilder t` scans `s` using group-start pointer `i` and group-end pointer `j`, appending `(j - i)` and `s.charAt(i)` in linear time before updating `s = t.toString()`.

### Step-by-Step Thinking Process

1. Initialize `String s = "1"` corresponding to the base case `n = 1`.
2. Run `n - 1` transformation steps using `while (--n > 0)`.
3. Inside each step, create a fresh `StringBuilder t = new StringBuilder()` and scan `s` starting at `i = 0`.
4. Set `j = i` and advance `++j` while `j < s.length() && s.charAt(j) == s.charAt(i)` to measure the contiguous run `[i .. j - 1]`.
5. Append the count `(j - i)` and the digit `s.charAt(i)` to `t`, jump `i = j` to the start of the next run, and after finishing `s`, set `s = t.toString()`.

### Algorithm / Intuition

Notice how the outer `for (int i = 0; i < s.length();)` omits `++i` in the loop header and instead sets `i = j` at the bottom of the body. Because the inner `while` loop advances `j` past every character equal to `s.charAt(i)` (at least once, since `j` starts at `i`), every character in `s` is visited at most twice—once by `j` and at most once as a group start `i`—guaranteeing strict `O(s.length())` work per RLE transformation.

---

## Dry Run

Tracing Example 1: `n = 4`

- **Initial:** `s = "1"`
- **Step 1 (`--n` -> `3 > 0`), scanning `s = "1"`:**
  - `i = 0`: `j` advances to `1` (`j - i = 1`, char `'1'`) -> `t = "11"`, `i = 1`. Update `s = "11"`.
- **Step 2 (`--n` -> `2 > 0`), scanning `s = "11"`:**
  - `i = 0`: `j` advances to `2` (`j - i = 2`, char `'1'`) -> `t = "21"`, `i = 2`. Update `s = "21"`.
- **Step 3 (`--n` -> `1 > 0`), scanning `s = "21"`:**
  - `i = 0`: `j` advances to `1` (`j - i = 1`, char `'2'`) -> `t` becomes `"12"`, `i = 1`.
  - `i = 1`: `j` advances to `2` (`j - i = 1`, char `'1'`) -> `t` becomes `"1211"`, `i = 2`. Update `s = "1211"`.
- **Check `--n` -> `0 > 0` (`false`):** returns `"1211"`.

---

## Complexity Analysis

- **Time Complexity:** `O(sum_{k=1}^{n} L_k)` — Linear in the sum of lengths of the `n` generated strings (bounded loosely by `O(2^n)` and tightly by Conway's constant `O(1.3036^n)`; for `n = 30`, `L_30 = 4462`).
- **Space Complexity:** `O(L_n)` — Holds only the current string `s` and next `StringBuilder t` (no recursion stack).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [38count-and-say.java](./38count-and-say.java) |

---

## Key Learnings

- The two-pointer group-scanning idiom (`int j = i; while (...) ++j; ... i = j;`) cleanly processes contiguous runs in `O(L)` without needing post-loop flush code for the final group.
- Using `StringBuilder` inside iterative string transformations avoids quadratic string-copying overhead.
