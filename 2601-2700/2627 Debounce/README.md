---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2627. Debounce

**[View Problem on LeetCode](https://leetcode.com/problems/debounce/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2627` (`2627`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a function `fn` and a delay time `t` in milliseconds. The task is to return a **debounced** version of `fn`.

A debounced function delays its execution until `t` milliseconds have elapsed since the last time it was called. If the debounced function is invoked again before the `t` milliseconds window has passed, the previous scheduled execution must be cancelled, and the timer restarts with the newly provided arguments.

The debounced function must correctly forward the invocation context (`this`) and the latest passed arguments to `fn` when the timer finally expires.

---

## Examples

### Example 1

```text
Input:
t = 50
calls = [
  {"t": 50, inputs: [1]},
  {"t": 75, inputs: [2]}
]
Output: [{"t": 125, inputs: [2]}]
Explanation:
let start = Date.now();
function log(...inputs) {
  console.log([Date.now() - start, inputs ])
}
const dlog = debounce(log, 50);
setTimeout(() => dlog(1), 50);
setTimeout(() => dlog(2), 75);

The 1st call is cancelled by the 2nd call because the 2nd call occurred before 100ms
The 2nd call is delayed by 50ms and executed at 125ms. The inputs were (2).
```

### Example 2

```text
Input:
t = 20
calls = [
  {"t": 50, inputs: [1]},
  {"t": 100, inputs: [2]}
]
Output: [{"t": 70, inputs: [1]}, {"t": 120, inputs: [2]}]
Explanation:
The 1st call is delayed until 70ms. The inputs were (1).
The 2nd call is delayed until 120ms. The inputs were (2).
```

### Example 3

```text
Input:
t = 150
calls = [
  {"t": 50, inputs: [1, 2]},
  {"t": 300, inputs: [3, 4]},
  {"t": 300, inputs: [5, 6]}
]
Output: [{"t": 200, inputs: [1,2]}, {"t": 450, inputs: [5, 6]}]
Explanation:
The 1st call is delayed by 150ms and ran at 200ms. The inputs were (1, 2).
The 2nd call is cancelled by the 3rd call
The 3rd call is delayed by 150ms and ran at 450ms. The inputs were (5, 6).
```

---

## Constraints

- `0 <= t <= 1000`

- `1 <= calls.length <= 10`

- `0 <= calls[i].t <= 1000`

- `0 <= calls[i].inputs.length <= 10`

---

## Problem Understanding

Debouncing is a classic asynchronous design pattern used to throttle rapid, repeated event triggers (such as search input keystrokes, window resizing, or scroll events) so that the expensive callback executes only once after activity has settled.

Key requirements and invariants:
- Every time the returned debounced function is invoked, any pending execution represented by an active timer must be cleared immediately.
- A new timer for `t` milliseconds is initiated.
- When the timer elapses without interruptions, `fn` is invoked with the exact arguments and context from the most recent call.
- If multiple calls occur within `t` ms of each other, only the last one takes effect; all preceding calls are discarded.

---

## Approach

### Brute Force Approach

A naive or unmanaged approach would be to log timestamps manually in an array, periodically polling or computing elapsed time differences via `setInterval` or synchronous busy-wait loops.

Synchronous busy-waiting blocks JavaScript's single-threaded event loop, freezing UI interactions and delaying promises. Polling with intervals introduces unnecessary CPU overhead and timing inaccuracies compared to the native browser/Node.js `setTimeout` and `clearTimeout` timer APIs.

### Optimized Approach

The standard and optimal approach uses a closure over a `timeout` identifier variable combined with `clearTimeout` and `setTimeout`.

Each call to the wrapper function checks whether `timeout` is defined. If so, it cancels the pending timer using `clearTimeout(timeout)`. It then schedules a new `setTimeout` that will invoke `fn.apply(this, args)` after `t` milliseconds, saving the new timer ID back into `timeout`.

### Step-by-Step Thinking Process

1. We need a function that wraps `fn` and delays execution by `t` ms while cancelling any previously scheduled calls if invoked again in the meantime.
2. To track scheduled calls across separate invocations of the returned wrapper, we need a persistent reference to the active timer ID using closure scope (`let timeout`).
3. Inside the returned wrapper function `function(...args)`, we check if `timeout !== undefined`. If true, an existing timer is running and must be cancelled via `clearTimeout(timeout)`.
4. We schedule a new timer using `setTimeout` set to expire in `t` ms. Inside the callback, we execute `fn.apply(this, args)` so that `fn` receives both the dynamic `this` context and the latest arguments.
5. We assign the return value of `setTimeout` to `timeout` so subsequent calls can cancel it if necessary.

### Algorithm / Intuition

The solution leverages lexical closure in JavaScript:

1. When `debounce(fn, t)` is called, a local variable `timeout` is declared in the outer scope.
2. The returned wrapper function captures `timeout` in its closure.
3. Upon invocation with `...args`, `if (timeout !== undefined) clearTimeout(timeout);` cancels any pending timer.
4. A new timer is registered via `setTimeout(() => { fn.apply(this, args); }, t)`. Notice that using an arrow function preserves lexical `this` pointing to the execution context of the wrapper call, and `fn.apply(this, args)` executes `fn` with that context and the captured arguments.
5. If no other call arrives within `t` milliseconds, the event loop runs the timer callback, executing `fn`.

---

## Dry Run

Trace for `t = 50`, `calls = [{"t": 50, inputs: [1]}, {"t": 75, inputs: [2]}]`:

- **Initial State:** `timeout = undefined`.
- **At t = 50ms:** First call `dlog(1)` is invoked.
  - `timeout !== undefined` is `false` (it is `undefined`).
  - `timeout = setTimeout(..., 50)` is scheduled to run at timestamp `50 + 50 = 100ms` with args `[1]`.
- **At t = 75ms:** Second call `dlog(2)` is invoked.
  - `timeout !== undefined` is `true`.
  - `clearTimeout(timeout)` cancels the timer scheduled for `100ms`. First call is discarded.
  - A new `timeout = setTimeout(..., 50)` is scheduled to execute at `75 + 50 = 125ms` with args `[2]`.
- **At t = 125ms:** No further calls arrived. The timer fires and executes `fn(2)`.
- **Output:** `[{"t": 125, inputs: [2]}]`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Each invocation of the debounced wrapper function performs constant-time operations: clearing the existing timer identifier and scheduling a new timer in the host environment's event loop.
- **Space Complexity:** `O(1)` — Only a single closure variable `timeout` is maintained across calls, requiring constant auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2627debounce.js](./2627debounce.js) |

---

## Key Learnings

- Closures in JavaScript allow inner wrapper functions to retain and mutate state (`timeout`) across multiple asynchronous invocations.
- `clearTimeout` safely cancels an active host timer before it can execute, forming the foundation of debounce mechanics.
- Using `fn.apply(this, args)` within an arrow function callback properly preserves the caller's context and dynamic argument list.
