---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2621. Sleep

**[View Problem on LeetCode](https://leetcode.com/problems/sleep/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2621` (`2621`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a positive integer `millis`, write an asynchronous function `sleep(millis)` that pauses execution for `millis` milliseconds and then resolves.

The function can resolve with any value. A minor deviation from `millis` in actual elapsed duration is acceptable due to event loop scheduling.

---

## Examples

### Example 1

```text
Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
```

### Example 2

```text
Input: millis = 200
Output: 200
Explanation: It should return a promise that resolves after 200ms.
```

---

## Constraints

- `1 <= millis <= 1000`

---

## Problem Understanding

In JavaScript's asynchronous concurrency model, synchronous blocking (busy waiting) freezes the single thread and blocks all events. We must pause execution non-blockingly for `millis` milliseconds and return a `Promise` that resolves when the time has elapsed. The standard timer mechanism in JavaScript is `setTimeout`.

---

## Approach

### Brute Force Approach

A synchronous busy-wait loop using `Date.now()`: `const end = Date.now() + millis; while (Date.now() < end) {}`. This blocks the JavaScript main thread completely, preventing any other code, user interactions, or I/O events from running. It is a critical anti-pattern in JavaScript and fails asynchronous testing harnesses.

### Optimized Approach

Wrap `setTimeout` inside a new `Promise`: `return new Promise(r => setTimeout(r, millis));`. The `setTimeout` API delegates timer scheduling to the host environment (browser / Node.js runtime). When `millis` milliseconds have passed, the resolve callback `r` is queued onto the event loop, fulfilling the promise without blocking the thread.

### Step-by-Step Thinking Process

1. We need an asynchronous function that delays completion by `millis` milliseconds.
2. `setTimeout(callback, delay)` is the native timer API.
3. To use it in an `async`/`await` or `.then()` context, wrap it in a `Promise`.
4. `new Promise(resolve => setTimeout(resolve, millis))` passes the promise's `resolve` function directly as the callback to `setTimeout`.
5. When the timer expires, `resolve()` is invoked and the promise settles.

### Algorithm / Intuition

The function returns `new Promise(r => setTimeout(r, millis))`. Here, `r` is the executor's resolve function. Passing `r` directly as the first argument to `setTimeout` means that once the host timer reaches `millis`, `r()` is invoked with `undefined`, transitioning the promise from `pending` to `fulfilled`. Because this utilizes the runtime's asynchronous timer queue, the thread is free to process other tasks while waiting.

---

## Dry Run

Trace with Example 1: `millis = 100`.
- `sleep(100)` is called.
- A `Promise` is created in `pending` state.
- `setTimeout(r, 100)` schedules callback `r` to be fired after 100ms.
- The main thread continues running other operations or yields to the event loop.
- At $t \approx 100\text{ms}$, the timer fires, adding `r` to the task queue.
- The event loop executes `r()`, resolving the promise.
- Any `.then()` handler or `await sleep(100)` resumes.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — The JavaScript CPU execution time to create the promise and schedule the timer is constant $O(1)$ (the wall-clock delay is $millis$ ms).
- **Space Complexity:** `O(1)` — Constant memory is required for the Promise and timer closure.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2621sleep.js](./2621sleep.js) |

---

## Key Learnings

- Promisifying `setTimeout` is the canonical idiom for non-blocking asynchronous sleep in JavaScript.
- Never use busy-waiting `while` loops for delays in single-threaded JavaScript runtimes.
- Passing `r` directly to `setTimeout(r, millis)` is cleaner and more concise than wrapping it in an extra arrow function `() => r()`.
