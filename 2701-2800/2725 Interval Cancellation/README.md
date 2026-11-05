---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2725. Interval Cancellation

**[View Problem on LeetCode](https://leetcode.com/problems/interval-cancellation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2725` (`2725`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are asked to implement a function `cancellable(fn, args, t)` that executes a given function `fn` with arguments `args` immediately, and then continues to repeatedly execute it at fixed intervals of `t` milliseconds.

The function must return a cancellation function, `cancelFn`. When `cancelFn` is invoked at some time `cancelTimeMs`, it must stop all future periodic executions of `fn` immediately.

The function should ensure the very first invocation occurs at time `0` ms (synchronously upon calling `cancellable`), and subsequent invocations occur at times `t`, `2t`, `3t`, etc., until cancelled.

---

## Examples

### Example 1

```text
Input: fn = (x) => x * 2, args = [4], t = 35
Output:
[
   {"time": 0, "returned": 8},
   {"time": 35, "returned": 8},
   {"time": 70, "returned": 8},
   {"time": 105, "returned": 8},
   {"time": 140, "returned": 8},
   {"time": 175, "returned": 8}
]
Explanation:
const cancelTimeMs = 190;
const cancelFn = cancellable((x) => x * 2, [4], 35);
setTimeout(cancelFn, cancelTimeMs);

Every 35ms, fn(4) is called. Until t=190ms, then it is cancelled.
1st fn call is at 0ms. fn(4) returns 8.
2nd fn call is at 35ms. fn(4) returns 8.
3rd fn call is at 70ms. fn(4) returns 8.
4th fn call is at 105ms. fn(4) returns 8.
5th fn call is at 140ms. fn(4) returns 8.
6th fn call is at 175ms. fn(4) returns 8.
Cancelled at 190ms
```

### Example 2

```text
Input: fn = (x1, x2) => (x1 * x2), args = [2, 5], t = 30
Output:
[
   {"time": 0, "returned": 10},
   {"time": 30, "returned": 10},
   {"time": 60, "returned": 10},
   {"time": 90, "returned": 10},
   {"time": 120, "returned": 10},
   {"time": 150, "returned": 10}
]
Explanation:
const cancelTimeMs = 165;
const cancelFn = cancellable((x1, x2) => (x1 * x2), [2, 5], 30)
setTimeout(cancelFn, cancelTimeMs)

Every 30ms, fn(2, 5) is called. Until t=165ms, then it is cancelled.
1st fn call is at 0ms
2nd fn call is at 30ms
3rd fn call is at 60ms
4th fn call is at 90ms
5th fn call is at 120ms
6th fn call is at 150ms
Cancelled at 165ms
```

### Example 3

```text
Input: fn = (x1, x2, x3) => (x1 + x2 + x3), args = [5, 1, 3], t = 50
Output:
[
   {"time": 0, "returned": 9},
   {"time": 50, "returned": 9},
   {"time": 100, "returned": 9},
   {"time": 150, "returned": 9}
]
Explanation:
const cancelTimeMs = 180;
const cancelFn = cancellable((x1, x2, x3) => (x1 + x2 + x3), [5, 1, 3], 50)
setTimeout(cancelFn, cancelTimeMs)

Every 50ms, fn(5, 1, 3) is called. Until t=180ms, then it is cancelled.
1st fn call is at 0ms
2nd fn call is at 50ms
3rd fn call is at 100ms
4th fn call is at 150ms
Cancelled at 180ms
```

---

## Constraints

- `fn` is a function

- `args` is a valid JSON array

- `1 <= args.length <= 10`

- `30 <= t <= 100`

- `10 <= cancelTimeMs <= 500`

---

## Problem Understanding

Key details and constraints:
- First execution of `fn(...args)` must occur immediately at time $0$ ms.
- Subsequent executions must be spaced exactly `t` milliseconds apart.
- The cancellation function clears the interval timer using `clearInterval`.
- `cancelTimeMs` defines when `cancelFn` is triggered. Any tick at or after `cancelTimeMs` must not run.
- `setInterval` schedules recurring tasks, returning an interval ID suitable for `clearInterval`.

---

## Approach

### Brute Force Approach

A manual approach without `setInterval` might use recursive `setTimeout` chaining: scheduling each subsequent call inside the completion of the previous one while checking a boolean `isCancelled` flag. While workable, native `setInterval` is the idiomatic and most direct browser/Node API designed specifically for recurring timer tasks.

### Optimized Approach

The solution uses JavaScript's built-in `setInterval` and `clearInterval`:
1. Immediately call `fn(...args)` once synchronously.
2. Set up recurring timer: `const time = setInterval(() => fn(...args), t);`
3. Return a closure `() => clearInterval(time)` that cancels the recurring timer when invoked.

### Step-by-Step Thinking Process

1. Requirement specifies that `fn` must be invoked immediately at $t = 0$. Call `fn(...args)` before setting up any timer.
2. Recurring periodic execution every `t` ms is directly provided by `setInterval(() => fn(...args), t)`.
3. Store the timer ID returned by `setInterval` in a local variable `time`.
4. Return an anonymous function `() => clearInterval(time)` that captures `time` in closure.
5. When the returned cancel function is called, `clearInterval(time)` clears the repeating timer from the event loop.

### Algorithm / Intuition

The function starts by immediately executing `fn(...args)` synchronously so that the $t = 0$ execution is recorded. It then registers a recurring timer with `const time = setInterval(() => fn(...args), t);`. The JavaScript runtime will queue invocations of `fn(...args)` every `t` milliseconds. The closure `() => clearInterval(time)` holds a reference to `time`. When the caller or test runner invokes this returned cancellation function, `clearInterval(time)` halts further scheduled executions.

---

## Dry Run

We trace Example 1 with `fn = (x) => x * 2`, `args = [4]`, `t = 35`, and `cancelTimeMs = 190`:

- Time 0ms: `fn(...args)` is called synchronously with `4`. Returns `8`. Recorded at 0ms.
- `const time = setInterval(...)` starts with period 35ms.
- Time 35ms: Interval fires, calls `fn(4)` -> returns `8`.
- Time 70ms: Interval fires, calls `fn(4)` -> returns `8`.
- Time 105ms: Interval fires, calls `fn(4)` -> returns `8`.
- Time 140ms: Interval fires, calls `fn(4)` -> returns `8`.
- Time 175ms: Interval fires, calls `fn(4)` -> returns `8`.
- Time 190ms: `cancelFn` is invoked by the harness, executing `clearInterval(time)`.
- Time 210ms (and beyond): No further calls occur.
- Total returned calls: 6 calls at times 0, 35, 70, 105, 140, 175.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` setup time — Executing `fn` once and scheduling `setInterval` run in constant time.
- **Space Complexity:** `O(1)` — Retains only a single interval identifier inside the closure.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2725interval-cancellation.js](./2725interval-cancellation.js) |

---

## Key Learnings

- `setInterval` does NOT fire immediately on creation; it waits for the first interval `t` to elapse. Calling `fn(...args)` beforehand satisfies the 0ms execution requirement.
- `clearInterval(id)` cancels pending intervals registered by `setInterval(..., t)`.
- Closures encapsulate timer IDs cleanly without polluting global or parent scopes.
