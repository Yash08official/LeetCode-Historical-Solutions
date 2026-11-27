---
comments: true
difficulty: Medium
tags:
  - Math
  - String
  - Simulation
---

# 537. Complex Number Multiplication

**[View Problem on LeetCode](https://leetcode.com/problems/complex-number-multiplication/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0537` (`537`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `String`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

A complex number can be represented as a string on the form `"**real**+**imaginary**i"` where:

	- `real` is the real part and is an integer in the range `[-100, 100]`.

	- `imaginary` is the imaginary part and is an integer in the range `[-100, 100]`.

	- `i^2 == -1`.

Given two complex numbers `num1` and `num2` as strings, return *a string of the complex number that represents their multiplications*.

---

## Examples

### Example 1

```
Input: num1 = "1+1i", num2 = "1+1i"
Output: "0+2i"
Explanation: (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.
```

### Example 2

```
Input: num1 = "1+-1i", num2 = "1+-1i"
Output: "0+-2i"
Explanation: (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.
```

 

**

---

## Constraints

**

	- `num1` and `num2` are valid complex numbers.

---

## Problem Understanding

- Multiply two complex numbers formatted as `"a+bi"` and return their product in `"re+imi"` string format.

---

## Approach

### Optimized Approach (Integer Component Parsing + Algebraic Expansion)
1. Helper `parse(s)` drops the trailing `'i'`, splits on `"\\+"`, and returns `[real, imag]`.
2. Given `a1 + b1*i` and `a2 + b2*i`, compute real part `a1 * a2 - b1 * b2` (since $i^2 = -1$) and imaginary part `a1 * b2 + a2 * b1`.
3. Format and return `real + "+" + imag + "i"`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ (fixed short numeric strings).
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [537complex-number-multiplication.java](./537complex-number-multiplication.java) |

---

## Key Learnings

- Splitting at `"\\+"` handles negative real or imaginary parts cleanly because signs belong to the numeric tokens (e.g. `"1+-1i"` splits into `"1"` and `"-1"`).
