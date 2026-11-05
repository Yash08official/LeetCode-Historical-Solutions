---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2629. Function Composition

**[View Problem on LeetCode](https://leetcode.com/problems/function-composition/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2629` (`2629`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array of functions `functions = [f1, f2, f3, ..., fn]`, return a new function `fn` that represents the **function composition** of the array.

The function composition of an array of functions `[f(x), g(x), h(x)]` is defined mathematically as `fn(x) = f(g(h(x)))`. The functions are evaluated strictly from right to left, passing the output of each function as the input to the next.

If the given array of functions is empty, the composition is defined as the identity function, returning the input `x` without modification: `fn(x) = x`.

---

## Examples

### Example 1

```text
Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
Output: 65
Explanation:
Evaluating from right to left ...
Starting with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65
```

### Example 2

```text
Input: functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
Output: 1000
Explanation:
Evaluating from right to left ...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000
```

### Example 3

```text
Input: functions = [], x = 42
Output: 42
Explanation:
The composition of zero functions is the identity function
```

---

## Constraints

- `-1000 <= x <= 1000`

- `0 <= functions.length <= 1000`

- all functions accept and return a single integer

---

## Problem Understanding

Function composition is a fundamental concept in functional programming.

Key properties to observe:
- Evaluation order is strictly right-to-left: the last function `functions[n - 1]` is called first with `x`, then `functions[n - 2]` is called with that result, and so on up to `functions[0]`.
- When `functions.length === 0`, the composition should behave as an identity function returning `x` directly.
- Each function in `functions` accepts a single integer argument and returns a single integer.

---

## Approach

### Brute Force Approach

A naive approach could attempt to recursively compose functions: `compose(f, g) = x => f(g(x))` by slicing the array repeatedly or building a deep recursive call tree.

However, creating array slices `functions.slice()` at each recursive step allocates unnecessary intermediate arrays (`O(n^2)` total space), and recursion consumes `O(n)` stack frames which could cause stack overflow for large arrays.

### Optimized Approach

The optimal approach evaluates the composition iteratively from right to left using a simple loop or `reduceRight`.

The implemented solution checks if `functions.length === 0` and returns `x => x`. Otherwise, it initializes `let result = x`, then runs a backwards `for` loop starting at `i = functions.length - 1` down to `0`, iteratively updating `result = functions[i](result)`. Finally, it returns `result`.

### Step-by-Step Thinking Process

1. Composition evaluates functions from right to left: `f(g(h(x)))` means compute `h(x)`, then pass to `g`, then pass to `f`.
2. If the input array `functions` is empty, return an identity function `function(x) { return x; }`.
3. If the array is non-empty, return a function taking `x`. Initialize `result = x`.
4. Loop backwards from index `functions.length - 1` down to `0`. At each step, update `result = functions[i](result)`.
5. After the loop finishes, all functions have been applied in right-to-left order; return `result`.

### Algorithm / Intuition

The algorithm implements right-to-left fold/pipeline evaluation:

1. `compose(functions)` returns a function `function(x)`.
2. If `functions.length === 0`, it returns `x` immediately (identity function).
3. Otherwise, `result` is assigned initial value `x`.
4. The loop `for (let i = functions.length - 1; i >= 0; i--)` processes `functions[i]` sequentially.
5. In each iteration, `result = functions[i](result)` takes the current output and feeds it as the argument into the next function.
6. Once `i = 0` is processed, `result` holds `functions[0](functions[1](...(functions[n-1](x))))`, which is returned.

---

## Dry Run

Trace for `functions = [x => x + 1, x => x * x, x => 2 * x]`, `x = 4`:

- `functions.length = 3` (non-empty).
- `result = 4`.
- **i = 2 (`x => 2 * x`):** `result = functions[2](4) = 2 * 4 = 8`.
- **i = 1 (`x => x * x`):** `result = functions[1](8) = 8 * 8 = 64`.
- **i = 0 (`x => x + 1`):** `result = functions[0](64) = 64 + 1 = 65`.
- Loop ends.
- Return `result = 65`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Where `n` is the number of functions in the `functions` array. Each function in the array is executed exactly once.
- **Space Complexity:** `O(1)` — The iterative evaluation uses only a single scalar variable `result` to accumulate the computed value, requiring constant extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2629function-composition.js](./2629function-composition.js) |

---

## Key Learnings

- Function composition is evaluated from right to left (outermost function applied last).
- An empty composition reduces naturally to an identity function (`x => x`).
- Iterative backwards traversal (`for (let i = n - 1; i >= 0; i--)`) evaluates function pipelines without call-stack overhead or array slicing.
