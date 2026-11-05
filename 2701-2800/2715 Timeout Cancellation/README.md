---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2715. Timeout Cancellation

**[View Problem on LeetCode](https://leetcode.com/problems/timeout-cancellation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2715` (`2715`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are asked to create a function `cancellable(fn, args, t)` that delays the execution of a provided function `fn` with arguments `args` by `t` milliseconds.

The function must return a cancellation function, `cancelFn`. If `cancelFn` is invoked before the delay of `t` milliseconds expires, the planned execution of `fn` must be aborted so `fn` is never called. Otherwise, if `cancelFn` is not called within `t` milliseconds, `fn` should execute normally with the given `args`.

---

## Examples

### Example 1

```text
Input: fn = (x) => x * 5, args = [2], t = 20
Output: [{"time": 20, "returned": 10}]
Explanation:
const cancelTimeMs = 50;
const cancelFn = cancellable((x) => x * 5, [2], 20);
setTimeout(cancelFn, cancelTimeMs);

The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened after the execution of fn(2) at 20ms.
```

### Example 2

```text
Input: fn = (x) => x**2, args = [2], t = 100
Output: []
Explanation:
const cancelTimeMs = 50;
const cancelFn = cancellable((x) => x**2, [2], 100);
setTimeout(cancelFn, cancelTimeMs);

The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened before the execution of fn(2) at 100ms, resulting in fn(2) never being called.
```

### Example 3

```text
Input: fn = (x1, x2) => x1 * x2, args = [2,4], t = 30
Output: [{"time": 30, "returned": 8}]
Explanation:
const cancelTimeMs = 100;
const cancelFn = cancellable((x1, x2) => x1 * x2, [2,4], 30);
setTimeout(cancelFn, cancelTimeMs);

The cancellation was scheduled to occur after a delay of cancelTimeMs (100ms), which happened after the execution of fn(2,4) at 30ms.
```

---

## Constraints

- `fn` is a function

- `args` is a valid JSON array

- `1 <= args.length <= 10`

- `20 <= t <= 1000`

- `10 <= cancelTimeMs <= 1000`

---

## Problem Understanding

Key requirements and behavior:
- `t` is a delay in milliseconds (`20 <= t <= 1000`).
- `cancelTimeMs` is the time when the test runner calls `cancelFn`.
- If `cancelTimeMs < t`, the execution is cancelled and `fn` must never run.
- If `cancelTimeMs >= t`, `fn` executes at `t` ms, and calling `cancelFn` later does nothing detrimental.
- In JavaScript, `setTimeout` schedules asynchronous execution and returns a timer ID; `clearTimeout` cancels a scheduled timer.

---

## Approach

### Brute Force Approach

A naive polling approach might run an active interval or busy-wait loop checking elapsed time with `Date.now()` or `performance.now()` until either the cancellation flag is toggled or `t` milliseconds elapse. Busy waiting blocks the JavaScript event loop, freezes the thread, and consumes 100% CPU. JavaScript's native timer API (`setTimeout` / `clearTimeout`) is the direct and optimal mechanism.

### Optimized Approach

The solution uses JavaScript's built-in `setTimeout` and `clearTimeout`:
1. Schedule execution: `const timer = setTimeout(() => fn(...args), t);`
2. Return an arrow function `() => { clearTimeout(timer); };` which, when invoked, cancels the scheduled timer.

### Step-by-Step Thinking Process

1. Understand that delayed asynchronous execution in JS is fundamentally powered by `setTimeout`.
2. Call `setTimeout` passing a callback `() => fn(...args)` and delay `t`.
3. Capture the timer identifier returned by `setTimeout` in a local variable `timer`.
4. Return a cancel function that calls `clearTimeout(timer)`.
5. Due to closure scope, the cancel function retains access to `timer`.

### Algorithm / Intuition

In `cancellable(fn, args, t)`, calling `setTimeout(() => fn(...args), t)` registers a timer with the browser/Node event loop. The timer ID is stored in the local constant `timer`. The returned anonymous function `() => { clearTimeout(timer); }` captures `timer` in its closure. If the returned function is called before `t` ms elapse, `clearTimeout` removes the pending timer callback from the event loop macrotask queue, preventing `fn` from ever executing.

---

## Dry Run

We trace Example 1 with `fn = (x) => x * 5`, `args = [2]`, `t = 20`, and `cancelTimeMs = 50`:

- `cancellable` is called: `const timer = setTimeout(() => fn(2), 20)` schedules `fn(2)` to run at 20ms.
- `cancellable` returns `cancelFn`.
- At time = 20ms: timer expires; `fn(2)` executes, returning `10`. Result logged: `[{"time": 20, "returned": 10}]`.
- At time = 50ms: test harness invokes `cancelFn()`, which calls `clearTimeout(timer)`.
- Because `fn` has already executed, `clearTimeout` simply cleans up without altering prior execution.
- Final result: `[{"time": 20, "returned": 10}]`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Scheduling the timeout and invoking `clearTimeout` are constant-time operations.
- **Space Complexity:** `O(1)` — Stores a single timer reference in a closure.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2715timeout-cancellation.js](./2715timeout-cancellation.js) |

---

## Key Learnings

- `setTimeout` returns a numeric or object timer identifier that can be cancelled via `clearTimeout`.
- Closures allow returning cleanup/cancellation handles while keeping the timer identifier encapsulated.
- Always spread arguments (`...args`) when forwarding an array of arguments to `fn`.
