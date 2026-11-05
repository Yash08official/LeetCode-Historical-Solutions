---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2634. Filter Elements from Array

**[View Problem on LeetCode](https://leetcode.com/problems/filter-elements-from-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2634` (`2634`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `arr` and a filtering function `fn`, return a new filtered array `filteredArr` containing only the elements for which `fn(arr[i], i)` evaluates to a truthy value.

The function `fn` accepts two arguments:
- `arr[i]` — the element value
- `i` — the index of the element in `arr`

The solution must be implemented without using the built-in `Array.prototype.filter` method.

---

## Examples

### Example 1

```text
Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
Output: [20,30]
Explanation:
const newArray = filter(arr, fn); // [20, 30]
The function filters out values that are not greater than 10
```

### Example 2

```text
Input: arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
Output: [1]
Explanation:
fn can also accept the index of each element
In this case, the function removes elements not at index 0
```

### Example 3

```text
Input: arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }
Output: [-2,0,1,2]
Explanation:
Falsey values such as 0 should be filtered out
```

---

## Constraints

- `0 <= arr.length <= 1000`

- `-10^9 <= arr[i] <= 10^9`

---

## Problem Understanding

This problem asks us to implement the core logic of `filter` from scratch.

Key considerations:
- JavaScript truthiness: any value that is not falsy (`false`, `0`, `""`, `null`, `undefined`, `NaN`) is truthy. In `if (fn(arr[i], i))`, JavaScript handles truthiness checks automatically.
- Order must be preserved: elements that pass the filter must appear in `filteredArr` in the same order as in `arr`.
- The original array `arr` must remain unmodified.

---

## Approach

### Brute Force Approach

Because filtering requires examining every element at least once to determine if it meets the predicate condition, any valid algorithm must inspect all `n` elements.

A naive variation might repeatedly delete unwanted elements in-place using `arr.splice(i, 1)`. However, `splice` shifts all subsequent elements to the left, taking `O(n)` time per deletion, resulting in an unacceptable `O(n^2)` overall runtime.

### Optimized Approach

The optimal approach allocates a new array `output = []` and iterates through `arr` using a standard `for` loop from `i = 0` to `arr.length - 1`.

At each index `i`, it calls `fn(arr[i], i)`. If the return value is truthy, `arr[i]` is appended to `output` via `output.push(arr[i])`. After the loop terminates, `output` is returned.

### Step-by-Step Thinking Process

1. We must recreate the behavior of `Array.prototype.filter` manually.
2. Initialize an empty array `let output = []`.
3. Iterate through `arr` using an index loop `for (let i = 0; i < arr.length; i++)`.
4. For each element, evaluate `fn(arr[i], i)`.
5. If the condition evaluates to truthy, append `arr[i]` to `output` using `output.push(arr[i])`.
6. Return `output` after inspecting all elements.

### Algorithm / Intuition

The algorithm follows a straightforward linear scan filter pattern:

1. `let output = []` serves as the destination buffer.
2. Iterating with `i` from `0` to `arr.length - 1` visits elements sequentially.
3. Calling `fn(arr[i], i)` passes both the current element value and its 0-based index.
4. JavaScript's `if (expression)` construct natively evaluates truthy/falsy semantics.
5. Appending matching elements with `.push()` maintains original relative order.
6. Returns `output` containing only elements that satisfied the predicate.

---

## Dry Run

Trace for `arr = [0, 10, 20, 30]`, `fn = (n) => n > 10`:

- **Initial:** `output = []`.
- **i = 0:** `arr[0] = 0`. `fn(0, 0)` evaluates to `0 > 10` -> `false`. Do not push.
- **i = 1:** `arr[1] = 10`. `fn(10, 1)` evaluates to `10 > 10` -> `false`. Do not push.
- **i = 2:** `arr[2] = 20`. `fn(20, 2)` evaluates to `20 > 10` -> `true`. `output.push(20)` -> `output = [20]`.
- **i = 3:** `arr[3] = 30`. `fn(30, 3)` evaluates to `30 > 10` -> `true`. `output.push(30)` -> `output = [20, 30]`.
- **Return:** `[20, 30]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Where `n` is `arr.length`. The loop executes exactly `n` iterations, invoking `fn` once per element in `O(1)` time.
- **Space Complexity:** `O(n)` — In the worst case where all elements pass the predicate, `output` stores `n` elements. Auxiliary space excluding the output array is `O(1)`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2634filter-elements-from-array.js](./2634filter-elements-from-array.js) |

---

## Key Learnings

- Custom array utilities can be implemented directly using basic `for` loops without relying on built-in prototypes.
- JavaScript truthiness allows clean condition checks directly within `if (fn(val, idx))` statements.
- Iterating sequentially and pushing matching items guarantees stability (preserves original order) in `O(n)` time.
