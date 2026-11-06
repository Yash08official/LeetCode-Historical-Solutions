---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
---

# 664. Strange Printer

**[View Problem on LeetCode](https://leetcode.com/problems/strange-printer/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0664` (`664`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

There is a strange printer with the following two special properties:

1. The printer can only print a sequence of the same character each time.
2. At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.

Given a string `s`, return the minimum number of turns the printer needed to print it.

---

## Examples

### Example 1

```text
Input: s = "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".
```

### Example 2

```text
Input: s = "aba"
Output: 2
Explanation: Print "aaa" first and then print 'b' in the middle.
```

---

## Constraints

- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.

---

## Problem Understanding

- We can print over already-printed segments.
- If the first character $s[i]$ and the last character $s[j]$ of a substring are the same, printing $s[i]$ at the very beginning can cover all occurrences of that character up to $j$ in a single stroke.
- This overlapping subproblem structure over substrings naturally suggests **Interval Dynamic Programming**.

---

## Approach

### Optimized Approach (Interval Dynamic Programming)

1. Let $f[i][j]$ denote the minimum number of turns needed to print substring $s[i..j]$.
2. **Base case:** For all $i$, $f[i][i] = 1$.
3. Compute DP values for substrings of increasing lengths:
   - For $i$ from $n - 1$ down to $0$ and $j$ from $i + 1$ to $n - 1$:
     - If $s[i] == s[j]$, the printer can print $s[i]$ all the way to $j$ on the turn used for $s[i]$, so $f[i][j] = f[i][j - 1]$.
     - Otherwise, split the interval at every possible partition point $k \in [i, j - 1]$:
       $$f[i][j] = \min_{i \le k < j} (f[i][k] + f[k + 1][j])$$
4. Return $f[0][n - 1]$.

---

## Complexity Analysis

- **Time Complexity:** $O(N^3)$ — There are $O(N^2)$ interval states $(i, j)$, and evaluating the optimal split $k$ takes $O(N)$ operations. With $N \le 100$, $N^3 pprox 10^6$, running well within $15$ ms.
- **Space Complexity:** $O(N^2)$ — A 2D array of size $N 	imes N$ to store subproblem solutions.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [664strange-printer.java](./664strange-printer.java) |

---

## Key Learnings

- Interval DP problems with overwrite capabilities benefit from exploiting boundary matching ($s[i] == s[j]$) to reduce transitions.
- Ordering loops by decreasing left index and increasing right index ensures subintervals are solved before their supersets.
