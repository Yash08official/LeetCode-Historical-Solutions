---
comments: true
difficulty: Medium
tags:
  - Math
  - Depth-First Search
  - Breadth-First Search
  - Bézout's Lemma
  - Euclidean Algorithm
  - Greatest Common Divisor
  - Extended Euclidean Algorithm
---

# 365. Water and Jug Problem

**[View Problem on LeetCode](https://leetcode.com/problems/water-and-jug-problem/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0365` (`365`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Depth-First Search`, `Breadth-First Search`, `Bézout's Lemma`, `Euclidean Algorithm`, `Greatest Common Divisor`, `Extended Euclidean Algorithm` |
| **Solution Language** | Java |

---

## Problem Description

You are given two jugs with capacities `x` liters and `y` liters. You have an infinite water supply. Return whether the total amount of water in both jugs may reach `target` using the following operations:

	
- Fill either jug completely with water.
	
- Completely empty either jug.
	
- Pour water from one jug into another until the receiving jug is full, or the transferring jug is empty.

---

## Examples

### Example 1 

**Input: **  x = 3, y = 5, target = 4 

**Output: **  true 

**Explanation:**

Follow these steps to reach a total of 4 liters:

	
- Fill the 5-liter jug (0, 5).
	
- Pour from the 5-liter jug into the 3-liter jug, leaving 2 liters (3, 2).
	
- Empty the 3-liter jug (0, 2).
	
- Transfer the 2 liters from the 5-liter jug to the 3-liter jug (2, 0).
	
- Fill the 5-liter jug again (2, 5).
	
- Pour from the 5-liter jug into the 3-liter jug until the 3-liter jug is full. This leaves 4 liters in the 5-liter jug (3, 4).
	
- Empty the 3-liter jug. Now, you have exactly 4 liters in the 5-liter jug (0, 4).

Reference: The Die Hard example.

### Example 2 

**Input: **  x = 2, y = 6, target = 5 

**Output: **  false 

### Example 3 

**Input: **  x = 1, y = 2, target = 3 

**Output: **  true 

**Explanation:** Fill both jugs. The total amount of water in both jugs is equal to 3 now.

 

**

---

## Constraints

**

	
- `1 <= x, y, target <= 10^3`

---

## Problem Understanding

- Determine whether `targetCapacity` liters can be measured using two jugs of capacities `x` and `y`.

---

## Approach

### Approach (State-Space DFS with Encoded Visited Set)
1. Represent state `(i, j)` as `long` key `i * 1000000L + j` inside `Set<Long> vis`.
2. From `(i, j)`, check if `i == z || j == z || i + j == z`, otherwise explore filling, emptying, or pouring between jugs.

---

## Complexity Analysis

- **Time Complexity:** $O(x + y)$ reachable boundary states.\n- **Space Complexity:** $O(x + y)$ visited set and recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [365water-and-jug-problem.java](./365water-and-jug-problem.java) |

---

## Key Learnings

- Every valid jug operation leaves at least one jug either empty or full, keeping reachable states linear in `x + y`.
