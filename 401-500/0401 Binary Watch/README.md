---
comments: true
difficulty: Easy
tags:
  - Backtracking
  - Bit Manipulation
---

# 401. Binary Watch

**[View Problem on LeetCode](https://leetcode.com/problems/binary-watch/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0401` (`401`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Backtracking`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs on the bottom to represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.

	
- For example, the below binary watch reads `"4:51"`.

Given an integer `turnedOn` which represents the number of LEDs that are currently on (ignoring the PM), return *all possible times the watch could represent*. You may return the answer in **any order**.

The hour must not contain a leading zero.

	
- For example, `"01:00"` is not valid. It should be `"1:00"`.

The minute must consist of two digits and may contain a leading zero.

	
- For example, `"10:2"` is not valid. It should be `"10:02"`.

---

## Examples

### Example 1

```text
**Input:** turnedOn = 1
**Output:** ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
```

### Example 2

```text
**Input:** turnedOn = 9
**Output:** []
```

 

**

---

## Constraints

**

	
- `0 <= turnedOn <= 10`

---

## Problem Understanding

- Return all valid `"h:mm"` times on a 10-LED binary watch (4 hour LEDs, 6 minute LEDs) with exactly `turnedOn` LEDs lit.

---

## Approach

### Optimized Approach (10-Bit Enumeration)
1. Iterate all 10-bit masks `i` in `[0, 1023]`: top 4 bits `h = i >> 6`, bottom 6 bits `m = i & 0b111111`.
2. If `h < 12 && m < 60 && Integer.bitCount(i) == turnedOn`, format `"%d:%02d"` and add to `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ (fixed 1024 iterations).\n- **Space Complexity:** $O(1)$ auxiliary.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [401binary-watch.java](./401binary-watch.java) |

---

## Key Learnings

- Enumerating the 10-bit LED space directly avoids backtracking complexity and guarantees clean formatting.
