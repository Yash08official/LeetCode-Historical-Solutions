---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
---

# 1007. Minimum Domino Rotations For Equal Row

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1007` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

In a row of dominoes, `tops[i]` and `bottoms[i]` represent the top and bottom halves of the `i`-th domino. We may rotate the `i`-th domino so that `tops[i]` and `bottoms[i]` swap values.

Return the minimum number of rotations so that all the values in `tops` are the same, or all the values in `bottoms` are the same. If it cannot be done, return `-1`.

---

## Problem Understanding

- If all dominoes can be aligned to value $x$, then the first domino must contain $x$ either on `tops[0]` or `bottoms[0]`.
- Thus, there are at most **two candidates** for the target value: `tops[0]` and `bottoms[0]`.

---

## Approach

### Two-Candidate Validation

1. Define helper function $f(x)$ that returns the minimum rotations needed to make either the top or bottom row all $x$:
   - For every domino $i$, if neither `tops[i] == x` nor `bottoms[i] == x`, target $x$ is impossible; return $\infty$.
   - Count how many times $x$ appears in `tops` (`cnt1`) and in `bottoms` (`cnt2`).
   - The minimum rotations to make one row all $x$ is $n - \max(cnt1, cnt2)$.
2. Evaluate $\min(f(tops[0]), f(bottoms[0]))$.
3. If the minimum exceeds $n$, return `-1`, otherwise return the result.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — At most two linear scans over the arrays.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1007minimum-domino-rotations-for-equal-row.java](./1007minimum-domino-rotations-for-equal-row.java) |

---

## Key Learnings

- Identifying bottleneck candidates from boundary constraints (index 0) limits candidate checking to $O(1)$ candidates.
