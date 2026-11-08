---
comments: true
difficulty: Medium
tags:
  - Backtracking
---

# 77. Combinations

**[View Problem on LeetCode](https://leetcode.com/problems/combinations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0077` (`77`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

Given two integers `n` and `k`, return *all possible combinations of* `k` *numbers chosen from the range* `[1, n]`.

You may return the answer in **any order**.

---

## Examples

### Example 1

```text
Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
```

### Example 2

```text
Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.
```

---

## Constraints

- `1 <= n <= 20`
- `1 <= k <= n`

---

## Problem Understanding

- We need to select $k$ distinct integers from the range $[1, n]$.
- Order does not matter, so $[1, 2]$ and $[2, 1]$ are identical.
- To prevent duplicate combinations, we enforce a strictly increasing selection: the next number chosen must be strictly greater than the current one.

---

## Approach

### Optimized Approach (Recursive Backtracking / DFS)

1. Maintain a temporary list `t` holding the current combination and a global list `ans` to store valid combinations.
2. Define a recursive helper `dfs(i)` where `i` represents the smallest candidate value to be considered:
   - **Base Case:** If `t.size() == k`, we have accumulated $k$ numbers. Add a snapshot copy `new ArrayList<>(t)` to `ans` and return.
   - If `i > n`, no further valid integers remain to select, return.
   - Iterate through possible choices `j` from `i` to `n`:
     - Add `j` to `t`.
     - Recurse on `dfs(j + 1)`.
     - Backtrack by removing the last element added to `t`.
3. Invoke `dfs(1)` and return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(inom{n}{k} \cdot k)$ — There are $inom{n}{k}$ total valid combinations, each taking $O(k)$ time to copy into the result list.
- **Space Complexity:** $O(k)$ — Auxiliary recursion stack depth and temporary list `t` size are bounded by $k$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [77combinations.java](./77combinations.java) |

---

## Key Learnings

- Enforcing monotonically increasing selection ($j \ge i$) completely eliminates permutations of identical combinations without extra set lookups.
- Backtracking with push/pop pattern reuses a single list across recursion paths.
