---
comments: true
difficulty: Easy
tags:
  - String
---

# 434. Number of Segments in a String

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-segments-in-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0434` (`434`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s`, return *the number of segments in the string*.

A **segment** is defined to be a contiguous sequence of **non-space characters**.

---

## Examples

### Example 1

```text
**Input:** s = "Hello, my name is John"
**Output:** 5
**Explanation:** The five segments are ["Hello,", "my", "name", "is", "John"]
```

### Example 2

```text
**Input:** s = "Hello"
**Output:** 1
```

 

**

---

## Constraints

**

	
- `0 <= s.length <= 300`
	
- `s` consists of lowercase and uppercase English letters, digits, or one of the following characters `"!@#$%^&*()_+-=',.:"`.
	
- The only space character in `s` is `' '`.

---

## Problem Understanding

- Count the number of non-space contiguous segments in string `s`.

---

## Approach

### Optimized Approach (Segment-Start Boundary Counting)
1. Scan `s`: increment `ans` whenever `s.charAt(i) != ' '` and either `i == 0` or `s.charAt(i - 1) == ' '`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [434number-of-segments-in-a-string.java](./434number-of-segments-in-a-string.java) |

---

## Key Learnings

- Counting transitions from space (or start) to non-space avoids `split()` allocations and leading/trailing-space edge cases.
