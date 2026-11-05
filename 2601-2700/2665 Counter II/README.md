---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2665. Counter II

**[View Problem on LeetCode](https://leetcode.com/problems/counter-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2665` (`2665`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Write a function `createCounter` that accepts an initial integer `init` and returns an object exposing three functions:

- `increment()`: increases the current value by 1 and returns it.
- `decrement()`: decreases the current value by 1 and returns it.
- `reset()`: resets the current value back to `init` and returns it.

The returned object acts as an encapsulated stateful counter object manipulating the enclosed numeric state across calls.

---

## Examples

### Example 1

```text
Input: init = 5, calls = ["increment","reset","decrement"]
Output: [6,5,4]
Explanation:
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4
```

### Example 2

```text
Input: init = 0, calls = ["increment","increment","decrement","reset","reset"]
Output: [1,2,1,0,0]
Explanation:
const counter = createCounter(0);
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.reset(); // 0
counter.reset(); // 0
```

---

## Constraints

- `-1000 <= init <= 1000`

- `0 <= calls.length <= 1000`

- `calls[i]` is one of "increment", "decrement" and "reset"

---

## Problem Understanding

This problem tests understanding of JavaScript closures, lexical scope, and object methods.

Key considerations:
- The initial value `init` must be preserved so that calls to `reset()` can restore the counter to its starting point even after multiple increments or decrements.
- A mutable variable `currentValue` tracks the ongoing count.
- Each method must return the updated numeric value immediately following mutation.
- Multiple instances created with `createCounter` must maintain completely independent states.

---

## Approach

### Brute Force Approach

An alternative implementation could use ES6 classes (`class Counter { ... }`) or attach methods to `this` inside a constructor function.

While class-based approaches work, creating an object literal with methods closing over local function variables (`currentValue`, `init`) provides true private encapsulation without exposing internal properties to external tampering on the instance.

### Optimized Approach

The solution uses a closure over `currentValue` initialized to `init`.

The outer function `createCounter(init)` defines `let currentValue = init` and returns an object literal with three methods:
- `increment: function() { return currentValue += 1; }`
- `decrement: function() { return currentValue -= 1; }`
- `reset: function() { return currentValue = init; }`

All three methods share the same enclosed `currentValue` variable.

### Step-by-Step Thinking Process

1. We need a counter that can increment, decrement, and reset back to an initial number `init`.
2. Define `currentValue` initialized to `init` inside `createCounter`.
3. Return an object containing three functions: `increment`, `decrement`, and `reset`.
4. In `increment`, update `currentValue += 1` and return the new value.
5. In `decrement`, update `currentValue -= 1` and return the new value.
6. In `reset`, reassign `currentValue = init` and return `init`.
7. The closure preserves `currentValue` and `init` privately.

### Algorithm / Intuition

The code creates a lexical environment containing `init` and `currentValue`:

1. When `createCounter(init)` executes, a new execution context is created where `currentValue` is assigned `init`.
2. The returned object holds references to three anonymous functions.
3. Because these functions were created inside `createCounter`, they hold a closure reference to `currentValue` and `init`.
4. Invoking `increment` executes `currentValue += 1`, which mutates the variable and returns the post-increment value.
5. Invoking `decrement` executes `currentValue -= 1`, returning the post-decrement value.
6. Invoking `reset` executes `currentValue = init`, restoring the baseline value and returning it.

---

## Dry Run

Trace for `init = 5`, `calls = ["increment", "reset", "decrement"]`:

- `const counter = createCounter(5)`:
  - `init = 5`
  - `currentValue = 5`
- **Call 1 (`counter.increment()`):**
  - `currentValue += 1` -> `currentValue = 6`.
  - Returns `6`.
- **Call 2 (`counter.reset()`):**
  - `currentValue = init = 5`.
  - Returns `5`.
- **Call 3 (`counter.decrement()`):**
  - `currentValue -= 1` -> `currentValue = 4`.
  - Returns `4`.
- **Output array:** `[6, 5, 4]`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Each method invocation (`increment`, `decrement`, `reset`) performs a single arithmetic assignment and returns in constant time.
- **Space Complexity:** `O(1)` — Memory is allocated only for the closure variables (`currentValue`, `init`) and the returned object reference.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2665counter-ii.js](./2665counter-ii.js) |

---

## Key Learnings

- JavaScript closures enable data privacy by preventing external direct access to inner variables.
- Compound assignment operators (`+=`, `-=`) evaluate to the assigned value, enabling concise one-liner method returns.
- Independent calls to `createCounter` create isolated lexical environments with separate state.
