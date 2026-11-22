---
comments: true
difficulty: Medium
tags:
  - String
  - Backtracking
---

# 306. Additive Number

**[View Problem on LeetCode](https://leetcode.com/problems/additive-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0306` (`306`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

An **additive number** is a string whose digits can form an **additive sequence**.

A valid **additive sequence** should contain **at least** three numbers. Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

Given a string containing only digits, return `true` if it is an **additive number** or `false` otherwise.

**Note:** Numbers in the additive sequence **cannot** have leading zeros, so sequence `1, 2, 03` or `1, 02, 3` is invalid.

---

## Examples

### Example 1

```text
**Input:** "112358"
**Output:** true
**Explanation:** 
The digits can form an additive sequence: 1, 1, 2, 3, 5, 8. 
1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
```

### Example 2

```text
**Input:** "199100199"
**Output:** true
**Explanation:** 
The additive sequence is: 1, 99, 100, 199. 
1 + 99 = 100, 99 + 100 = 199
```

 

**

---

## Constraints

**

	
- `1 <= num.length <= 35`
	
- `num` consists only of digits.

 

**Follow up:** How would you handle overflow for very large input integers?

---

## Problem Understanding

- Check if string `num` can be split into at least 3 numbers (no leading zeros except `0` itself) where every number after the first two equals the sum of the preceding two.

---

## Approach

### Optimized Approach (Enumerate First Two Numbers + Recursive Verification)
1. Enumerate split indices `i` and `j` (bounded by 18 digits for `long` safety) for the first two numbers `a` and `b`, rejecting invalid leading zeros.
2. Recursively verify with `dfs(a, b, remaining)` whether a prefix of `remaining` equals `a + b` until the string is fully consumed.

---

## Complexity Analysis

- **Time Complexity:** $O(n^3)$ worst-case across pairs `(i, j)` and suffix verification.\n- **Space Complexity:** $O(n)$ recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [306additive-number.java](./306additive-number.java) |

---

## Key Learnings

- Once the first two terms of a Fibonacci-like sequence are chosen, the entire remainder of the string is deterministically constrained.
