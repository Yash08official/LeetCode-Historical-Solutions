---
comments: true
difficulty: Easy
tags:
  - String
---

# 551. Student Attendance Record I

**[View Problem on LeetCode](https://leetcode.com/problems/student-attendance-record-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0551` (`551`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` representing an attendance record for a student where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:

	- `'A'`: Absent.

	- `'L'`: Late.

	- `'P'`: Present.

The student is eligible for an attendance award if they meet **both** of the following criteria:

	- The student was absent (`'A'`) for **strictly** fewer than 2 days **total**.

	- The student was **never** late (`'L'`) for 3 or more **consecutive** days.

Return `true`* if the student is eligible for an attendance award, or *`false`* otherwise*.

---

## Examples

### Example 1

```
Input: s = "PPALLP"
Output: true
Explanation: The student has fewer than 2 absences and was never late 3 or more consecutive days.
```

### Example 2

```
Input: s = "PPALLL"
Output: false
Explanation: The student was late 3 consecutive days in the last 3 days, so is not eligible for the award.
```

 

**

---

## Constraints

**

	- `1 <= s.length <= 1000`

	- `s[i]` is either `'A'`, `'L'`, or `'P'`.

---

## Problem Understanding

- Determine if an attendance record string `s` qualifies for an award: strictly fewer than 2 `'A'`s (absent) and never 3 or more consecutive `'L'`s (late).

---

## Approach

### Optimized Approach (String Index & Substring Checks)
1. Check that `'A'` appears at most once: `s.indexOf("A") == s.lastIndexOf("A")` (true if `'A'` is absent or appears exactly once).
2. Check that three consecutive lates never occur: `!s.contains("LLL")`.
3. Return `true` if and only if both conditions hold.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ for string scanning.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [551student-attendance-record-i.java](./551student-attendance-record-i.java) |

---

## Key Learnings

- Comparing `indexOf` with `lastIndexOf` is an idiomatic single-expression test for count `<= 1`.
