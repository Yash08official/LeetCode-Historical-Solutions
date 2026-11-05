---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2666. Allow One Function Call

**[View Problem on LeetCode](https://leetcode.com/problems/allow-one-function-call/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2666` (`2666`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a function `fn`, return a new function that is identical to `fn` except that it guarantees `fn` is called at most once.

- The very first time the returned function is called, it should invoke `fn` with the provided arguments and return its result.
- On every subsequent invocation, the returned function should not call `fn` at all and should instead return `undefined`.

---

## Examples

### Example 1

```text
Input: fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]
Output: [{"calls":1,"value":6}]
Explanation:
const onceFn = once(fn);
onceFn(1, 2, 3); // 6
onceFn(2, 3, 6); // undefined, fn was not called
```

### Example 2

```text
Input: fn = (a,b,c) => (a * b * c), calls = [[5,7,4],[2,3,6],[4,6,8]]
Output: [{"calls":1,"value":140}]
Explanation:
const onceFn = once(fn);
onceFn(5, 7, 4); // 140
onceFn(2, 3, 6); // undefined, fn was not called
onceFn(4, 6, 8); // undefined, fn was not called
```

---

## Constraints

- `calls` is a valid JSON array

- `1 <= calls.length <= 10`

- `1 <= calls[i].length <= 100`

- `2 <= JSON.stringify(calls).length <= 1000`

---

## Problem Understanding

This problem implements the popular utility pattern commonly known as `once`.

Key properties:
- State tracking across invocations: we must track whether the function has already been executed.
- First invocation: execute `fn(...args)` with the arguments provided to that first call and return the computed value.
- All future calls: immediately return `undefined` without executing `fn` or causing any side effects.
- Arguments passed to subsequent calls should be ignored.

---

## Approach

### Brute Force Approach

Because we only need a single boolean flag to record whether the function has run, there is no separate complex brute-force algorithm.

A naive attempt might try to delete the function property or reassign the function reference globally, which pollutes the outer scope or breaks module boundaries. Using a local closure variable is the cleanest and most robust approach.

### Optimized Approach

The optimal approach uses a closure boolean `let called = false` inside `once(fn)`.

When the returned wrapper function `function (...args)` is invoked:
1. It inspects `if (!called)`.
2. If `called` is false, it flips `called = true` and immediately returns `fn(...args)`.
3. If `called` is already true, the `if` block is bypassed, and the function terminates, returning `undefined` by default.

### Step-by-Step Thinking Process

1. We need to restrict `fn` to at most one execution.
2. Use a closure flag `called = false` in the outer function scope.
3. Return a new wrapper function accepting dynamic arguments `(...args)`.
4. Check `if (!called)`. If it is the first call, set `called = true` and return `fn(...args)`.
5. If `called` is true, do nothing; JavaScript functions implicitly return `undefined` when no return statement is reached.

### Algorithm / Intuition

The pattern relies on JavaScript closures for stateful gatekeeping:

1. When `once(fn)` is evaluated, `let called = false` is defined in its lexical environment.
2. The returned wrapper function retains access to `called` and `fn`.
3. On invocation 1: `called` is false, so `called` is set to `true`, and `fn(...args)` is called. Its return value is returned to the caller.
4. On invocation 2 and beyond: `called` is already true, so the `if (!called)` branch is skipped.
5. Reaching the end of the function body without returning explicitly yields `undefined`.

---

## Dry Run

Trace for `fn = (a, b, c) => (a + b + c)`, `calls = [[1, 2, 3], [2, 3, 6]]`:

- `const onceFn = once(fn)` initializes with `called = false`.
- **Call 1:** `onceFn(1, 2, 3)`:
  - `!called` is `!false = true`.
  - `called = true`.
  - Returns `fn(1, 2, 3) = 1 + 2 + 3 = 6`.
- **Call 2:** `onceFn(2, 3, 6)`:
  - `!called` is `!true = false`.
  - `if` block is skipped.
  - Returns `undefined`.
- **Output:** `[{"calls": 1, "value": 6}]`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` overhead — Checking and toggling the boolean flag takes constant time. The first call incurs the runtime of `fn(...args)`, and all subsequent calls execute in `O(1)` time.
- **Space Complexity:** `O(1)` — Only a single boolean variable `called` is stored in the closure.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2666allow-one-function-call.js](./2666allow-one-function-call.js) |

---

## Key Learnings

- The `once` higher-order function prevents duplicate execution of idempotent or non-repeatable operations (like initialization routines).
- A closure boolean flag acts as a one-way latch or gatekeeper.
- Functions without an explicit return statement automatically evaluate to `undefined` in JavaScript.
