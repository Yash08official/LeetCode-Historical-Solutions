---
comments: true
difficulty: Easy
tags:
  - Math
  - String
  - Simulation
---

# 412. Fizz Buzz

**[View Problem on LeetCode](https://leetcode.com/problems/fizz-buzz/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0412` (`412`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Math`, `String`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer `n`, return *a string array *`answer`* (**1-indexed**) where*:

	
- `answer[i] == "FizzBuzz"` if `i` is divisible by `3` and `5`.
	
- `answer[i] == "Fizz"` if `i` is divisible by `3`.
	
- `answer[i] == "Buzz"` if `i` is divisible by `5`.
	
- `answer[i] == i` (as a string) if none of the above conditions are true.

---

## Examples

### Example 1

```text
**Input:** n = 3
**Output:** ["1","2","Fizz"]
```

### Example 2

```text
**Input:** n = 5
**Output:** ["1","2","Fizz","4","Buzz"]
```

### Example 3

```text
**Input:** n = 15
**Output:** ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

 

**

---

## Constraints

**

	
- `1 <= n <= 10^4`

---

## Problem Understanding

- Return strings for `1..n` replacing multiples of 3 with `"Fizz"`, multiples of 5 with `"Buzz"`, and multiples of both with `"FizzBuzz"`.

---

## Approach

### Optimized Approach (Composable Divisibility Concatenation)
1. For each `i` in `1..n`, append `"Fizz"` if `i % 3 == 0` and `"Buzz"` if `i % 5 == 0`.
2. If still empty, append `i`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$ auxiliary (excluding output list).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [412fizz-buzz.java](./412fizz-buzz.java) |

---

## Key Learnings

- Composing `"Fizz"` and `"Buzz"` independently handles `"FizzBuzz"` automatically without extra branches.
