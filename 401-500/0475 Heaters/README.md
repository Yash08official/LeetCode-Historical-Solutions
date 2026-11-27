---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Sorting
---

# 475. Heaters

**[View Problem on LeetCode](https://leetcode.com/problems/heaters/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0475` (`475`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses.

Every house can be warmed, as long as the house is within the heater's warm radius range. 

Given the positions of `houses` and `heaters` on a horizontal line, return *the minimum radius standard of heaters so that those heaters could cover all houses.*

**Notice** that all the `heaters` follow your radius standard, and the warm radius will be the same.

---

## Examples

### Example 1

```
Input: houses = [1,2,3], heaters = [2]
Output: 1
Explanation: The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.
```

### Example 2

```
Input: houses = [1,2,3,4], heaters = [1,4]
Output: 1
Explanation: The two heaters were placed at positions 1 and 4. We need to use a radius 1 standard, then all the houses can be warmed.
```

### Example 3

```
Input: houses = [1,5], heaters = [2]
Output: 3
```

 

**

---

## Constraints

**

	- `1 <= houses.length, heaters.length <= 3 * 10^4`

	- `1 <= houses[i], heaters[i] <= 10^9`

---

## Problem Understanding

- Given 1D positions of `houses` and `heaters`, find the minimum uniform heating radius `r` so that every house lies within distance `r` of at least one heater.

---

## Approach

### Optimized Approach (Binary Search on Radius + Two-Pointer Feasibility Check)
1. Sort both `houses` and `heaters` ascending.
2. Binary search the minimum radius `mid` in `[0, 10^9]`.
3. In `check(houses, heaters, r)`, sweep pointers `i` (houses) and `j` (heaters): if `houses[i] < heaters[j] - r`, return `false`; if `houses[i] > heaters[j] + r`, advance heater `j`; otherwise house `i` is covered so advance `i`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \log m + n \log n + (m + n) \log R)$ where $R = 10^9$.
- **Space Complexity:** $O(\log m + \log n)$ for sorting.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [475heaters.java](./475heaters.java) |

---

## Key Learnings

- When coverage is monotonic in the radius `r`, binary search on the answer paired with a linear two-pointer scan cleanly verifies global feasibility.
