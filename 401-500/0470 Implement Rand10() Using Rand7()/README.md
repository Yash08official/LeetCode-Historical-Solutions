---
comments: true
difficulty: Medium
tags:
  - Math
  - Rejection Sampling
  - Randomized
  - Probability and Statistics
---

# 470. Implement Rand10() Using Rand7()

**[View Problem on LeetCode](https://leetcode.com/problems/implement-rand10-using-rand7/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0470` (`470`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Rejection Sampling`, `Randomized`, `Probability and Statistics` |
| **Solution Language** | Java |

---

## Problem Description

Given the **API** `rand7()` that generates a uniform random integer in the range `[1, 7]`, write a function `rand10()` that generates a uniform random integer in the range `[1, 10]`. You can only call the API `rand7()`, and you shouldn't call any other API. Please **do not** use a language's built-in random API.

Each test case will have one **internal** argument `n`, the number of times that your implemented function `rand10()` will be called while testing. Note that this is **not an argument** passed to `rand10()`.

---

## Examples

### Example 1

```
Input: n = 1
Output: [2]
```

### Example 2

```
Input: n = 2
Output: [2,8]
```

### Example 3

```
Input: n = 3
Output: [3,8,10]
```

 

**

---

## Constraints

**

	- `1 <= n <= 10^5`

 

**Follow up:**

	- What is the expected value for the number of calls to `rand7()` function?

	- Could you minimize the number of calls to `rand7()`?

---

## Problem Understanding

- Implement a uniform random integer generator `rand10()` in `[1, 10]` using only the provided uniform `rand7()` API in `[1, 7]`.

---

## Approach

### Optimized Approach (Base-7 Rejection Sampling)
1. Call `rand7()` twice to form a uniformly distributed integer $x = (\text{rand7}() - 1) \times 7 + \text{rand7}() \in [1, 49]$.
2. Accept `x` if `x <= 40` (since `40` is the largest multiple of `10` within `49`) and map uniformly to `1..10` via `x % 10 + 1`.
3. Reject `x > 40` and repeat the loop until accepted.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ expected — acceptance probability is $40/49$, requiring an average of $2 \times \frac{49}{40} = 2.45$ calls to `rand7()` ($O(\infty)$ worst case).
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [470implement-rand10-using-rand7.java](./470implement-rand10-using-rand7.java) |

---

## Key Learnings

- Combining two independent `rand7()` calls expands the uniform sample space to $7^2 = 49$, and rejecting the largest remainder (`41..49`) guarantees exact uniformity over `1..10`.
