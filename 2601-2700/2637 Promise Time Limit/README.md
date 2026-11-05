---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2637. Promise Time Limit

**[View Problem on LeetCode](https://leetcode.com/problems/promise-time-limit/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2637` (`2637`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an asynchronous function `fn` and a time limit `t` in milliseconds, return a new **time limited** version of `fn`.

The returned function accepts the same arguments as `fn` and follows these rules:
- If `fn` completes (resolves or rejects) within `t` milliseconds, the time-limited function resolves with the resolved value or rejects with `fn`'s rejection reason.
- If the execution of `fn` exceeds `t` milliseconds without settling, the time-limited function rejects with the exact string `"Time Limit Exceeded"`.

---

## Examples

### Example 1

```text
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
const limited = timeLimit(fn, t)
const start = performance.now()
let result;
try {
   const res = await limited(...inputs)
   result = {"resolved": res, "time": Math.floor(performance.now() - start)};
} catch (err) {
   result = {"rejected": err, "time": Math.floor(performance.now() - start)};
}
console.log(result) // Output

The provided function is set to resolve after 100ms. However, the time limit is set to 50ms. It rejects at t=50ms because the time limit was reached.
```

### Example 2

```text
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 150
Output: {"resolved":25,"time":100}
Explanation:
The function resolved 5 * 5 = 25 at t=100ms. The time limit is never reached.
```

### Example 3

```text
Input:
fn = async (a, b) => {
  await new Promise(res => setTimeout(res, 120));
  return a + b;
}
inputs = [5,10]
t = 150
Output: {"resolved":15,"time":120}
Explanation:
​​​​The function resolved 5 + 10 = 15 at t=120ms. The time limit is never reached.
```

### Example 4

```text
Input:
fn = async () => {
  throw "Error";
}
inputs = []
t = 1000
Output: {"rejected":"Error","time":0}
Explanation:
The function immediately throws an error.
```

---

## Constraints

- `0 <= inputs.length <= 10`

- `0 <= t <= 1000`

- `fn` returns a promise

---

## Problem Understanding

This problem models a timeout pattern for asynchronous operations.

Key considerations:
- Two concurrent processes are racing: the execution of `fn(...args)` and a timeout countdown of `t` milliseconds.
- Whichever completes first dictates the settlement of the returned promise.
- If `fn` resolves at or before `t` ms, its result must be returned.
- If `fn` takes strictly longer than `t` ms, the timeout fires first and rejects with `"Time Limit Exceeded"`.
- JavaScript's `Promise.race` provides the exact competitive settlement semantics required.

---

## Approach

### Brute Force Approach

A manual approach would involve creating a new `Promise((resolve, reject) => ...)` with manual flags like `let settled = false` and calling `setTimeout`.

While functional, manually coordinating settlement flags and error handling across multiple promise callbacks is verbose and error-prone compared to native concurrency primitives like `Promise.race`.

### Optimized Approach

The elegant and optimal approach uses `Promise.race` inside an async wrapper function.

`Promise.race` takes an iterable of promises and settles as soon as the first promise settles. We race `fn(...args)` against a timeout promise: `new Promise((_, reject) => setTimeout(() => reject('Time Limit Exceeded'), t))`.

If `fn` finishes before `t` ms, its settlement wins the race. If `t` ms elapse first, the timeout promise rejects with `'Time Limit Exceeded'`.

### Step-by-Step Thinking Process

1. We need to enforce a maximum execution time of `t` ms on an async function `fn`.
2. We can wrap `fn(...args)` in a promise and concurrently start a timer.
3. JavaScript's built-in `Promise.race([promiseA, promiseB])` resolves or rejects as soon as the fastest promise settles.
4. The first promise in the race is `fn(...args)`.
5. The second promise is a timer promise created via `new Promise((_, reject) => setTimeout(() => reject('Time Limit Exceeded'), t))`.
6. If `fn(...args)` finishes first, its result or error is returned. If `t` ms pass first, the timer rejects with `'Time Limit Exceeded'`.

### Algorithm / Intuition

The solution uses competitive asynchronous settlement via `Promise.race`:

1. When the wrapped async function is called with `...args`, it starts both `fn(...args)` and a rejection timer simultaneously.
2. `Promise.race` listens to both promises.
3. If `fn(...args)` resolves before `t` ms, `Promise.race` immediately resolves with that value.
4. If `fn(...args)` rejects before `t` ms, `Promise.race` rejects with that error.
5. If `t` ms pass before `fn(...args)` settles, the `setTimeout` callback triggers `reject('Time Limit Exceeded')`, causing `Promise.race` to reject.

---

## Dry Run

Trace for `fn = async (n) => { await sleep(100); return n * n; }`, `inputs = [5]`, `t = 50`:

- `timeLimit(fn, 50)` is invoked with arguments `[5]`.
- `Promise.race` is initiated with two promises:
  - Promise 1: `fn(5)`, which will resolve to `25` after 100ms.
  - Promise 2: Timer promise that calls `reject('Time Limit Exceeded')` after 50ms.
- **At t = 50ms:** The timer in Promise 2 expires first and calls `reject('Time Limit Exceeded')`.
- `Promise.race` immediately settles and rejects with `'Time Limit Exceeded'`.
- **At t = 100ms:** `fn(5)` finishes in the background, but `Promise.race` has already settled; its outcome is ignored.
- Result: Rejected with `"Time Limit Exceeded"`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` overhead — Setting up `Promise.race` and the `setTimeout` timer takes constant time. The wall-clock execution time is bounded by `min(runtime(fn), t)`.
- **Space Complexity:** `O(1)` — Constant extra memory for creating the two promise objects and timer callback in the JavaScript event loop.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2637promise-time-limit.js](./2637promise-time-limit.js) |

---

## Key Learnings

- `Promise.race` resolves or rejects as soon as any promise in the provided iterable settles.
- A timeout rejection pattern is cleanly implemented by racing the target async task against a `setTimeout` rejection promise.
- Promises settle at most once; subsequent resolutions or rejections are safely ignored by the runtime.
