---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2620. Counter

**[View Problem on LeetCode](https://leetcode.com/problems/counter/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2620` (`2620`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer `n`, write a function `createCounter(n)` that returns a `counter` function.

This `counter` function initially returns `n`, and each subsequent time it is called, it returns 1 more than the previous value (`n`, `n + 1`, `n + 2`, etc.).

---

## Examples

### Example 1

```text
Input:
n = 10
["call","call","call"]
Output: [10,11,12]
Explanation:
counter() = 10 // The first time counter() is called, it returns n.
counter() = 11 // Returns 1 more than the previous time.
counter() = 12 // Returns 1 more than the previous time.
```

### Example 2

```text
Input:
n = -2
["call","call","call","call","call"]
Output: [-2,-1,0,1,2]
Explanation: counter() initially returns -2. Then increases after each sebsequent call.
```

---

## Constraints

- `-1000^ <= n <= 1000`

- `0 <= calls.length <= 1000`

- `calls[i] === "call"`

---

## Problem Understanding

This problem tests the concept of closures in JavaScript. The outer function `createCounter` accepts an initial integer `n` and must return an inner function that preserves and updates internal state across multiple calls. The first call must return `n`, the second `n + 1`, the third `n + 2`, and so forth.

---

## Approach

### Brute Force Approach

Using an ES6 Class or an object with an explicit method `counter.call()` would work, but the problem signature requires returning a callable function. Using global variables would pollute the global scope and fail if multiple counters are instantiated simultaneously.

### Optimized Approach

Use a JavaScript closure. Declare a local variable `counter = n` inside `createCounter`. Return an anonymous inner function that executes `return counter++`. The postfix increment operator returns the current value of `counter` first, and then increments it by 1 for the next invocation.

### Step-by-Step Thinking Process

1. We need a function that maintains state between invocations.
2. In JavaScript, an inner function maintains a reference to its lexical environment (a closure), allowing it to read and mutate variables from its enclosing scope.
3. Define `let counter = n`.
4. The inner function returns `counter++`. Postfix increment evaluates to the pre-increment value before updating `counter`.
5. Each independent call to `createCounter` creates its own isolated closure scope.

### Algorithm / Intuition

When `createCounter(n)` is called, a new execution context is created with variable `counter` initialized to `n`. The returned function retains a reference to `counter` via its scope chain. When the returned function is called, `counter++` returns the current value of `counter` and then increments `counter` by 1 in place. The state persists across invocations without leaking into the outer or global scope.

---

## Dry Run

Trace with Example 1: `n = 10`, `calls = ["call", "call", "call"]`.
- `const counter = createCounter(10)` creates closure with `counter = 10`.
- Call 1: `counter()` executes `return counter++`.
  - Returns `10`.
  - Value of `counter` becomes `11`.
- Call 2: `counter()` executes `return counter++`.
  - Returns `11`.
  - Value of `counter` becomes `12`.
- Call 3: `counter()` executes `return counter++`.
  - Returns `12`.
  - Value of `counter` becomes `13`.
Result: `[10, 11, 12]`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Creating the counter takes constant time, and each subsequent function call executes a single postfix increment in constant time.
- **Space Complexity:** `O(1)` — The closure retains a single number variable in memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2620counter.js](./2620counter.js) |

---

## Key Learnings

- Closures allow functions to encapsulate private state without classes or object wrappers.
- Postfix increment (`counter++`) returns the current value before incrementing, perfectly matching the 'return initially n then increment' specification.
- Each invocation of the factory function creates an independent closure instance with its own isolated state.
