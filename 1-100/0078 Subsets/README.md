---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
  - Bit Manipulation
---

# 78. Subsets

**[View Problem on LeetCode](https://leetcode.com/problems/subsets/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0078` (`78`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` of **unique** elements, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
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
- All the numbers of `nums` are **unique**.

---

## Problem Understanding

- For an array of size $n$, the power set contains exactly $2^n$ distinct subsets.
- Since $n \le 10$, $2^n \le 1024$.
- Each subset can be mapped directly to an integer bitmask in the range $[0, 2^n - 1]$, where the $i^{	ext{th}}$ bit indicates whether `nums[i]` is included.

---

## Approach

### Optimized Approach (Bitmask Enumeration)

1. Let $n = 	ext{nums.length}$. The total number of subsets is $1 \ll n$.
2. Iterate `mask` from $0$ to $(1 \ll n) - 1$:
   - Construct a temporary list `t`.
   - For each bit position $i \in [0, n - 1]$:
     - If the $i^{	ext{th}}$ bit is set (`((mask >> i) & 1) == 1`), append `nums[i]` to `t`.
   - Append `t` to `ans`.
3. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \cdot 2^n)$ — There are $2^n$ bitmasks, and checking all $n$ bits takes $O(n)$ work per mask.
- **Space Complexity:** $O(1)$ — Beyond the space for the output power set, only scalar iteration variables are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [78subsets.java](./78subsets.java) |

---

## Key Learnings

- Binary bitmasking is an elegant, non-recursive technique for generating power sets without recursion stack overhead.
- Bitwise right-shift and masking (`(mask >> i) & 1`) tests element inclusion in $O(1)$ time.
