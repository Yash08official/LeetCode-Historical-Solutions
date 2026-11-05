---
comments: true
difficulty: Easy
tags:
  - Array
  - Stack
  - Queue
  - Simulation
---

# 1700. Number of Students Unable to Eat Lunch

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1700` (`1700`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Stack`, `Queue`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

A school cafeteria has an equal number of students in a **queue** (`students[0]` at the front) and sandwiches in a **stack** (`sandwiches[0]` at the top), where `0` represents a circular sandwich and `1` represents a square sandwich. At each step:
- If the front student prefers the top sandwich (`students[0] == sandwiches[0]`), they take it and both leave.
- Otherwise, the top sandwich stays in place and the front student moves to the back of the queue.

This repeats until nobody in the queue wants the current top sandwich. Return the number of students left unable to eat.

---

## Examples

### Example 1

```text
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0
Explanation:
- Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1].
- Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0].
- Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,1].
- Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1].
- Front student takes the top sandwich and leaves the line making students = [] and sandwiches = [].
Hence all students are able to eat.
```

### Example 2

```text
Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3
```

---

## Constraints

- `1 <= students.length, sandwiches.length <= 100`

- `students.length == sandwiches.length`

- `sandwiches[i]` is `0` or `1`.

- `students[i]` is `0` or `1`.

---

## Problem Understanding

- **Crucial insight:** While the **sandwiches** are strictly ordered in a stack (you cannot reach `sandwiches[i + 1]` until `sandwiches[i]` is taken!), the **students** rotate cyclically in a queue.
- Because the queue rotates indefinitely until someone wants the top sandwich `v = sandwiches[i]`, **as long as at least one remaining student anywhere in the queue prefers `v`, that student will eventually rotate to the front and eat `v`!**
- Deadlock occurs at `sandwiches[i] = v` **if and only if zero remaining students prefer `v`**. At that exact moment, all remaining students in the queue (who all prefer the opposite type `v ^ 1`) are permanently stuck!

---

## Approach

### Brute Force Approach

Simulating the actual queue with `students.shift()` and `students.push(...)` while tracking consecutive rotations without a match works for `n <= 100` (taking `O(n^2)` time), but misses the `O(n)` counting invariant that student order never affects the final outcome.

### Optimized Approach

Count initial student preferences in a 2-element array `cnt = [0, 0]`. Iterate through `sandwiches` from top to bottom: for each sandwich `v`, if `cnt[v]-- === 0` (no student wants `v`), immediately return the count of remaining students `cnt[v ^ 1]`. If the loop completes, everyone ate (`return 0`).

### Step-by-Step Thinking Process

1. Tally how many students want `0` and how many want `1` inside `cnt = [0, 0]`.
2. Scan `sandwiches` in stack order (`for (let v of sandwiches)`).
3. Check whether any remaining student wants `v` using `if (cnt[v]-- === 0)`.
4. If `cnt[v]` was `0` before decrementing, nobody can ever remove `v` from the top of the stack; every remaining student must want the opposite type `v ^ 1`, so return `cnt[v ^ 1]`.
5. Otherwise `cnt[v]` has been decremented by `1`, consuming both one student and sandwich `v`. If all sandwiches are consumed, return `0`.

### Algorithm / Intuition

Look closely at the concise expression `if (cnt[v]-- === 0) return cnt[v ^ 1];`:
- Post-decrement `cnt[v]--` evaluates to the **old** value of `cnt[v]` before subtracting `1`.
- If `cnt[v]` was `> 0`, the condition is `false`, `cnt[v]` decreases by `1`, and we move to the next sandwich.
- If `cnt[v]` was `0`, the condition is `true`! Even though `cnt[v]` becomes `-1`, we don't read `cnt[v]` — we return `cnt[v ^ 1]` (since `0 ^ 1 === 1` and `1 ^ 1 === 0`), which holds the exact count of all remaining hungry students!

---

## Dry Run

Tracing Example 1 (`students = [1, 1, 0, 0]`, `sandwiches = [0, 1, 0, 1]`) and Example 2 (`[1, 1, 1, 0, 0, 1]`, `[1, 0, 0, 0, 1, 1]`):

**Example 1:**
1. Count `students`: `cnt = [2, 2]` (`2` circular, `2` square).
2. Process `sandwiches`:
   - `v = 0`: `cnt[0]` was `2 !== 0` -> `cnt` becomes `[1, 2]`.
   - `v = 1`: `cnt[1]` was `2 !== 0` -> `cnt` becomes `[1, 1]`.
   - `v = 0`: `cnt[0]` was `1 !== 0` -> `cnt` becomes `[0, 1]`.
   - `v = 1`: `cnt[1]` was `1 !== 0` -> `cnt` becomes `[0, 0]`.
3. Loop finishes -> returns `0`.

**Example 2 (`cnt` starts at `[2, 4]`, `sandwiches = [1, 0, 0, 0, 1, 1]`):**
- `i = 0 (v = 1)`: `cnt` -> `[2, 3]`
- `i = 1 (v = 0)`: `cnt` -> `[1, 3]`
- `i = 2 (v = 0)`: `cnt` -> `[0, 3]`
- `i = 3 (v = 0)`: `cnt[0]` is `0 === 0`! Returns `cnt[0 ^ 1] = cnt[1] = 3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — One pass over `students` and at most one pass over `sandwiches`.
- **Space Complexity:** `O(1)` — Only the 2-element array `cnt` is allocated.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1700number-of-students-unable-to-eat-lunch.js](./1700number-of-students-unable-to-eat-lunch.js) |

---

## Key Learnings

- A rotating queue acts like an unordered multiset as long as you only care about *whether* an element eventually reaches the front, not *how many* rotations it takes.
- XORing with `1` (`v ^ 1`) is a clean idiom to toggle between `0` and `1` without branching (`1 - v` works identically).
