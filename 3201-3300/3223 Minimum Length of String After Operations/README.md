---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Counting
---

# 3223. Minimum Length of String After Operations

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-length-of-string-after-operations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3223` (`3223`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` consisting of lowercase English letters.

You can perform the following operation any number of times:
- Choose an index `i` in the string such that there is at least one character to the left of index `i` equal to `s[i]`, and at least one character to the right of index `i` that is also equal to `s[i]`.
- Delete the closest character to the left of `i` that equals `s[i]`, and delete the closest character to the right of `i` that equals `s[i]`.

Return the minimum possible length of the string after performing this process as many times as possible.

---

## Examples

### Example 1

**Input:** `s = "abaacbcbb"`

**Output:** `5`

**Explanation:**

We do the following operations:

- Choose index 2, then remove the characters at indices 0 and 3. The resulting string is `s = "bacbcbb"`.

- Choose index 3, then remove the characters at indices 0 and 5. The resulting string is `s = "acbcb"`.

### Example 2

**Input:** `s = "aa"`

**Output:** `2`

**Explanation:**

We cannot perform any operations, so we return the length of the original string.

---

## Constraints

- `1 <= s.length <= 2 * 10^5`

- `s` consists only of lowercase English letters.

---

## Problem Understanding

- **Independent Character Reductions:** Each operation removes exactly two identical characters of the same letter type (one to the left and one to the right of an identical anchor). Deleting occurrences of character `'a'` has zero effect on the relative order or count of any other character `'b'`, `'c'`, etc.
- **Step Size of 2:** As long as a character appears at least 3 times (`count >= 3`), we can pick any occurrence that has at least one identical character to its left and right, eliminating 2 occurrences.
- **Parity Invariant:** Each operation reduces the frequency of that character by 2:
  - If the initial frequency `x` is odd, we can repeatedly subtract 2 until exactly 1 occurrence remains (`x % 2 == 1 -> 1`).
  - If the initial frequency `x` is even and positive, we can repeatedly subtract 2 until exactly 2 occurrences remain (`x % 2 == 0 -> 2`). With only 2 occurrences left, no index can have identical characters both to its left and right.
- Characters with frequency 0 contribute 0.

---

## Approach

### Brute Force Approach

A naive simulation searches for an eligible index `i` in `s`, deletes its closest left and right matches, creates a new string, and repeats until no eligible index exists. Each deletion takes `O(|s|)` time, leading to `O(|s|^2)` total time, which easily times out given `|s| <= 2 * 10^5`.

### Optimized Approach

We count the frequencies of all 26 lowercase English letters in an integer array `cnt` of size 26. Then, for each letter with count `x > 0`, if `x` is odd (`x % 2 == 1`), it reduces to 1 character; if `x` is even, it reduces to 2 characters. We sum these resulting counts across all 26 letters to obtain the minimum possible length of `s` in a single pass.

### Step-by-Step Thinking Process

1. Notice that operations on different letters are completely independent.
2. Every operation takes 3 identical characters and deletes 2 of them, leaving 1 behind.
3. Therefore, as long as `count >= 3`, we can continuously apply the operation, reducing `count` by 2 each time.
4. If a character count is odd: `3 -> 1`, `5 -> 3 -> 1`, ..., so it always finishes at 1.
5. If a character count is even: `4 -> 2`, `6 -> 4 -> 2`, ..., so it always finishes at 2.
6. Count character frequencies with an array of size 26, then accumulate `(x % 2 == 1 ? 1 : 2)` for each positive count.

### Algorithm / Intuition

In `Solution.minimumLength`: we allocate `int[] cnt = new int[26]`. We iterate through `s`, incrementing `cnt[s.charAt(i) - 'a']`. We initialize `ans = 0`. Next, we iterate over each frequency `x` in `cnt`. If `x > 0`, we check its parity: if `x % 2 == 1`, the letter can be repeatedly reduced down to 1 character; if `x` is even, it can be reduced down to 2 characters. Adding `(x % 2 == 1 ? 1 : 2)` to `ans` directly computes the final length without ever rebuilding or mutating strings.

---

## Dry Run

### Step-by-Step Execution on Example 1: `s = "abaacbcbb"`

- **Step 1: Character Counts:**
  - `'a'`: 3
  - `'b'`: 4
  - `'c'`: 2
  - All other letters: 0

- **Step 2: Calculate Survived Length:**
  - For `'a'` (`x = 3`): odd -> `ans += 1` (`ans = 1`)
  - For `'b'` (`x = 4`): even -> `ans += 2` (`ans = 3`)
  - For `'c'` (`x = 2`): even -> `ans += 2` (`ans = 5`)

- **Result:** Return `ans = 5`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We make one pass over the string `s` of length `n` to compute character frequencies, followed by iterating over the 26 alphabet counters in `O(1)` time.
- **Space Complexity:** `O(1)` — The frequency array `cnt` has a fixed size of 26, requiring constant extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3223minimum-length-of-string-after-operations.java](./3223minimum-length-of-string-after-operations.java) |

---

## Key Learnings

- Analyzing the invariant effect of an operation (reducing frequency by 2 while preserving parity) simplifies complex string simulations into pure counting problems.
- Any character with odd frequency reduces to 1; any character with positive even frequency reduces to 2.
