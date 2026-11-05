---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2704. To Be Or Not To Be

**[View Problem on LeetCode](https://leetcode.com/problems/to-be-or-not-to-be/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2704` (`2704`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We need to implement a JavaScript testing utility function named `expect(val)` that accepts any value `val` and returns an object containing two assertion helper methods: `toBe(expected)` and `notToBe(expected)`.

`toBe(expected)` checks strict equality (`===`) between `val` and `expected`. If they are strictly equal, it returns `true`; otherwise, it throws an `Error` with the message `'Not Equal'`.

`notToBe(expected)` checks strict inequality (`!==`) between `val` and `expected`. If they are not strictly equal, it returns `true`; otherwise, it throws an `Error` with the message `'Equal'`.

---

## Examples

### Example 1

```text
Input: func = () => expect(5).toBe(5)
Output: {"value": true}
Explanation: 5 === 5 so this expression returns true.
```

### Example 2

```text
Input: func = () => expect(5).toBe(null)
Output: {"error": "Not Equal"}
Explanation: 5 !== null so this expression throw the error "Not Equal".
```

### Example 3

```text
Input: func = () => expect(5).notToBe(null)
Output: {"value": true}
Explanation: 5 !== null so this expression returns true.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

Key considerations:
- `expect` acts as a closure factory, closing over `val`.
- Strict equality (`===`) must be used rather than loose equality (`==`) so type coercion does not cause false positives (e.g., `null !== undefined`, `0 !== false`).
- If the condition fails, an actual `Error` instance must be thrown with the exact specified string messages (`'Not Equal'` or `'Equal'`).
- If the assertion passes, it must return boolean literal `true`.

---

## Approach

### Brute Force Approach

Because this is a design problem testing closures and object structure, there is no algorithmic brute force. A flawed approach might return a boolean directly instead of an object, use loose comparison (`==` / `!=`), or return error strings instead of throwing JavaScript `Error` objects with `throw new Error(...)`.

### Optimized Approach

The solution returns an object literal containing two methods (`toBe` and `notToBe`). Both methods form a closure over the parameter `val`. `toBe` compares `val !== expected` and throws `new Error('Not Equal')` if true, returning `true` otherwise. `notToBe` compares `val === expected` and throws `new Error('Equal')` if true, returning `true` otherwise.

### Step-by-Step Thinking Process

1. Identify that `expect(val)` must return an object with two callable methods: `toBe` and `notToBe`.
2. Leverage JavaScript closures so that both inner functions retain access to the original `val` parameter.
3. Implement `toBe(expected)`: evaluate `val !== expected`. If not strictly equal, execute `throw new Error('Not Equal')`. Otherwise return `true`.
4. Implement `notToBe(expected)`: evaluate `val === expected`. If strictly equal, execute `throw new Error('Equal')`. Otherwise return `true`.
5. Ensure returned object has exactly `{ toBe, notToBe }` keys.

### Algorithm / Intuition

When `expect(val)` is executed, a new function scope is created enclosing `val`. It returns an object literal `{ toBe: function(expected) { ... }, notToBe: function(expected) { ... } }`. When a caller executes `.toBe(expected)`, the method looks up `val` in its enclosing lexical scope and compares it using `!==` against `expected`. If they do not match, `throw new Error('Not Equal')` stops execution. If they match, `true` is returned. The inverse logic applies to `notToBe`.

---

## Dry Run

We trace Example 1 with `expect(5).toBe(5)`:

- Call `expect(5)`: creates closure with `val = 5` and returns object `{ toBe, notToBe }`.
- Call `.toBe(5)` on the returned object: `expected = 5`.
- Check condition `val !== expected` -> `5 !== 5` is `false`.
- Does not throw error; executes `return true`.
- Final evaluated result is `true` (wrapped by test harness as `{"value": true}`).

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Creating the closure object and evaluating a strict equality comparison both take constant time.
- **Space Complexity:** `O(1)` — Allocates a single object containing two function references in memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2704to-be-or-not-to-be.js](./2704to-be-or-not-to-be.js) |

---

## Key Learnings

- Closures in JavaScript allow returned functions to retain access to variables in their lexical scope.
- Throwing exceptions with `throw new Error(msg)` is the standard mechanism in testing frameworks (like Jest) to signal test failures.
- Strict equality (`===`) checks both type and value without performing implicit type conversions.
