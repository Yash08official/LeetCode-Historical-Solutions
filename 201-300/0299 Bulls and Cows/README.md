---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - String
  - Counting
---

# 299. Bulls and Cows

**[View Problem on LeetCode](https://leetcode.com/problems/bulls-and-cows/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0299` (`299`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `String`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are playing the **Bulls and Cows** game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

	
- The number of "bulls", which are digits in the guess that are in the correct position.
	
- The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.

Given the secret number `secret` and your friend's guess `guess`, return *the hint for your friend's guess*.

The hint should be formatted as `"xAyB"`, where `x` is the number of bulls and `y` is the number of cows. Note that both `secret` and `guess` may contain duplicate digits.

---

## Examples

### Example 1

```text
**Input:** secret = "1807", guess = "7810"
**Output:** "1A3B"
**Explanation:** Bulls are connected with a '|' and cows are underlined:
"1807"
  |
"7810"
```

### Example 2

```text
**Input:** secret = "1123", guess = "0111"
**Output:** "1A1B"
**Explanation:** Bulls are connected with a '|' and cows are underlined:
"1123"        "1123"
  |      or     |
"0111"        "0111"
Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.
```

 

**

---

## Constraints

**

	
- `1 <= secret.length, guess.length <= 1000`
	
- `secret.length == guess.length`
	
- `secret` and `guess` consist of digits only.

---

## Problem Understanding

- Compare `secret` and `guess`: count exact digit-position matches (`x` bulls) and mismatched digits that appear in both (`y` cows), formatted as `"xAyB"`.

---

## Approach

### Optimized Approach (Single-Pass Bulls + Digit Frequency Overlap for Cows)
1. Iterate `i` over `secret` and `guess`:
   - If `a == b`, increment `x`.
   - Else increment `cnt1[a]` and `cnt2[b]` (10-bucket digit counts).
2. Sum `y += Math.min(cnt1[i], cnt2[i])` over digits `0..9`.
3. Return `String.format("%dA%dB", x, y)`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Single pass over strings plus 10-iteration digit loop.
- **Space Complexity:** $O(1)$ — Fixed two 10-element arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [299bulls-and-cows.java](./299bulls-and-cows.java) |

---

## Key Learnings

- Excluding bulls during the first pass lets cows be computed cleanly as the sum of `min(cnt1[d], cnt2[d])` over all digits.
