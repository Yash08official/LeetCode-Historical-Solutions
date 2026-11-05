---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2635. Apply Transform Over Each Element in Array

**[View Problem on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2635` (`2635`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `arr` and a transformation function `fn`, return a new array with the transformation applied to each element.

The returned array must satisfy `returnedArray[i] = fn(arr[i], i)` for every index `i` from `0` to `arr.length - 1`.

The problem explicitly requires solving it without using the built-in `Array.prototype.map` method.

---

## Examples

### Example 1

```text
Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
Output: [2,3,4]
Explanation:
const newArray = map(arr, plusone); // [2,3,4]
The function increases each value in the array by one.
```

### Example 2

```text
Input: arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
Output: [1,3,5]
Explanation: The function increases each value by the index it resides in.
```

### Example 3

```text
Input: arr = [10,20,30], fn = function constant() { return 42; }
Output: [42,42,42]
Explanation: The function always returns 42.
```

---

## Constraints

- `0 <= arr.length <= 1000`

- `-10^9 <= arr[i] <= 10^9`

- `fn` returns an integer.

---

## Problem Understanding

We need to implement the core transformation functionality of JavaScript's `map` method.

Key requirements:
- The input array `arr` should not be modified.
- The output array `newArray` must have the exact same length as `arr`.
- For each element at index `i`, `fn` is passed two arguments: the value `arr[i]` and the index `i`.
- The returned array contains the transformed results in matching positions.

---

## Approach

### Brute Force Approach

Because every element must be transformed, any correct solution must visit all `n` elements at least once, taking `O(n)` time.

A naive attempt might mutate the input array `arr[i] = fn(arr[i], i)` in-place to avoid allocating new memory. However, mutating input arguments violates pure function design and could cause unexpected side effects in calling code.

### Optimized Approach

The optimal approach initializes an empty array `newArray = []` and iterates through `arr` with a `for` loop.

At each index `i`, it calls `fn(arr[i], i)` and pushes the result into `newArray`. After completing the iteration, `newArray` is returned.

### Step-by-Step Thinking Process

1. We need to build a new array where each element is the result of `fn(arr[i], i)` without calling built-in `arr.map()`.
2. Initialize `let newArray = []`.
3. Loop through `arr` from `i = 0` to `arr.length - 1`.
4. Invoke `fn(arr[i], i)` and append the result to `newArray` via `newArray.push(...)`.
5. Return `newArray`.

### Algorithm / Intuition

The algorithm implements the standard sequential map transformation:

1. An empty array `newArray` is created to collect transformed values.
2. A standard `for` loop processes each element in increasing order of index `i`.
3. Calling `fn(arr[i], i)` passes both the element value and its index.
4. `.push()` appends each computed value into `newArray` in `O(1)` amortized time.
5. After `n` iterations, `newArray` contains all transformed elements in their corresponding positions.

---

## Dry Run

Trace for `arr = [1, 2, 3]`, `fn = (n) => n + 1`:

- **Initial:** `newArray = []`.
- **i = 0:** `arr[0] = 1`. `fn(1, 0) = 1 + 1 = 2`. `newArray.push(2)` -> `newArray = [2]`.
- **i = 1:** `arr[1] = 2`. `fn(2, 1) = 2 + 1 = 3`. `newArray.push(3)` -> `newArray = [2, 3]`.
- **i = 2:** `arr[2] = 3`. `fn(3, 2) = 3 + 1 = 4`. `newArray.push(4)` -> `newArray = [2, 3, 4]`.
- **Return:** `[2, 3, 4]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Where `n` is `arr.length`. We loop through the array once and perform an `O(1)` function call per element.
- **Space Complexity:** `O(n)` — Allocating the output array `newArray` of length `n`. Auxiliary space beyond the returned array is `O(1)`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2635apply-transform-over-each-element-in-array.js](./2635apply-transform-over-each-element-in-array.js) |

---

## Key Learnings

- Custom map transformations can be implemented cleanly with standard iteration and dynamic array growth.
- Always pass both element value and index `(arr[i], i)` to match functional array callback conventions.
- Creating a new output array preserves input immutability.
