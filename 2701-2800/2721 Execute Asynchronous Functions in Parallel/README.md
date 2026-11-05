---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2721. Execute Asynchronous Functions in Parallel

**[View Problem on LeetCode](https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2721` (`2721`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are tasked with implementing a function `promiseAll(functions)` that behaves like `Promise.all` without using the built-in `Promise.all` method.

The function receives an array of zero-argument asynchronous functions, each returning a promise. All promises should be executed in parallel.

The returned promise must:
- Resolve with an array of resolved values in the exact same order as `functions` once all promises have resolved successfully.
- Reject immediately if any of the promises rejects, passing the error/reason of the first rejection.

---

## Examples

### Example 1

```text
Input: functions = [
  () => new Promise(resolve => setTimeout(() => resolve(5), 200))
]
Output: {"t": 200, "resolved": [5]}
Explanation:
promiseAll(functions).then(console.log); // [5]

The single function was resolved at 200ms with a value of 5.
```

### Example 2

```text
Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
]
Output: {"t": 100, "rejected": "Error"}
Explanation: Since one of the promises rejected, the returned promise also rejected with the same error at the same time.
```

### Example 3

```text
Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
    () => new Promise(resolve => setTimeout(() => resolve(16), 100))
]
Output: {"t": 150, "resolved": [4, 10, 16]}
Explanation: All the promises resolved with a value. The returned promise resolved when the last promise resolved.
```

---

## Constraints

- `functions` is an array of functions that returns promises

- `1 <= functions.length <= 10`

---

## Problem Understanding

Key requirements and nuances:
- All functions must be triggered immediately in parallel, NOT sequentially.
- Promises may resolve at different times; their results must be placed into their original index positions, NOT arrival order.
- We cannot simply check `ans.length === functions.length` because assigning `ans[i] = res` where `i > 0` extends array length with empty slots. We must track an explicit completed count `cnt`.
- As soon as any promise rejects, the returned promise must reject immediately without waiting for others.

---

## Approach

### Brute Force Approach

A naive attempt might use `async/await` in a sequential `for...of` loop: `for (const f of functions) ans.push(await f())`. This runs promises sequentially rather than concurrently, destroying parallelism and taking the sum of all durations rather than the maximum.

### Optimized Approach

The solution constructs and returns a `new Promise((resolve, reject) => { ... })`:
1. Allocate an array `ans = new Array(functions.length)` and maintain integer `cnt = 0`.
2. Loop through `functions` by index `i` and execute `f = functions[i]()`.
3. Attach `.then(res => { ans[i] = res; cnt++; if (cnt === functions.length) resolve(ans); })` to store results at their correct index.
4. Attach `.catch(err => { reject(err); })` to trigger immediate rejection upon the first failure.

### Step-by-Step Thinking Process

1. Wrap execution inside a `new Promise((resolve, reject) => ...)` executor.
2. Keep an array `ans` of length `functions.length` to hold results in positional order.
3. Use a counter `cnt` initialized to 0 to track successfully resolved promises.
4. Iterate through `functions` with a standard `for` loop so index `i` is captured in closure scope.
5. Call `f()` immediately for each function to start them in parallel.
6. On resolution of promise `i`, set `ans[i] = res` and increment `cnt`. If `cnt === functions.length`, call `resolve(ans)`.
7. On rejection of any promise, immediately call `reject(err)`.

### Algorithm / Intuition

Inside `promiseAll`, `cnt` counts resolved promises, while `ans` preserves order. The `for` loop invokes each `f()` synchronously, initiating all asynchronous tasks concurrently. When promise `i` resolves, its value is placed specifically at `ans[i]`, and `cnt++` occurs. Checking `cnt === functions.length` ensures that we only resolve when every single promise has finished. If any promise rejects, `.catch(err => reject(err))` triggers the executor's `reject`, which automatically transitions the returned promise to rejected and ignores subsequent resolutions or rejections.

---

## Dry Run

We trace Example 1 with `functions = [ () => new Promise(res => setTimeout(() => res(5), 200)) ]`:

- `functions.length = 1`. `ans = new Array(1)`, `cnt = 0`.
- Loop `i = 0`: `f = functions[0]`, invokes `f()`.
- At time = 200ms: promise resolves with `5`.
- `.then` callback executes: `ans[0] = 5`, `cnt++` -> `cnt = 1`.
- Check `cnt === functions.length` (`1 === 1`) is `true`.
- Calls `resolve(ans)` with `[5]`.
- Returned promise resolves with `[5]` at 200ms.

---

## Complexity Analysis

- **Time Complexity:** `O(max(T_i))` where $T_i$ is the execution time of function $i$, because all promises run concurrently in parallel. Iterating and dispatching takes `O(N)` CPU time where `N = functions.length`.
- **Space Complexity:** `O(N)` to store the results array `ans` where `N` is `functions.length`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2721execute-asynchronous-functions-in-parallel.js](./2721execute-asynchronous-functions-in-parallel.js) |

---

## Key Learnings

- Parallel promise execution requires invoking functions immediately rather than awaiting them sequentially.
- Array index assignment `ans[i] = val` preserves original ordering regardless of when individual promises settle.
- A separate counter `cnt` is required because `ans[lastIndex] = val` artificially inflates `ans.length` before earlier indices finish.
