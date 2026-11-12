---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
---

# 1003. Check If Word Is Valid After Substitutions

**[View Problem on LeetCode](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1003` |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, determine if it is valid.

A string `s` is valid if, starting with an empty string `t = ""`, you can apply the following operation any number of times:
- Insert the string `"abc"` into any position in `t`.

---

## Problem Understanding

- Every valid insertion adds exactly 3 characters (`"abc"`). Thus, any valid string must have length divisible by 3.
- In reverse, whenever `"abc"` appears consecutively, it must have been an inserted block that can be safely erased.
- Erasing `"abc"` immediately exposes previously split characters, perfectly mimicking a stack or tape reducer.

---

## Approach

### Stack / StringBuilder Tape Simulation

1. If `s.length() % 3 != 0`, return `false` immediately.
2. Iterate through each character `c` of `s`, appending `c` to a `StringBuilder t`.
3. After appending, if the trailing 3 characters form `"abc"`, delete them from `t`.
4. After processing the full string, return `true` if `t` is empty, otherwise `false`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Each character is pushed and popped at most once.
- **Space Complexity:** $O(N)$ for the `StringBuilder` buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1003check-if-word-is-valid-after-substitutions.java](./1003check-if-word-is-valid-after-substitutions.java) |

---

## Key Learnings

- Recursive elimination of substrings behaves identically to balanced parenthesis matching with stack cancellation.
