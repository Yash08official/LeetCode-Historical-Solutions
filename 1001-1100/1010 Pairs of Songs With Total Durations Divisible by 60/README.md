---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Counting
---

# 1010. Pairs of Songs With Total Durations Divisible by 60

**[View Problem on LeetCode](https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1010` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a list of songs where the `i`-th song has a duration of `time[i]` seconds.

Return the number of pairs of songs for which their total duration in seconds is divisible by `60`. Formally, we want the number of indices `i`, `j` such that `i < j` with `(time[i] + time[j]) % 60 == 0`.

---

## Problem Understanding

- Condition $(a + b) \pmod{60} == 0$ means that remainder $x = a \pmod{60}$ requires a partner with remainder $y = (60 - x) \pmod{60}$.
- For $x = 0$, $y = (60 - 0) \pmod{60} = 0$.
- For any other $x$, $y = 60 - x$.

---

## Approach

### Remainder Frequency Table

1. Maintain an array `cnt` of size 60 where `cnt[r]` records how many seen songs have remainder $r \pmod{60}$.
2. For each song duration $x$ in `time`:
   - Compute remainder $x = x \pmod{60}$.
   - Complement remainder is $y = (60 - x) \pmod{60}$.
   - Add existing count `cnt[y]` to answer `ans`.
   - Increment `cnt[x]`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass over `time`.
- **Space Complexity:** $O(1)$ auxiliary space (fixed array of size 60).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1010pairs-of-songs-with-total-durations-divisible-by-60.java](./1010pairs-of-songs-with-total-durations-divisible-by-60.java) |

---

## Key Learnings

- Modular arithmetic maps infinite sums into a finite set of remainder pairs.
- Single-pass hash/frequency tracking counts pairs with $i < j$ without duplicates.
