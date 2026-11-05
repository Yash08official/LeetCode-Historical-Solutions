---
comments: true
difficulty: Medium
tags:
  - String
---

# 2914. Minimum Number of Changes to Make Binary String Beautiful

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2914` (`2914`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

We are given a 0-indexed binary string `s` that has an even length.

A string is defined as **beautiful** if it can be partitioned into one or more non-overlapping substrings such that:
1. Each substring has an **even length**.
2. Each substring contains **only `'0'`s or only `'1'`s**.

We can change any character in `s` from `'0'` to `'1'` or from `'1'` to `'0'`. We need to find the **minimum number of changes** required to make `s` beautiful.

---

## Examples

### Example 1

```text
Input: s = "1001"
Output: 2
Explanation: We change s[1] to 1 and s[3] to 0 to get string "1100".
It can be seen that the string "1100" is beautiful because we can partition it into "11|00".
It can be proven that 2 is the minimum number of changes needed to make the string beautiful.
```

### Example 2

```text
Input: s = "10"
Output: 1
Explanation: We change s[1] to 1 to get string "11".
It can be seen that the string "11" is beautiful because we can partition it into "11".
It can be proven that 1 is the minimum number of changes needed to make the string beautiful.
```

### Example 3

```text
Input: s = "0000"
Output: 0
Explanation: We don't need to make any changes as the string "0000" is beautiful already.
```

---

## Constraints

- `2 <= s.length <= 10^5`

- `s` has an even length.

- `s[i]` is either `'0'` or `'1'`.

---

## Problem Understanding

Key insights:
- The string has an even length, say $2m$.
- Any even-length string composed of identical characters can be split into smaller blocks of length 2 (e.g., "0000" = "00" + "00").
- Therefore, a string is beautiful if and only if every consecutive pair of characters `(s[2i], s[2i + 1])` consists of two identical characters ('00' or '11').
- The pairs `(s[0], s[1])`, `(s[2], s[3])`, ..., `(s[2m - 2], s[2m - 1])` are completely independent of each other.
- For each pair `(s[2i], s[2i + 1])`, if the two characters are different (i.e., '01' or '10'), exactly 1 change is required to make them match. If they are already identical, 0 changes are needed.

---

## Approach

### Brute Force Approach

A brute-force approach might attempt to generate all valid beautiful strings of length $N$ or use dynamic programming partitioning with arbitrary even lengths ($2, 4, 6, \dots$). However, because any valid even block of size $2k$ decomposes into $k$ independent blocks of size 2, higher-level DP is completely redundant. Checking pairs directly is optimal.

### Optimized Approach

The solution iterates through all consecutive pairs with a stride of 2:
```java
int ans = 0;
for (int i = 1; i < s.length(); i += 2) {
    if (s.charAt(i) != s.charAt(i - 1)) {
        ++ans;
    }
}
return ans;
```
Whenever `s.charAt(i) != s.charAt(i - 1)`, we must change one character of the pair to match the other, incrementing `ans`.

### Step-by-Step Thinking Process

1. A beautiful string must be partitionable into even substrings of identical characters.
2. The minimal even length is 2. Any larger even substring of identical characters (length 4, 6, ...) is simply multiple adjacent pairs of identical characters.
3. Thus, the problem reduces to ensuring `s[2k] == s[2k + 1]` for all $k = 0, 1, \dots, \frac{n}{2} - 1$.
4. Each pair `(s[2k], s[2k + 1])` is independent. If the two characters differ, we need 1 flip; if they are the same, 0 flips.
5. Loop `i` from 1 to `s.length() - 1` with step `i += 2`, compare `s.charAt(i)` with `s.charAt(i - 1)`, and increment `ans` when they differ.
6. Return `ans`.

### Algorithm / Intuition

By decomposing the even-length partition requirement into its fundamental building blocks of size 2, each pair `(s[i - 1], s[i])` for odd indices `i` must be homogeneous. If `s.charAt(i) != s.charAt(i - 1)`, one character must be flipped to match the other, requiring exactly 1 operation. The loop advances with `i += 2`, examining disjoint pairs across the entire string. Summing these mismatches gives the exact global minimum changes required.

---

## Dry Run

We trace Example 1 with `s = "1001"`:

- String length is 4. Loop runs for odd indices `i = 1, 3`.
- `i = 1`: Compare `s[1]` ('0') with `s[0]` ('1').
  - They differ ('0' != '1') -> `++ans` -> `ans = 1`.
- `i = 3`: Compare `s[3]` ('1') with `s[2]` ('0').
  - They differ ('1' != '0') -> `++ans` -> `ans = 2`.
- Loop ends. Return `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` where `n = s.length()`. We inspect each character of the string exactly once in a single pass of step 2.
- **Space Complexity:** `O(1)` auxiliary space — Uses only a single integer counter `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2914minimum-number-of-changes-to-make-binary-string-beautiful.java](./2914minimum-number-of-changes-to-make-binary-string-beautiful.java) |

---

## Key Learnings

- Decomposing complex partition constraints into their smallest possible atom (here, even length implies blocks of size 2) vastly simplifies greedy solutions.
- Disjoint independent pairs allow local optimal choices to immediately yield the global optimum.
- Step-by-two loops (`for (int i = 1; i < n; i += 2)`) provide a clean pattern for pair-wise processing.
