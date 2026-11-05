---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2695. Array Wrapper

**[View Problem on LeetCode](https://leetcode.com/problems/array-wrapper/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2695` (`2695`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Create a class `ArrayWrapper` that accepts an array of integers in its constructor and supports two key features:

- When two instances of `ArrayWrapper` are added together with the `+` operator, the result must be the sum of all elements in both arrays: `obj1 + obj2`.
- When the `String()` function is called on an instance (or string concatenation/template literals are used), it must return a comma-separated string enclosed in brackets: `"[1,2,3]"`.

---

## Examples

### Example 1

```text
Input: nums = [[1,2],[3,4]], operation = "Add"
Output: 10
Explanation:
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
```

### Example 2

```text
Input: nums = [[23,98,42,70]], operation = "String"
Output: "[23,98,42,70]"
Explanation:
const obj = new ArrayWrapper([23,98,42,70]);
String(obj); // "[23,98,42,70]"
```

### Example 3

```text
Input: nums = [[],[]], operation = "Add"
Output: 0
Explanation:
const obj1 = new ArrayWrapper([]);
const obj2 = new ArrayWrapper([]);
obj1 + obj2; // 0
```

---

## Constraints

- `0 <= nums.length <= 1000`

- `0 <= nums[i] <= 1000`

- `Note: nums is the array passed to the constructor`

---

## Problem Understanding

This problem tests JavaScript object-to-primitive type coercion mechanics.

Key JavaScript coercion rules:
- When the binary `+` operator is used with objects, JavaScript converts them to primitives by calling `valueOf()` first.
- If `valueOf()` returns a primitive number, JavaScript adds the numbers numerically.
- When converting an object to a string (such as `String(obj)` or template literals), JavaScript calls `toString()`.
- Therefore, defining `valueOf()` to return the sum of elements and `toString()` to return the bracketed string representation completely satisfies the requirements.

---

## Approach

### Brute Force Approach

A naive approach could recalculate the sum on every call to `valueOf()` by invoking `this.nums.reduce(...)` each time.

While functionally correct, repeatedly summing an array of length up to `1000` on every addition operation takes `O(n)` per operation. Precomputing the sum once in the constructor allows `valueOf()` to respond in `O(1)` time.

### Optimized Approach

The implemented solution precomputes the sum in the constructor:

1. In `ArrayWrapper(nums)`:
   - Stores `this.nums = nums`.
   - Computes and caches `this.s = nums.reduce((a, b) => a + b, 0)`.
2. Defines prototype methods:
   - `ArrayWrapper.prototype.valueOf = function() { return this.s; }`
   - `ArrayWrapper.prototype.toString = function() { return `[${this.nums}]`; }`

### Step-by-Step Thinking Process

1. We need an object wrapper around an array of numbers that overrides addition and string conversion.
2. The `+` operator triggers `valueOf()` on objects.
3. String conversion triggers `toString()` on objects.
4. In constructor `ArrayWrapper(nums)`, store `this.nums = nums` and precompute the sum `this.s = nums.reduce((a, b) => a + b, 0)`.
5. In `valueOf()`, return the precomputed sum `this.s`.
6. In `toString()`, return the bracketed array string `[${this.nums}]` (which implicitly calls `nums.join(',')`).

### Algorithm / Intuition

The solution hooks into JavaScript's internal `ToPrimitive` conversion protocol:

1. **Numeric coercion (`valueOf`):** When evaluating `obj1 + obj2`, the JavaScript runtime invokes `obj1.valueOf()` and `obj2.valueOf()`. Since both return numbers (`this.s`), numeric addition is executed.
2. **String coercion (`toString`):** When evaluating `String(obj)` or `"" + obj` in a string context, JavaScript invokes `obj.toString()`. Template literal interpolation `[${this.nums}]` leverages default array string coercion, which converts `[1, 2, 3]` into `'1,2,3'`, producing `'[1,2,3]'`.

---

## Dry Run

Trace for `nums = [[1, 2], [3, 4]]`, `operation = "Add"`:

- `obj1 = new ArrayWrapper([1, 2])`:
  - `this.nums = [1, 2]`.
  - `this.s = 1 + 2 = 3`.
- `obj2 = new ArrayWrapper([3, 4])`:
  - `this.nums = [3, 4]`.
  - `this.s = 3 + 4 = 7`.
- Evaluate `obj1 + obj2`:
  - Runtime calls `obj1.valueOf()` -> `3`.
  - Runtime calls `obj2.valueOf()` -> `7`.
  - `3 + 7 = 10`.
- **Return:** `10`.

---

## Complexity Analysis

- **Time Complexity:** - Constructor: `O(n)` to calculate array sum via `reduce`.
- `valueOf()`: `O(1)` returning the cached sum.
- `toString()`: `O(n)` to serialize elements into a comma-separated string.
- **Space Complexity:** `O(n)` — Storing the reference to `nums` of length `n`, plus `O(1)` auxiliary storage for the cached sum `s`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2695array-wrapper.js](./2695array-wrapper.js) |

---

## Key Learnings

- Overriding `valueOf()` on an object controls its behavior in arithmetic operations like `+`, `-`, and `*`.
- Overriding `toString()` customizes string representation and template literal interpolation.
- Caching aggregate values (like array sum) in the constructor provides `O(1)` query speed during frequent operations.
