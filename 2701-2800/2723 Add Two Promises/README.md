---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2723. Add Two Promises

**[View Problem on LeetCode](https://leetcode.com/problems/add-two-promises/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2723` (`2723`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are given two promises, `promise1` and `promise2`. Both promises are guaranteed to resolve with a numeric value.

We need to return a new promise that resolves with the mathematical sum of the two resolved numbers.

The timing of resolution is not judged, but both promises must resolve before the final sum can be computed and returned.

---

## Examples

### Example 1

```text
Input:
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
Output: 7
Explanation: The two input promises resolve with the values of 2 and 5 respectively. The returned promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not judged for this problem.
```

### Example 2

```text
Input:
promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)),
promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
Output: -2
Explanation: The two input promises resolve with the values of 10 and -12 respectively. The returned promise should resolve with a value of 10 + -12 = -2.
```

---

## Constraints

- `promise1` and `promise2` are promises that resolve with a number

---

## Problem Understanding

Key considerations:
- Both promises resolve to numbers (positive, negative, or zero).
- An `async` function automatically wraps any returned value in a resolving Promise.
- We can await both promises and add their values together: `(await promise1) + (await promise2)`.

---

## Approach

### Brute Force Approach

A more verbose approach without `async/await` chains `.then` handlers: `return promise1.then(val1 => promise2.then(val2 => val1 + val2));` or `return Promise.all([promise1, promise2]).then(([a, b]) => a + b);`. While both are valid, nested `.then` callbacks introduce unnecessary nesting compared to `async/await`.

### Optimized Approach

The solution declares `addTwoPromises` as an `async` function:
```javascript
var addTwoPromises = async function (promise1, promise2) {
    return (await promise1) + (await promise2);
};
```
The `await` expressions pause until `promise1` and `promise2` resolve, retrieve their numeric values, add them, and return the sum.

### Step-by-Step Thinking Process

1. Understand that the output must be a Promise resolving to `val1 + val2`.
2. Declaring the function with the `async` keyword ensures its return value is automatically wrapped in a Promise.
3. Use `await promise1` to extract the resolved value of the first promise.
4. Use `await promise2` to extract the resolved value of the second promise.
5. Return the sum `(await promise1) + (await promise2)`.

### Algorithm / Intuition

When `addTwoPromises(promise1, promise2)` is invoked, it begins executing as an async coroutine. `await promise1` pauses execution until `promise1` settles with a number `val1`. Then `await promise2` pauses until `promise2` settles with `val2`. The sum `val1 + val2` is calculated, and returning it from an async function immediately fulfills the outer Promise with that sum value.

---

## Dry Run

We trace Example 1 with `promise1` resolving to 2 (after 20ms) and `promise2` resolving to 5 (after 60ms):

- `addTwoPromises` starts. Evaluates `await promise1`.
- At time = 20ms: `promise1` resolves with 2. First term evaluates to `2`.
- Evaluates `await promise2`.
- At time = 60ms: `promise2` resolves with 5. Second term evaluates to `5`.
- The expression calculates `2 + 5 = 7`.
- The async function resolves with `7`.

---

## Complexity Analysis

- **Time Complexity:** `O(max(t1, t2))` where `t1` and `t2` are the settlement times of the two promises. CPU computation time is `O(1)`.
- **Space Complexity:** `O(1)` — Only constant extra space is used for the resolved numeric values.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2723add-two-promises.js](./2723add-two-promises.js) |

---

## Key Learnings

- `async` functions return a Promise that resolves with whatever value is returned from the function body.
- `await` unwraps the resolved value of a Promise synchronously within an async execution context.
- Using `(await p1) + (await p2)` is the cleanest syntax for aggregating results from multiple promises.
