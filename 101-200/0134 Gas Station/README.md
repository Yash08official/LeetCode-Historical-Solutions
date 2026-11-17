---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
---

# 134. Gas Station

**[View Problem on LeetCode](https://leetcode.com/problems/gas-station/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0134` (`134`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

There are `n` gas stations along a circular route, where the amount of gas at the `i^th` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i^th` station to its next `(i + 1)^th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return *the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return* `-1`. If there exists a solution, it is **guaranteed** to be **unique**.

---

## Examples

### Example 1

```text
**Input:** gas = [1,2,3,4,5], cost = [3,4,5,1,2]
**Output:** 3
**Explanation:**
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
```

### Example 2

```text
**Input:** gas = [2,3,4], cost = [3,4,3]
**Output:** -1
**Explanation:**
You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.
```

 

**

---

## Constraints

**

	
- `n == gas.length == cost.length`
	
- `1 <= n <= 10^5`
	
- `0 <= gas[i], cost[i] <= 10^4`
	
- The input is generated such that the answer is unique.

---

## Problem Understanding

- There are $n$ gas stations along a circular route. Station $i$ provides `gas[i]` gas and costs `cost[i]` gas to reach station $i+1$.
- We need to determine the starting gas station index that allows completing the full circular circuit, or return `-1` if impossible.

---

## Approach

### Optimized Approach (Two-Pointer / Greedy Circular Scan)

1. Use two pointers `i` and `j` initially positioned at the end of the circuit $n - 1$.
2. Track the accumulated net gas `s = 0` and total stations processed `cnt = 0`.
3. Advance `j` forward, adding `gas[j] - cost[j]` to `s` and incrementing `cnt`.
4. If the accumulated surplus `s` drops below $0$:
   - Move start pointer `i` backward counter-clockwise (`--i`).
   - Add `gas[i] - cost[i]` to `s` and increment `cnt`.
5. Repeat until $n$ stations have been incorporated into the path.
6. If the final balance $s < 0$, completing the circuit is impossible (return `-1`); otherwise, `i` is the valid starting index.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Each station index is visited at most twice across the two pointer movements.
- **Space Complexity:** $O(1)$ — Requires only constant auxiliary variables.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [134gas-station.java](./134gas-station.java) |

---

## Key Learnings

- Expanding from both ends (front forward, back backward) guarantees that deficits encountered during the forward traversal are offset by the best available preceding stations.
