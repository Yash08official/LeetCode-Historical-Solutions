---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Greedy
  - Monotonic Stack
---

# 402. Remove K Digits

**[View Problem on LeetCode](https://leetcode.com/problems/remove-k-digits/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0402` (`402`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Greedy`, `Monotonic Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given string num representing a non-negative integer `num`, and an integer `k`, return *the smallest possible integer after removing* `k` *digits from* `num`.

---

## Examples

### Example 1

```text
**Input:** num = "1432219", k = 3
**Output:** "1219"
**Explanation:** Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
```

### Example 2

```text
**Input:** num = "10200", k = 1
**Output:** "200"
**Explanation:** Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
```

### Example 3

```text
**Input:** num = "10", k = 2
**Output:** "0"
**Explanation:** Remove all the digits from the number and it is left with nothing which is 0.
```

 

**

---

## Constraints

**

	
- `1 <= k <= num.length <= 10^5`
	
- `num` consists of only digits.
	
- `num` does not have any leading zeros except for the zero itself.

---

## Problem Understanding

- Remove `k` digits from non-negative integer string `num` to form the smallest possible resulting integer (no leading zeros).

---

## Approach

### Optimized Approach (Monotonic Increasing Digit Stack)
1. Use a `StringBuilder` as a monotonic stack: while `k > 0` and the top digit is greater than `c`, pop the top digit and decrement `k`.
2. If `k > 0` after scanning all digits, trim `k` digits from the right end.
3. Strip leading `'0'`s and return `"0"` if empty.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each digit is pushed and popped at most once.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [402remove-k-digits.java](./402remove-k-digits.java) |

---

## Key Learnings

- Greedily removing earlier larger digits minimizes the most significant positions first.
