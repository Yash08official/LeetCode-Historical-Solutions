---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2626. Array Reduce Transformation

**[View Problem on LeetCode](https://leetcode.com/problems/array-reduce-transformation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2626` (`2626`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums`, a reducer function `fn`, and an initial value `init`, return the final accumulated value after executing `fn` on each element of `nums` sequentially.

The calculation proceeds as follows:
- `val = fn(init, nums[0])`
- `val = fn(val, nums[1])`
- `val = fn(val, nums[2])`
- ...
- and so on until every element in `nums` has been processed.

If the length of the array is 0, the function should return `init`.

Please solve it without using the built-in `Array.prototype.reduce` method.

---

## Examples

### Example 1

```text
Input:
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
Output: 10
Explanation:
initially, the value is init=0.
(0) + nums[0] = 1
(1) + nums[1] = 3
(3) + nums[2] = 6
(6) + nums[3] = 10
The final answer is 10.
```

### Example 2

```text
Input:
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100
Output: 130
Explanation:
initially, the value is init=100.
(100) + nums[0] * nums[0] = 101
(101) + nums[1] * nums[1] = 105
(105) + nums[2] * nums[2] = 114
(114) + nums[3] * nums[3] = 130
The final answer is 130.
```

### Example 3

```text
Input:
nums = []
fn = function sum(accum, curr) { return 0; }
init = 25
Output: 25
Explanation: For empty arrays, the answer is always init.
```

---

## Constraints

- `0 <= nums.length <= 1000`

- `0 <= nums[i] <= 1000`

- `0 <= init <= 1000`

---

## Problem Understanding

We must implement the core behavior of `reduce` from scratch. We start with an accumulator variable set to `init`. We iterate through the array elements from left to right (index 0 to `nums.length - 1`), repeatedly updating the accumulator by invoking `fn(accum, nums[i])`. Finally, return the accumulator. For an empty array, the loop does not run and `init` is returned directly.

---

## Approach

### Brute Force Approach

A recursive formulation `reduceRec(i, val)` where `i` tracks the index. While logically identical, recursion consumes $O(n)$ stack frames, risking a stack overflow on larger arrays, whereas a simple iterative loop runs with $O(1)$ auxiliary space.

### Optimized Approach

Use an iterative loop. Initialize `let val = init`. Iterate `i` from `0` to `nums.length - 1`, updating `val = fn(val, nums[i])` at each step. Return `val` after the loop finishes.

### Step-by-Step Thinking Process

1. We need to simulate `Array.prototype.reduce`.
2. Initialize state variable `let val = init`.
3. Use a standard `for` loop from `i = 0` to `nums.length - 1`.
4. At each index `i`, update `val = fn(val, nums[i])`.
5. If `nums` is empty, loop condition `0 < 0` is false immediately, returning `val = init` as required.
6. Return the final value of `val`.

### Algorithm / Intuition

The solution sets `let val = init`. The loop `for (let i = 0; i < nums.length; i++)` steps through `nums` in sequential order. Each element `nums[i]` and the current accumulated `val` are passed into `fn`, and the return value reassigns `val`. After all elements have been folded, `val` contains the final reduced result and is returned.

---

## Dry Run

Trace with Example 1: `nums = [1, 2, 3, 4]`, `fn = function sum(accum, curr) { return accum + curr; }`, `init = 0`.
- `val = 0`.
- `i = 0`: `val = fn(0, 1) = 0 + 1 = 1`.
- `i = 1`: `val = fn(1, 2) = 1 + 2 = 3`.
- `i = 2`: `val = fn(3, 3) = 3 + 3 = 6`.
- `i = 3`: `val = fn(6, 4) = 6 + 4 = 10`.
- Loop terminates (`i = 4 == nums.length`).
Return `val = 10`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` where `n = nums.length` — The loop visits each of the `n` elements exactly once, invoking `fn` once per element (assuming `fn` executes in $O(1)$ time).
- **Space Complexity:** `O(1)` — Only a single variable `val` is maintained, requiring constant auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2626array-reduce-transformation.js](./2626array-reduce-transformation.js) |

---

## Key Learnings

- `reduce` is the fundamental folding higher-order function that can express mapping, filtering, and aggregation.
- Iterative reduction uses $O(1)$ auxiliary space and avoids call-stack overhead.
- Careful initialization with `init` naturally handles empty arrays without requiring special-case branching.
