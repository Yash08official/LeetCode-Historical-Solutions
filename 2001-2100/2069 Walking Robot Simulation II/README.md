---
comments: true
difficulty: Medium
tags:
  - Design
  - Simulation
---

# 2069. Walking Robot Simulation II

**[View Problem on LeetCode](https://leetcode.com/problems/walking-robot-simulation-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2069` (`2069`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Design`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

A `width x height` grid is on an XY-plane with the **bottom-left** cell at `(0, 0)` and the **top-right** cell at `(width - 1, height - 1)`. The grid is aligned with the four cardinal directions (`"North"`, `"East"`, `"South"`, and `"West"`). A robot is **initially** at cell `(0, 0)` facing direction `"East"`.

The robot can be instructed to move for a specific number of **steps**. For each step, it does the following.

	
- Attempts to move **forward one** cell in the direction it is facing.
	
- If the cell the robot is **moving to** is **out of bounds**, the robot instead **turns** 90 degrees **counterclockwise** and retries the step.

After the robot finishes moving the number of steps required, it stops and awaits the next instruction.

Implement the `Robot` class:

	
- `Robot(int width, int height)` Initializes the `width x height` grid with the robot at `(0, 0)` facing `"East"`.
	
- `void step(int num)` Instructs the robot to move forward `num` steps.
	
- `int[] getPos()` Returns the current cell the robot is at, as an array of length 2, `[x, y]`.
	
- `String getDir()` Returns the current direction of the robot, `"North"`, `"East"`, `"South"`, or `"West"`.

---

## Examples

### Example 1

```text
**Input**
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
**Output**
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

**Explanation**
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2);  // It moves two steps East to (2, 0), and faces East.
robot.step(2);  // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2);  // It moves one step East to (5, 0), and faces East.
                // Moving the next step East would be out of bounds, so it turns and faces North.
                // Then, it moves one step North to (5, 1), and faces North.
robot.step(1);  // It moves one step North to (5, 2), and faces **North** (not West).
robot.step(4);  // Moving the next step North would be out of bounds, so it turns and faces West.
                // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"
```

 

**

---

## Constraints

**

	
- `2 <= width, height <= 100`
	
- `1 <= num <= 10^5`
	
- At most `10^4` calls **in total** will be made to `step`, `getPos`, and `getDir`.

---

## Problem Understanding

- Simulate a robot walking along the perimeter of a grid of width $w$ and height $h$ in counter-clockwise direction.

---

## Approach

### Optimized Approach (1D Perimeter Distance Modular Arithmetic)

1. Perimeter cycle length is $p = 2 	imes (w - 1) + 2 	imes (h - 1)$.
2. Any step of size `num` simply updates 1D perimeter offset: `cur = (cur + num) % p`.
3. Track a boolean flag `moved` to distinguish initial origin `(0, 0)` facing East from returning to `(0, 0)` after moving (which faces South).
4. `getPos()` converts 1D distance `cur` into 2D coordinates across the 4 perimeter segments (Bottom, Right, Top, Left).
5. `getDir()` maps 1D distance `cur` to cardinal directions.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ for `step`, `getPos`, and `getDir`.
- **Space Complexity:** $O(1)$ constant memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2069walking-robot-simulation-ii.java](./2069walking-robot-simulation-ii.java) |

---

## Key Learnings

- Unrolling grid perimeter into a 1D modular circle simplifies continuous boundary movement from step-by-step simulation to $O(1)$ closed-form geometry.
