---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Simulation
---

# 874. Walking Robot Simulation

**[View Problem on LeetCode](https://leetcode.com/problems/walking-robot-simulation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0874` (`874`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

A robot starts at `(0, 0)` on an infinite 2D XY-grid facing **north** (`+Y`). You are given an integer array `commands` and a 2D array `obstacles` listing blocked grid coordinates.

Each command is one of three types:
- `-2`: Turn `90` degrees **left** (counter-clockwise).
- `-1`: Turn `90` degrees **right** (clockwise).
- `k` (`1 <= k <= 9`): Step forward `1` unit at a time up to `k` times. If the next square has an obstacle, the robot stays at its current position for the rest of this command and moves on to the next command.

Note that even if `(0, 0)` contains an obstacle, the robot starts there unhindered and only treats `(0, 0)` as blocked if it tries to step **into** `(0, 0)` later. Return the **maximum squared Euclidean distance** (`x^2 + y^2`) from the origin that the robot reaches at any point during its journey.

---

## Examples

### Example 1

**Input:** `commands = [4,-1,3], obstacles = []`

**Output:** `25`

**Explanation:**

The robot starts at `(0, 0)`:

- Move north 4 units to `(0, 4)`.

- Turn right.

- Move east 3 units to `(3, 4)`.

The furthest point the robot ever gets from the origin is `(3, 4)`, which squared is `3^2 + 4^2= 25` units away.

### Example 2

**Input:** `commands = [4,-1,4,-2,4], obstacles = [[2,4]]`

**Output:** `65`

**Explanation:**

The robot starts at `(0, 0)`:

- Move north 4 units to `(0, 4)`.

- Turn right.

- Move east 1 unit and get blocked by the obstacle at `(2, 4)`, robot is at `(1, 4)`.

- Turn left.

- Move north 4 units to `(1, 8)`.

The furthest point the robot ever gets from the origin is `(1, 8)`, which squared is `1^2 + 8^2 = 65` units away.

### Example 3

**Input:** `commands = [6,-1,-1,6], obstacles = [[0,0]]`

**Output:** `36`

**Explanation:**

The robot starts at `(0, 0)`:

- Move north 6 units to `(0, 6)`.

- Turn right.

- Turn right.

- Move south 5 units and get blocked by the obstacle at `(0,0)`, robot is at `(0, 1)`.

The furthest point the robot ever gets from the origin is `(0, 6)`, which squared is `6^2 = 36` units away.

---

## Constraints

- `1 <= commands.length <= 10^4`

- `commands[i]` is either `-2`, `-1`, or an integer in the range `[1, 9]`.

- `0 <= obstacles.length <= 10^4`

- `-3 * 10^4 <= x_i, y_i <= 3 * 10^4`

- The answer is guaranteed to be less than `2^31`.

---

## Problem Understanding

- **Maximum Squared Distance Over Entire Path:** The robot might move far away and later return closer to `(0, 0)` (as in Example 3). We must update the maximum of `x * x + y * y` during movement, not only at the final position.
- **Unit-Step Simulation:** Since `1 <= k <= 9` is tiny, moving `1` unit at a time lets us detect obstacles along the segment immediately.
- **2D Rotation Vectors:** Representing direction as `(dx, dy)` initialized to `(0, 1)` (North) allows `90`-degree turns via pure arithmetic: left turn maps `(dx, dy) -> (-dy, dx)`, and right turn maps `(dx, dy) -> (dy, -dx)`.
- **Origin Obstacle Nuance:** Because obstacle checks only inspect the **target** cell `(newX, newY)` when attempting a step, starting on an obstacle at `(0, 0)` never blocks the initial departure.

---

## Approach

### Brute Force Approach

Simulating unit steps while scanning the entire `obstacles` array linearly on every step takes `O(M)` per step. With up to `10^4` commands of `9` steps each and `M = 10^4` obstacles, linear obstacle checks require up to `9 * 10^8` comparisons, risking Time Limit Exceeded.

### Optimized Approach

Store all obstacle coordinates in a `HashSet<String>` formatted as `"x,y"` for `O(1)` average-time collision checks, and simulate each rotation and unit step using direction vector `(dx, dy)` while tracking the running maximum of `x * x + y * y`.

### Step-by-Step Thinking Process

1. Preprocess `obstacles` into a `HashSet<String>` named `obstacleSet` where each `[ox, oy]` is encoded as `ox + "," + oy` so membership queries run in `O(1)` average time.
2. Track the robot's state with position `(x = 0, y = 0)` and unit direction vector `(dx = 0, dy = 1)` pointing North.
3. Derive rotation formulas using standard 2D `90`-degree rotation matrices: turning left (`-2`) transforms `(dx, dy)` into `(-dy, dx)`, and turning right (`-1`) transforms `(dx, dy)` into `(dy, -dx)`.
4. For a forward command `k` (`1..9`), loop `k` times: compute `(newX, newY) = (x + dx, y + dy)`, advance `(x, y)` only if `newX + "," + newY` is not in `obstacleSet`, and update `maxDistance = Math.max(maxDistance, x * x + y * y)`.

### Algorithm / Intuition

In `robotSim`, `obstacleSet` holds every blocked coordinate string `"x,y"`. The robot begins at `x = 0, y = 0` with `dx = 0, dy = 1` and `maxDistance = 0`.

For each `command`:
- `command == -2` rotates counter-clockwise: North `(0, 1)` -> West `(-1, 0)` -> South `(0, -1)` -> East `(1, 0)`.
- `command == -1` rotates clockwise: North `(0, 1)` -> East `(1, 0)` -> South `(0, -1)` -> West `(-1, 0)`.
- `command > 0` runs a loop of `command` unit steps. If `obstacleSet` does not contain `newX + "," + newY`, `(x, y)` advances to `(newX, newY)`; otherwise `(x, y)` stays put for the remaining iterations of this `for` loop. Updating `maxDistance` at each step ensures the peak squared distance `x * x + y * y` along the entire trajectory is captured (and stays within 32-bit `int` since the problem guarantees the answer is `< 2^31`).

---

## Dry Run

Trace on **Example 1**: `commands = [4, -1, 3]`, `obstacles = []`

- **Initial State:** `(x, y) = (0, 0)`, `(dx, dy) = (0, 1)`, `obstacleSet = {}`, `maxDistance = 0`.

| Command | Step / Action | `(dx, dy)` | `(x, y)` After Action | `x^2 + y^2` | `maxDistance` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4` | Move `4` steps North (`i = 0..3`, unblocked) | `(0, 1)` | `(0, 1) -> (0, 2) -> (0, 3) -> (0, 4)` | `1, 4, 9, 16` | `16` |
| `-1` | Turn right: `(dx, dy) = (dy, -dx)` | `(1, 0)` | `(0, 4)` | `16` | `16` |
| `3` | Move `3` steps East (`i = 0..2`, unblocked) | `(1, 0)` | `(1, 4) -> (2, 4) -> (3, 4)` | `17, 20, 25` | `25` |

- **Final Result:** Returns `maxDistance = 25`.

---

## Complexity Analysis

- **Time Complexity:** `O(N + M)` — Where `N` is `commands.length` and `M` is `obstacles.length`. Inserting `M` obstacles into `obstacleSet` takes `O(M)` average time, and processing `N` commands executes at most `9 * N` unit steps with `O(1)` string hash lookups per step.
- **Space Complexity:** `O(M)` — `obstacleSet` stores up to `M` coordinate strings.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [874walking-robot-simulation.java](./874walking-robot-simulation.java) |

---

## Key Learnings

- Representing cardinal directions as a 2D vector `(dx, dy)` lets you handle left and right `90`-degree turns in two lines (`(-dy, dx)` and `(dy, -dx)`) without maintaining a direction index array.
- Encoding 2D coordinates `(x, y)` into strings `"x,y"` (or packing them into a single `long` key like `((long) x << 32) | (y & 0xffffffffL)`) enables `O(1)` hash-set lookups in Java.
- Always verify whether a simulation asks for the **final** distance or the **maximum** distance reached at any intermediate step.
