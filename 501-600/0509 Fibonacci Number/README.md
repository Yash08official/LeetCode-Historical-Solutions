---
comments: true
difficulty: Easy
tags:
  - Math
  - Dynamic Programming
  - Recursion
  - Memoization
---

# 509. Fibonacci Number

**[View Problem on LeetCode](https://leetcode.com/problems/fibonacci-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0509` (`509`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `Dynamic Programming`, `Recursion`, `Memoization` |
| **Solution Language** | Java |

---

## Problem Description

The **Fibonacci numbers**, commonly denoted `F(n)` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from `0` and `1`. That is,

```
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
```

Given `n`, calculate `F(n)`.

---

## Examples

### Example 1

```
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
```

### Example 2

```
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
```

### Example 3

```
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
```

 

**

---

## Constraints

**

	- `0 <= n <= 30`

---

## Problem Understanding

- Calculate the $n$-th Fibonacci number $F(n)$ where $F(0) = 0$, $F(1) = 1$, and $F(n) = F(n - 1) + F(n - 2)$.

---

## Approach

### Optimized Approach (Matrix Exponentiation by Squaring)
1. Express Fibonacci recurrence in matrix form:
   $$\begin{pmatrix} F(n+1) & F(n) \end{pmatrix} = \begin{pmatrix} F(1) & F(0) \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n$$
2. Compute the matrix power using binary exponentiation (`pow`) in $O(\log n)$ matrix multiplications.
3. Extract and return `res[0][1]` representing $F(n)$.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ — binary exponentiation of a $2 \times 2$ matrix.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [509fibonacci-number.java](./509fibonacci-number.java) |

---

## Key Learnings

- Linear homogeneous recurrences with constant coefficients can always be evaluated in $O(\log n)$ time using matrix fast exponentiation.
