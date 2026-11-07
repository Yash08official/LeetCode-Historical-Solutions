---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Greedy
---

# 55. Jump Game

**[View Problem on LeetCode](https://leetcode.com/problems/jump-game/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0055` (`55`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return `true` *if you can reach the last index, or* `false` *otherwise*.

---

## Examples

### Example 1

```text
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

### Example 2

```text
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
```

---

## Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

---

## Problem Understanding

- We start at index `0`. At each index `i`, we can jump anywhere from `1` to `nums[i]` steps forward.
- We need to know if the last index (`nums.length - 1`) is reachable.
- We only need to track the furthest reachable index `mx` seen so far.

---

## Approach

### Optimized Approach (Greedy Max Reachable Window)

1. Maintain `mx = 0` representing the furthest index reachable.
2. Iterate `i` from `0` to `nums.length - 1`:
   - If `mx < i`, we cannot reach index `i`, so return `false`.
   - Update `mx = Math.max(mx, i + nums[i])`.
3. If the loop completes, all indices up to the end are reachable, so return `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Single pass through the array of length $N$.
- **Space Complexity:** $O(1)$ — Only a single integer variable `mx` is maintained.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [55jump-game.java](./55jump-game.java) |

---

## Key Learnings

- Greedy tracking of the maximum reachable boundary avoids exponential recursion or $O(N^2)$ DP.
- If current position exceeds `mx`, future progression is impossible.
