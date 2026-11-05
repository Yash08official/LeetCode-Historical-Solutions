---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2667. Create Hello World Function

**[View Problem on LeetCode](https://leetcode.com/problems/create-hello-world-function/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2667` (`2667`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Write a function `createHelloWorld`. It should return a new function that always returns the string `"Hello World"`, regardless of any arguments passed to it.

Any arguments provided to the returned function must be safely accepted and ignored.

---

## Examples

### Example 1

```text
Input: args = []
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f(); // "Hello World"

The function returned by createHelloWorld should always return "Hello World".
```

### Example 2

```text
Input: args = [{},null,42]
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

Any arguments could be passed to the function but it should still always return "Hello World".
```

---

## Constraints

- `0 <= args.length <= 10`

---

## Problem Understanding

This problem tests basic knowledge of higher-order functions in JavaScript.

Key points:
- `createHelloWorld()` is a factory function that returns another function.
- The returned inner function can be called with zero, one, or multiple arguments.
- Regardless of the number or type of arguments passed, it must strictly return `"Hello World"`.

---

## Approach

### Brute Force Approach

Since the problem requires returning a constant string from a higher-order function, there is no distinct brute force versus optimized divide.

An alternative syntax could use an arrow function `() => 'Hello World'` or a classic function expression. Handling variable numbers of arguments is cleanly achieved using ES6 rest parameters (`...args`).

### Optimized Approach

The solution returns an inner function using rest parameters `function(...args)` that unconditionally returns `'Hello World'`.

Rest parameters `...args` gather any supplied parameters into an array, ensuring that calls like `f()`, `f(1, 2, 3)`, or `f({ key: 'val' })` execute without parameter mismatch errors.

### Step-by-Step Thinking Process

1. We need a function that returns another function.
2. The returned function should accept any number of arguments.
3. Use rest parameters `...args` in the parameter list.
4. The body of the inner function simply returns the string `'Hello World'`.

### Algorithm / Intuition

This is a fundamental higher-order function returning a constant supplier:

1. Calling `createHelloWorld()` constructs and returns a function closure.
2. When invoked as `f(...args)`, the function ignores `args`.
3. It returns the string literal `'Hello World'` immediately in `O(1)` time.

---

## Dry Run

Trace for `const f = createHelloWorld()`, `args = [{}]`:

- `createHelloWorld()` returns `function(...args) { return 'Hello World'; }`.
- Call `f({})`:
  - `args` receives `[{}]`.
  - The function returns `'Hello World'`.
- Output: `"Hello World"`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Creating the function and executing it both take constant time.
- **Space Complexity:** `O(1)` — Constant memory overhead for returning the function and the string literal.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2667create-hello-world-function.js](./2667create-hello-world-function.js) |

---

## Key Learnings

- Higher-order functions in JavaScript can return functions configured to act as suppliers or factories.
- Rest parameter syntax `...args` absorbs arbitrary argument lists without throwing errors.
