---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
  - Bit Manipulation
---

# 90. Subsets II

**[View Problem on LeetCode](https://leetcode.com/problems/subsets-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0090` (`90`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` that may contain duplicates, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

---

## Examples

### Example 1

```text
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

### Example 2

```text
Input: nums = [0]
Output: [[],[0]]
```

---

## Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

---

## Problem Understanding

- The input array `nums` may contain duplicate elements.
- The power set must not contain duplicate subsets.
- Sorting `nums` groups identical elements together, allowing us to skip duplicate branches during backtracking.

---

## Approach

### Optimized Approach (Sort + Backtracking with Duplicate Pruning)

1. Sort the input array `nums` in ascending order.
2. Define a backtracking function `dfs(i)`:
   - Base case: If `i >= nums.length`, add a copy of the current subset `t` to `ans` and return.
   - **Include branch:** Add `nums[i]` to `t`, recurse with `dfs(i + 1)`.
   - **Exclude branch:** Remove the last element `x = nums[i]`. Skip all subsequent elements that are equal to `x` (`while (i + 1 < nums.length && nums[i + 1] == x) ++i`). Recurse with `dfs(i + 1)`.
3. Return `ans`.

---

## Dry Run

Consider `nums = [1, 2, 2]`:
- Sorted: `[1, 2, 2]`.
- Start `dfs(0)`:
  - Add `1`: `t = [1]`. `dfs(1)`:
    - Add `2`: `t = [1, 2]`. `dfs(2)`:
      - Add `2`: `t = [1, 2, 2]`. `dfs(3)` -> add `[1, 2, 2]`.
      - Backtrack: remove `2`. Skip duplicate 2s. `dfs(3)` -> add `[1, 2]`.
    - Backtrack: remove `2`. Skip duplicate 2s (index 2 skipped). `dfs(3)` -> add `[1]`.
  - Backtrack: remove `1`. `dfs(1)`:
    - Add `2`: `t = [2]`. `dfs(2)`:
      - Add `2`: `t = [2, 2]`. `dfs(3)` -> add `[2, 2]`.
      - Backtrack: remove `2`. Skip duplicates. `dfs(3)` -> add `[2]`.
    - Backtrack: remove `2`. Skip duplicates. `dfs(3)` -> add `[]`.
Result subsets: `[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot 2^n)$ — Sorting takes $O(n \log n)$, and there are at most $2^n$ subsets each taking $O(n)$ to copy.
- **Space Complexity:** $O(n)$ recursion stack and path state storage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [90subsets-ii.java](./90subsets-ii.java) |

---

## Key Learnings

- Sorting converts the duplicate subset identification into contiguous element comparisons.
- Skipping identical elements on the 'exclude' decision ensures each unique combination of duplicate items is generated exactly once.
