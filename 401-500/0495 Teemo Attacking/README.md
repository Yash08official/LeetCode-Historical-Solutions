---
comments: true
difficulty: Easy
tags:
  - Array
  - Simulation
---

# 495. Teemo Attacking

**[View Problem on LeetCode](https://leetcode.com/problems/teemo-attacking/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0495` (`495`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for a exactly `duration` seconds. More formally, an attack at second `t` will mean Ashe is poisoned during the **inclusive** time interval `[t, t + duration - 1]`. If Teemo attacks again **before** the poison effect ends, the timer for it is **reset**, and the poison effect will end `duration` seconds after the new attack.

You are given a **non-decreasing** integer array `timeSeries`, where `timeSeries[i]` denotes that Teemo attacks Ashe at second `timeSeries[i]`, and an integer `duration`.

Return *the **total** number of seconds that Ashe is poisoned*.

---

## Examples

### Example 1

```text
**Input:** timeSeries = [1,4], duration = 2
**Output:** 4
**Explanation:** Teemo's attacks on Ashe go as follows:
- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.
- At second 4, Teemo attacks, and Ashe is poisoned for seconds 4 and 5.
Ashe is poisoned for seconds 1, 2, 4, and 5, which is 4 seconds in total.
```

### Example 2

```text
**Input:** timeSeries = [1,2], duration = 2
**Output:** 3
**Explanation:** Teemo's attacks on Ashe go as follows:
- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.
- At second 2 however, Teemo attacks again and resets the poison timer. Ashe is poisoned for seconds 2 and 3.
Ashe is poisoned for seconds 1, 2, and 3, which is 3 seconds in total.
```

 

**

---

## Constraints

**

	
- `1 <= timeSeries.length <= 10^4`
	
- `0 <= timeSeries[i], duration <= 10^7`
	
- `timeSeries` is sorted in **non-decreasing** order.

---

## Problem Understanding

- Given sorted attack timestamps `timeSeries` and poison `duration`, compute total poisoned time (overlapping intervals reset the timer).

---

## Approach

### Optimized Approach (Adjacent Gap Clamping)
1. The last attack always contributes full `duration`; each earlier attack `i - 1` contributes `Math.min(duration, timeSeries[i] - timeSeries[i - 1])`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [495teemo-attacking.java](./495teemo-attacking.java) |

---

## Key Learnings

- Clamping consecutive timestamp gaps to `duration` computes interval union length in one pass without merging intervals.
