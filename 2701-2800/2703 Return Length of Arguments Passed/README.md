---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2703. Return Length of Arguments Passed

**[View Problem on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2703` (`2703`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are asked to write a JavaScript function named `argumentsLength` that determines and returns the total count of arguments passed into it upon invocation.

The function must work for any number of arguments, ranging from 0 up to 100 arguments, regardless of their data types (primitives, objects, arrays, functions, `null`, or `undefined`).

---

## Examples

### Example 1

```text
Input: args = [5]
Output: 1
Explanation:
argumentsLength(5); // 1

One value was passed to the function so it should return 1.
```

### Example 2

```text
Input: args = [{}, null, "3"]
Output: 3
Explanation:
argumentsLength({}, null, "3"); // 3

Three values were passed to the function so it should return 3.
```

---

## Constraints

- `args` is a valid JSON array

- `0 <= args.length <= 100`

---

## Problem Understanding

Key aspects to note:
- The function is invoked with variable arguments: `argumentsLength(arg1, arg2, ...)`.
- It should return an integer representing the exact number of passed parameters.
- The argument values themselves do not matter; only the count matters.
- In modern JavaScript (ES6+), rest parameter syntax (`...args`) collects all arguments into an Array instance.

---

## Approach

### Brute Force Approach

A naive or legacy approach might use the traditional `arguments` object available in non-arrow functions and iterate through it using a `for` loop or `while` loop with a manual counter variable: `let count = 0; for (let i = 0; i < arguments.length; i++) count++; return count;`. While functional and running in `O(k)` where `k` is argument count, it is unnecessarily verbose and ignores built-in length properties.

### Optimized Approach

The solution uses ES6 rest parameters `...args`. By declaring `var argumentsLength = function(...args)`, the JavaScript engine gathers all passed arguments into a true Array `args`. The function then immediately returns `args.length` in `O(1)` time.

### Step-by-Step Thinking Process

1. Analyze the requirement: count the number of arguments provided to a JavaScript function call.
2. Consider available language mechanisms: ES6 rest parameters (`...args`) vs legacy `arguments` object.
3. Rest parameters gather all incoming arguments into a native `Array`, which exposes the `.length` property directly.
4. Return `args.length` as a concise one-liner.

### Algorithm / Intuition

The parameter list uses rest parameter syntax `...args`. When `argumentsLength(1, 2, 3)` is called, the JavaScript runtime initializes a standard array `args` containing `[1, 2, 3]`. Accessing `args.length` reads the internal property storing the number of elements in the array and returns `3`.

---

## Dry Run

We trace Example 1 with `argumentsLength(5)`:

- Function call received with argument `5`.
- Rest parameter `...args` collects arguments into an array: `args = [5]`.
- Evaluate `args.length`: the array contains 1 element, so `args.length` evaluates to `1`.
- The function returns `1`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Accessing the `.length` property of an array takes constant time.
- **Space Complexity:** `O(k)` where `k` is the number of arguments passed (at most 100), needed to hold the `args` array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2703return-length-of-arguments-passed.js](./2703return-length-of-arguments-passed.js) |

---

## Key Learnings

- Rest parameters (`...args`) provide a clean, modern way to handle variadic functions in JavaScript.
- Unlike the legacy `arguments` object (which is array-like), rest parameters produce a real Array instance with full array prototype methods.
- Reading `.length` on an array is an `O(1)` property lookup.
