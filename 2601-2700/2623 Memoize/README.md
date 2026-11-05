---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2623. Memoize

**[View Problem on LeetCode](https://leetcode.com/problems/memoize/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2623` (`2623`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a function `fn`, write a function `memoize(fn)` that returns a **memoized** version of `fn`.

A memoized function is a function that will never be executed twice with the identical arguments. Instead, upon receiving previously seen arguments, it immediately returns the cached result.

You may assume the input function is one of: `sum(a, b)`, `fib(n)`, or `factorial(n)`.

---

## Examples

### Example 1

```text
Input:
fnName = "sum"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[2,2],[2,2],[],[1,2],[]]
Output: [4,4,1,3,2]
Explanation:
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // "call" - returns 4. sum() was called as (2, 2) was not seen before.
memoizedSum(2, 2); // "call" - returns 4. However sum() was not called because the same inputs were seen before.
// "getCallCount" - total call count: 1
memoizedSum(1, 2); // "call" - returns 3. sum() was called as (1, 2) was not seen before.
// "getCallCount" - total call count: 2
```

### Example 2

```text
Input:
fnName = "factorial"
actions = ["call","call","call","getCallCount","call","getCallCount"]
values = [[2],[3],[2],[],[3],[]]
Output: [2,6,2,2,6,2]
Explanation:
const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // "call" - returns 2.
memoFactorial(3); // "call" - returns 6.
memoFactorial(2); // "call" - returns 2. However factorial was not called because 2 was seen before.
// "getCallCount" - total call count: 2
memoFactorial(3); // "call" - returns 6. However factorial was not called because 3 was seen before.
// "getCallCount" - total call count: 2
```

### Example 3

```text
Input:
fnName = "fib"
actions = ["call","getCallCount"]
values = [[5],[]]
Output: [8,1]
Explanation:
fib(5) = 8 // "call"
// "getCallCount" - total call count: 1
```

---

## Constraints

- `0 <= a, b <= 10^5`

- `1 <= n <= 10`

- `1 <= actions.length <= 10^5`

- `actions.length === values.length`

- `actions[i]` is one of "call" and "getCallCount"

- `fnName` is one of "sum", "factorial" and "fib"

---

## Problem Understanding

We must implement function memoization (caching output based on input parameters). The returned function must intercept calls, serialize its arguments into a cache key, check if that key exists in a cache, and either return the cached value or compute, store, and return the new result. Subsequent calls with identical arguments must not re-execute `fn`.

---

## Approach

### Brute Force Approach

Calling `fn(...args)` on every invocation without caching. For computationally heavy or recursively overlapping functions (like naive Fibonacci or factorial), this leads to redundant exponential computations ($O(2^n)$) and redundant work.

### Optimized Approach

Use a JavaScript `Map` inside the closure of `memoize`. When the memoized wrapper function is invoked with `...args`, serialize the argument list to a string using `args.toString()`. If `cache.has(key)` is true, return `cache.get(key)` immediately. Otherwise, call `const result = fn(...args)`, store it via `cache.set(key, result)`, and return `result`.

### Step-by-Step Thinking Process

1. Memoization requires maintaining a key-value store of past computations across function calls.
2. A closure around `const cache = new Map()` ensures the cache persists across invocations of the returned function.
3. Argument serialization: because inputs are primitives (numbers), `args.toString()` or `JSON.stringify(args)` produces a deterministic string key (e.g., `[2, 3].toString() === "2,3"`).
4. Check `cache.has(key)`: if present, return `cache.get(key)` in $O(1)$ amortized time.
5. If not present: evaluate `fn(...args)`, write to `cache`, and return the result.

### Algorithm / Intuition

The outer function `memoize(fn)` instantiates `cache = new Map()`. The returned wrapper function accepts variadic arguments `...args`. It turns `args` into a comma-separated string with `args.toString()`. Using `cache.has(key)` avoids issues where a valid cached result is falsy (like `0` or `null`). If found, `cache.get(key)` is returned immediately. Otherwise, `fn(...args)` computes the result, `cache.set(key, result)` records it, and `result` is returned.

---

## Dry Run

Trace with Example 1: `fn = (a, b) => a + b`, calls: `(2, 2)`, `(2, 2)`, `(1, 2)`.
- `memoizedFn(2, 2)`:
  - `args.toString()` produces `"2,2"`.
  - `cache.has("2,2")` is false.
  - Execute `fn(2, 2) = 4`.
  - Set `cache.set("2,2", 4)`.
  - Return `4` (call count: 1).
- `memoizedFn(2, 2)`:
  - `args.toString()` produces `"2,2"`.
  - `cache.has("2,2")` is true!
  - Return `cache.get("2,2") = 4` without executing `fn` (call count remains 1).
- `memoizedFn(1, 2)`:
  - `args.toString()` produces `"1,2"`.
  - `cache.has("1,2")` is false.
  - Execute `fn(1, 2) = 3`.
  - Set `cache.set("1,2", 3)`.
  - Return `3` (call count: 2).

---

## Complexity Analysis

- **Time Complexity:** `O(1)` amortized per memoized lookup — `args.toString()` runs in $O(K)$ where $K$ is argument count (here $K \le 2$), and `Map` lookup and insertion operate in $O(1)$ average time.
- **Space Complexity:** `O(U)` where `U` is the number of unique argument combinations passed to the function, stored in `cache`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2623memoize.js](./2623memoize.js) |

---

## Key Learnings

- Memoization trades memory for speed by storing results of expensive pure function evaluations.
- Use `cache.has(key)` rather than checking truthiness of `cache.get(key)` to correctly handle falsy return values such as `0` or `false`.
- `args.toString()` offers a lightweight serialization for arrays of numbers without the overhead of full `JSON.stringify`.
