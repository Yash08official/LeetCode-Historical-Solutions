---
comments: true
difficulty: Medium
tags:
  - Array
  - Stack
  - Simulation
---

# 735. Asteroid Collision

**[View Problem on LeetCode](https://leetcode.com/problems/asteroid-collision/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0735` (`735`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Stack`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an integer array `asteroids` representing asteroids arranged in a row from left to right, all moving at identical speed.

For each non-zero integer `x`:
- `|x|` is the asteroid's size.
- Sign indicates direction: `x > 0` moves **right**, and `x < 0` moves **left**.

When two asteroids collide, the smaller one explodes; if they have equal size, both explode. Asteroids moving in the same direction (or moving away from each other) never collide. Return the state of the surviving asteroids after all collisions resolve.

---

## Examples

### Example 1

```text
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
```

### Example 2

```text
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
```

### Example 3

```text
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
```

### Example 4

```text
Input: asteroids = [3,5,-6,2,-1,4]​​​​​​​
Output: [-6,2,4]
Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 destroys -1. Since 2 and 4 are both moving right, they never collide.
```

---

## Constraints

- `2 <= asteroids.length <= 10^4`

- `-1000 <= asteroids[i] <= 1000`

- `asteroids[i] != 0`

---

## Problem Understanding

- Collisions ONLY happen when a **right-moving** asteroid (`> 0`) on the left meets a **left-moving** asteroid (`< 0`) on the right. A left-moving asteroid followed by a right-moving asteroid (`[-5, 10]`) moves apart and never collides.
- A single large left-moving asteroid `x < 0` can trigger a chain reaction, destroying multiple smaller right-moving asteroids behind it until it meets an equal/larger right-moving asteroid, reaches the left edge, or lands behind other left-moving asteroids.
- This last-in, first-collided behavior directly models a **stack**.

---

## Approach

### Brute Force Approach

Repeatedly scanning the array from left to right to find adjacent `(positive, negative)` pairs, removing exploded elements with `Array.splice`, and restarting until an entire pass sees zero collisions can take `O(n^2)` time due to repeated scans and element shifting.

### Optimized Approach

Simulate collisions in a single left-to-right pass using a stack `stk`: push right-moving asteroids (`x > 0`) directly, and for each left-moving asteroid (`x < 0`), repeatedly pop smaller positive tops (`stk.top < -x`) before resolving equal-size mutual destruction or survival.

### Step-by-Step Thinking Process

1. Maintain an array `stk` representing stable asteroids processed so far (all negative ones on the left, followed by positive ones on the right).
2. When `x > 0`, it moves right and cannot collide with anything currently to its left in `stk`, so push `x` directly.
3. When `x < 0` (size `-x`), while the top of `stk` is positive (`> 0`) and strictly smaller than `-x`, that top asteroid explodes (`stk.pop()`) and `x` keeps moving left.
4. After the `while` loop stops, check why it stopped: if `stk` top equals `-x`, both explode (`stk.pop()`, `x` discarded); else if `stk` is empty or its top is negative (`< 0`), nothing blocks `x`, so `stk.push(x)`. Otherwise, `stk` top is a strictly larger positive asteroid (`> -x`), so `x` simply explodes.

### Algorithm / Intuition

In `asteroidCollision(asteroids)`:
- Every element in `stk` satisfies a clean invariant: zero or more negative asteroids followed by zero or more positive asteroids — no unresolved collisions exist inside `stk`.
- When `x < 0` arrives, `-x` is its positive magnitude. The `while` loop `stk.length > 0 && stk[stk.length - 1] > 0 && stk[stk.length - 1] < -x` clears out all strictly smaller right-moving asteroids.
- Next, `stk[stk.length - 1] === -x` handles simultaneous destruction by popping once without pushing `x`.
- `else if (stk.length === 0 || stk[stk.length - 1] < 0)` pushes `x` when `x` survives all collisions.

---

## Dry Run

Trace on **Example 1**: `asteroids = [5, 10, -5]`.

1. `x = 5` (`> 0`): `stk.push(5)` -> `stk = [5]`.
2. `x = 10` (`> 0`): `stk.push(10)` -> `stk = [5, 10]`.
3. `x = -5` (`< 0`, `-x = 5`):
   - `while` check: `stk[1] = 10 > 0`, is `10 < 5`? False (loop doesn't run).
   - `if` check: is `stk[1] === 5`? False.
   - `else if` check: is `stk.length === 0 || 10 < 0`? False.
   - `-5` explodes against `10`; `stk` remains `[5, 10]`.

Returns `[5, 10]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each of the `n` asteroids is pushed onto `stk` at most once and popped at most once.
- **Space Complexity:** `O(n)` — In the worst case (e.g., all asteroids move in the same direction), `stk` stores all `n` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [735asteroid-collision.js](./735asteroid-collision.js) |

---

## Key Learnings

- Amortized analysis shows nested `while` pops inside a `for` loop still run in `O(n)` total time when each element can only be pushed and popped once.
- Separating the `while (smaller)` loop from the post-loop `equal` vs `empty/negative` checks avoids error-prone boolean flags.
