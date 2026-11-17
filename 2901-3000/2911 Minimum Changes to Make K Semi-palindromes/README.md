---
comments: true
difficulty: Hard
tags:
  - Two Pointers
  - String
  - Dynamic Programming
---

# 2911. Minimum Changes to Make K Semi-palindromes

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-changes-to-make-k-semi-palindromes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2911` (`2911`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Two Pointers`, `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` and an integer `k`, partition `s` into `k` **substrings** such that the letter changes needed to make each substring a **semi-palindrome** are minimized.

Return the ***minimum** number of letter changes* required*.*

A **semi-palindrome** is a special type of string that can be divided into **palindromes** based on a repeating pattern. To check if a string is a semi-palindrome:​

	
- Choose a positive divisor `d` of the string's length. `d` can range from `1` up to, but not including, the string's length. For a string of length `1`, it does not have a valid divisor as per this definition, since the only divisor is its length, which is not allowed.
	
- For a given divisor `d`, divide the string into groups where each group contains characters from the string that follow a repeating pattern of length `d`. Specifically, the first group consists of characters at positions `1`, `1 + d`, `1 + 2d`, and so on; the second group includes characters at positions `2`, `2 + d`, `2 + 2d`, etc.
	
- The string is considered a semi-palindrome if each of these groups forms a palindrome.

Consider the string `"abcabc"`:

	
- The length of `"abcabc"` is `6`. Valid divisors are `1`, `2`, and `3`.
	
- For `d = 1`: The entire string `"abcabc"` forms one group. Not a palindrome.
	
- For `d = 2`:
	
		Group 1 (positions `1, 3, 5`): `"acb"`
		
- Group 2 (positions `2, 4, 6`): `"bac"`
		
- Neither group forms a palindrome.
	
	
	
- For `d = 3`:
	
		Group 1 (positions `1, 4`): `"aa"`
		
- Group 2 (positions `2, 5`): `"bb"`
		
- Group 3 (positions `3, 6`): `"cc"`
		
- All groups form palindromes. Therefore, `"abcabc"` is a semi-palindrome.

---

## Examples

### Example 1 

**Input: **  s = "abcac", k = 2 

**Output: **  1 

**Explanation: ** Divide `s` into `"ab"` and `"cac"`. `"cac"` is already semi-palindrome. Change `"ab"` to `"aa"`, it becomes semi-palindrome with `d = 1`.

### Example 2 

**Input: **  s = "abcdef", k = 2 

**Output: **  2 

**Explanation: ** Divide `s` into substrings `"abc"` and `"def"`. Each needs one change to become semi-palindrome.

### Example 3 

**Input: **  s = "aabbaa", k = 3 

**Output: **  0 

**Explanation: ** Divide `s` into substrings `"aa"`, `"bb"` and `"aa"`. All are already semi-palindromes.

 

**

---

## Constraints

**

	
- `2 <= s.length <= 200`
	
- `1 <= k <= s.length / 2`
	
- `s` contains only lowercase English letters.

---

## Problem Understanding

- Partition string `s` into $k$ substrings such that the total letter changes to make each substring a semi-palindrome are minimized.
- A substring of length $L$ is a semi-palindrome if there exists a proper divisor $d$ of $L$ ($1 \le d < L$) such that decomposing into $d$ interleaved subsequences yields palindromes in each subsequence.

---

## Approach

### Optimized Approach (Divisor Precomputation + Cost Table DP + Partitioning DP)

1. **Precompute Proper Divisors:** Precompute list of divisors for each length up to $n$.
2. **Precompute Stepwise Cost:** For each substring interval $[l, r]$, compute minimal changes required across all valid proper divisors $d$ of length $(r - l + 1)$. In each subsequence with step size $d$, use two pointers comparing symmetric characters and count mismatches.
3. **Partition DP:**
   - Define `dp[i]` as the minimum cost to partition prefix `s[0..i]` into `subs` semi-palindromes.
   - Base case for `subs = 1`: direct precomputed cost `dp[i] = getCost(0, i)`.
   - Transition for `subs = 2` to $k$:
     `dp[i] = min_{prev} (dp[prev] + getCost(prev + 1, i))`.
4. Return `dp[n - 1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n^3 \cdot \sigma_0(n) + k \cdot n^2)$ — Substring cost precomputation bounded by number of divisors, followed by standard $O(k \cdot n^2)$ interval DP.
- **Space Complexity:** $O(n^2)$ — Memoization table for pairwise substring costs `cost[l][r]`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2911minimum-changes-to-make-k-semi-palindromes.java](./2911minimum-changes-to-make-k-semi-palindromes.java) |

---

## Key Learnings

- Breaking multi-level string partitioning into precomputed interval transformation costs followed by modular DP allows tackling complex NP-like constraint problems cleanly.
