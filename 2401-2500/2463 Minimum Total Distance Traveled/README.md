---
comments: true
difficulty: Hard
tags:
  - Array
  - Dynamic Programming
  - Sorting
---

# 2463. Minimum Total Distance Traveled

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-total-distance-traveled/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2463` (`2463`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

There are $n$ broken robots and $m$ factories positioned along a 1D coordinate line. You are given an integer array `robot` where `robot[i]` is the position of the $i$-th robot, and a 2D integer array `factory` where `factory[j] = [position_j, limit_j]` indicates that factory $j$ is at `position_j` and can repair at most `limit_j` robots.

Each robot moves at the same speed in either direction along the X-axis until it reaches a factory that has not yet reached its repair limit. Robots can cross paths and pass through exhausted factories without collision.

Determine the minimum total distance traveled by all robots so that every robot is repaired.

---

## Examples

### Example 1

```text
Input: robot = [0,4,6], factory = [[2,2],[6,2]]
Output: 4
Explanation: As shown in the figure:
- The first robot at position 0 moves in the positive direction. It will be repaired at the first factory.
- The second robot at position 4 moves in the negative direction. It will be repaired at the first factory.
- The third robot at position 6 will be repaired at the second factory. It does not need to move.
The limit of the first factory is 2, and it fixed 2 robots.
The limit of the second factory is 2, and it fixed 1 robot.
The total distance is |2 - 0| + |2 - 4| + |6 - 6| = 4. It can be shown that we cannot achieve a better total distance than 4.
```

### Example 2

```text
Input: robot = [1,-1], factory = [[-2,1],[2,1]]
Output: 2
Explanation: As shown in the figure:
- The first robot at position 1 moves in the positive direction. It will be repaired at the second factory.
- The second robot at position -1 moves in the negative direction. It will be repaired at the first factory.
The limit of the first factory is 1, and it fixed 1 robot.
The limit of the second factory is 1, and it fixed 1 robot.
The total distance is |2 - 1| + |(-2) - (-1)| = 2. It can be shown that we cannot achieve a better total distance than 2.
```

---

## Constraints

- `1 <= robot.length, factory.length <= 100`

- `factory[j].length == 2`

- `-10^9 <= robot[i], position_j <= 10^9`

- `0 <= limit_j <= robot.length`

- The input will be generated such that it is always possible to repair every robot.

---

## Problem Understanding

A key observation in 1D assignment problems is that optimal assignments preserve order: robot paths will never cross in a way that swapping assignments would improve the sum of distances. Specifically, if both robots and factories are sorted by their 1D positions, any factory will repair a contiguous range of sorted robots.

This structural property allows us to formulate the problem as dynamic programming:
- Sort `robot` and `factory` by coordinate.
- Define state `dfs(i, j)`: the minimum distance to repair robots from index $i$ to the end using factories from index $j$ to the end.
- At state `(i, j)`, factory $j$ can repair $k$ robots ($0 \le k \le \text{limit}_j$), meaning it takes robots $i, i+1, \dots, i+k-1$. The remaining robots ($i+k$ onwards) must be repaired by subsequent factories ($j+1$ onwards).

---

## Approach

### Brute Force Approach

A brute force approach considers all possible assignments of robots to factories without leveraging sorting. With up to 100 robots and 100 factories, the number of assignment combinations is astronomical ($m^n = 100^{100}$), which is completely intractable.

### Optimized Approach

Sort both `robot` and `factory` by position. Use memoized recursion `dfs(i, j)` where $i$ is the robot index and $j$ is the factory index. Either skip factory $j$ (`dfs(i, j + 1)`), or assign $k$ robots ($1 \le k \le \text{limit}_j$) to factory $j$ and recurse on `dfs(i + k, j + 1)`. Store computed results in a 2D `memo` table.

### Step-by-Step Thinking Process

1. Observe the non-crossing property: sorting robots and factories ensures each factory repairs a contiguous subset of robots.
2. Sort `robot.sort((a, b) => a - b)` and `factory.sort((a, b) => a[0] - b[0])`.
3. Formulate DP state: `dfs(i, j)` = min distance to repair `robot[i...]` using `factory[j...]`.
4. Base cases: if $i == \text{robot.length}$, all robots repaired -> return $0$. If $j == \text{factory.length}$, unrepaired robots remain -> return infinity.
5. Transitions from `(i, j)`:
  - Skip factory $j$: `dfs(i, j + 1)`.
  - Assign $k$ robots to factory $j$ ($1 \le k \le \text{limit}_j$): accumulate distance $\sum |\text{robot}[i+p] - \text{position}_j|$ and add `dfs(i + k, j + 1)`.
6. Memoize the result in a table `memo[i][j]`.

### Algorithm / Intuition

In the provided JavaScript solution:

1. `robot.sort((a, b) => a - b)` and `factory.sort((a, b) => a[0] - b[0])` sort both arrays along the 1D axis.
2. `memo` is an array of size `robot.length` by `factory.length` filled with `undefined`.
3. Inside `dfs(i, j)`:
   - If `i === robot.length`, return 0 (all robots repaired).
   - If `j === factory.length`, return `Number.MAX_SAFE_INTEGER / 1000` (represents infinity).
   - If `memo[i][j]` is computed, return it.
   - `ans = dfs(i, j + 1)` explores assigning zero robots to factory $j$.
   - A loop over $k$ from $0$ to `factory[j][1] - 1` greedily adds `robot[i + k]` to factory $j$, updating accumulated distance `t += Math.abs(robot[i + k] - factory[j][0])`, and relaxes `ans = Math.min(ans, t + dfs(i + k + 1, j + 1))`.
4. The optimal result is memoized in `memo[i][j]` and returned.

---

## Dry Run

Consider Example 1: `robot = [0, 4, 6]`, `factory = [[2, 2], [6, 2]]`

1. **Sorting**: `robot` is already `[0, 4, 6]`; `factory` is already `[[2, 2], [6, 2]]`.
2. **State `dfs(0, 0)`** (robots from 0, factories from 0):
   - Skip factory 0: `dfs(0, 1)` -> Factory 1 (pos 6, limit 2) cannot take 3 robots (limit 2), returns large value.
   - Factory 0 takes 1 robot (`robot[0] = 0`): `dist = |0 - 2| = 2`, plus `dfs(1, 1)`.
     - In `dfs(1, 1)`: Factory 1 takes robots 1 and 2 (`robot[1]=4`, `robot[2]=6`): `dist = |4-6| + |6-6| = 2`. Total = $2 + 2 = 4$.
   - Factory 0 takes 2 robots (`robot[0]=0, robot[1]=4`): `dist = |0-2| + |4-2| = 4`, plus `dfs(2, 1)`.
     - In `dfs(2, 1)`: Factory 1 takes robot 2 (`robot[2]=6`): `dist = |6-6| = 0`. Total = $4 + 0 = 4$.
3. Min total distance across options is `4`.

Final Return: `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(R \cdot F \cdot \min(R, L))` — where $R$ is the number of robots, $F$ is the number of factories, and $L$ is the maximum factory limit. There are $R \times F$ states, and each state evaluates a loop of at most $\min(R, L)$ iterations. With $R, F \le 100$, the total operations are at most $100 \times 100 \times 100 = 10^6$, running in tens of milliseconds.
- **Space Complexity:** `O(R \cdot F)` — Space for the 2D memoization table `memo` of size $R \times F$ and the recursion call stack of depth $O(R + F)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2463minimum-total-distance-traveled.js](./2463minimum-total-distance-traveled.js) |

---

## Key Learnings

- Sorting 1D entities establishes a monotonic assignment property that precludes crossing paths.
- Partitioning elements into contiguous groups among ordered destinations is a classic dynamic programming pattern.
- Dividing `Number.MAX_SAFE_INTEGER` by a safe factor prevents integer arithmetic overflow during subsequent distance additions.
