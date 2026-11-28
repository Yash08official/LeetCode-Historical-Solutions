---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Dynamic Programming
---

# 553. Optimal Division

**[View Problem on LeetCode](https://leetcode.com/problems/optimal-division/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0553` (`553`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums`. The adjacent integers in `nums` will perform the float division.

	- For example, for `nums = [2,3,4]`, we will evaluate the expression `"2/3/4"`.

However, you can add any number of parenthesis at any position to change the priority of operations. You want to add these parentheses such the value of the expression after the evaluation is maximum.

Return *the corresponding expression that has the maximum value in string format*.

**Note:** your expression should not contain redundant parenthesis.

---

## Examples

### Example 1

```
Input: nums = [1000,100,10,2]
Output: "1000/(100/10/2)"
Explanation: 1000/(100/10/2) = 1000/((100/10)/2) = 200
However, the bold parenthesis in "1000/((100/10)/2)" are redundant since they do not influence the operation priority.
So you should return "1000/(100/10/2)".
Other cases:
1000/(100/10)/2 = 50
1000/(100/(10/2)) = 50
1000/100/10/2 = 0.5
1000/100/(10/2) = 2
```

### Example 2

```
Input: nums = [2,3,4]
Output: "2/(3/4)"
Explanation: (2/(3/4)) = 8/3 = 2.667
It can be shown that after trying all possibilities, we cannot get an expression with evaluation greater than 2.667
```

 

**

---

## Constraints

**

	- `1 <= nums.length <= 10`

	- `2 <= nums[i] <= 1000`

	- There is only one optimal division for the given input.

---

## Problem Understanding

- Given an array of positive integers, add parentheses to maximize the result of sequential divisions `nums[0] / nums[1] / ... / nums[n - 1]`.

---

## Approach

### Optimized Approach (Mathematical Grouping Invariant)
1. In sequential division, $X_0 / X_1 / X_2 / \dots / X_{n-1}$, $X_0$ is always in the numerator and $X_1$ is always in the denominator regardless of parenthesization.
2. Every subsequent term $X_i$ ($i \ge 2$) can be moved to the numerator by parenthesizing the entire remainder:
   $$\frac{X_0}{\frac{X_1}{X_2 \dots X_{n-1}}} = \frac{X_0 \cdot X_2 \cdot X_3 \dots X_{n-1}}{X_1}$$
3. For $n = 1$, return `"nums[0]"`. For $n = 2$, return `"nums[0]/nums[1]"`. For $n > 2$, format as `nums[0]/(nums[1]/nums[2]/.../nums[n-1])`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ string construction.
- **Space Complexity:** $O(n)$ for the output string buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [553optimal-division.java](./553optimal-division.java) |

---

## Key Learnings

- Minimizing the divisor maximizes the quotient; grouping all elements from index 1 to $n-1$ inside one parenthesis minimizes the denominator to $X_1 / (\prod_{i=2}^{n-1} X_i)$.
