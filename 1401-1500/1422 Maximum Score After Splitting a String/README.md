---
comments: true
difficulty: Easy
tags:
  - String
  - Prefix Sum
---

# 1422. Maximum Score After Splitting a String

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-score-after-splitting-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1422` (`1422`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting of characters `'0'` and `'1'`, split the string into two non-empty substrings `left` and `right` such that `s = left + right`.

The score after splitting is defined as the number of zeros in `left` plus the number of ones in `right`. Return the maximum score achievable over all possible valid splits.

---

## Examples

### Example 1

```text
Input: s = "011101"
Output: 5
Explanation:
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5
left = "01" and right = "1101", score = 1 + 3 = 4
left = "011" and right = "101", score = 1 + 2 = 3
left = "0111" and right = "01", score = 1 + 1 = 2
left = "01110" and right = "1", score = 2 + 1 = 3
```

### Example 2

```text
Input: s = "00111"
Output: 5
Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5
```

### Example 3

```text
Input: s = "1111"
Output: 3
```

---

## Constraints

- `2 <= s.length <= 500`

- The string `s` consists of characters `'0'` and `'1'` only.

---

## Problem Understanding

Key observations:
- Both substrings `left` and `right` must be non-empty. For a string of length `n`, there are `n - 1` possible split positions (after index `i` for `0 <= i <= n - 2`).
- Score at split after index `i` is `(zeros in s[0...i]) + (ones in s[i+1...n-1])`.
- Notice that `ones in right = total_ones - ones in left`.
- Precomputing total ones allows us to track both zeros in left and ones in right in a single pass.

---

## Approach

### Brute Force Approach

For every split boundary `i` from `0` to `n - 2`, extract substrings `s.substring(0, i + 1)` and `s.substring(i + 1)` and count zeros in the left part and ones in the right part. This takes `O(n)` per split, resulting in `O(n^2)` time.

### Optimized Approach

Two-pass prefix/suffix counting. First, count the total number of `'1'`s in `s` and store it in variable `r`. Then, iterate through split boundaries from `i = 0` to `n - 2`: if `s.charAt(i) == '0'`, increment `l` (zeros in left); if `s.charAt(i) == '1'`, decrement `r` (ones in right). Update `ans = max(ans, l + r)` at each step.

### Step-by-Step Thinking Process

1. Count total `'1'`s across the entire string in a preliminary pass; this represents the count of ones if the right substring contained all characters.
2. Maintain `l = 0` (zeros in left) and `r = total_ones` (ones remaining in right).
3. Iterate `i` from `0` to `n - 2` (stopping before the last character to keep right non-empty).
4. Update `l` and `r` based on `s.charAt(i)`: if `'0'`, `l` increases by 1; if `'1'`, `r` decreases by 1.
5. Record `ans = Math.max(ans, l + r)` after each update and return `ans`.

### Algorithm / Intuition

The solution implements `maxScore(String s)`:
- First pass loops over `s` incrementing `r` whenever `s.charAt(i) == '1'`.
- Second pass loops `i` from `0` to `n - 2`:
  - `l += (s.charAt(i) - '0') ^ 1`: when character is `'0'`, `0 ^ 1 = 1`, so `l` increments; when `'1'`, `1 ^ 1 = 0`.
  - `r -= s.charAt(i) - '0'`: when character is `'1'`, `r` decrements by 1; when `'0'`, `r` is unchanged.
  - `ans = Math.max(ans, l + r)` updates the maximum score.
- Returns `ans`.

---

## Dry Run

Walkthrough on Example 1: `s = "011101"`, `n = 6`.
- Pass 1: Total `'1'`s at indices 1, 2, 3, 5 -> `r = 4`. Initialize `l = 0, ans = 0`.
- Pass 2 (`i` from 0 to 4):
  - `i = 0 ('0')`: `l += 1 = 1`, `r -= 0 = 4`. `l + r = 5`. `ans = max(0, 5) = 5`.
  - `i = 1 ('1')`: `l += 0 = 1`, `r -= 1 = 3`. `l + r = 4`. `ans = max(5, 4) = 5`.
  - `i = 2 ('1')`: `l += 0 = 1`, `r -= 1 = 2`. `l + r = 3`. `ans = max(5, 3) = 5`.
  - `i = 3 ('1')`: `l += 0 = 1`, `r -= 1 = 1`. `l + r = 2`. `ans = max(5, 2) = 5`.
  - `i = 4 ('0')`: `l += 1 = 2`, `r -= 0 = 1`. `l + r = 3`. `ans = max(5, 3) = 5`.
- Final result: `5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We make two linear passes over the string of length `n`.
- **Space Complexity:** `O(1)` — Only a few primitive integer variables (`l`, `r`, `ans`, `n`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1422maximum-score-after-splitting-a-string.java](./1422maximum-score-after-splitting-a-string.java) |

---

## Key Learnings

- Precomputing the total sum transforms a two-sided prefix/suffix check into an `O(1)` rolling update.
- Bitwise XOR with 1 (`val ^ 1`) cleanly flips binary digits 0 and 1 without conditional branches.
