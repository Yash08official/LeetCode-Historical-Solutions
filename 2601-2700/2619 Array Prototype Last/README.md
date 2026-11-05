---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2619. Array Prototype Last

**[View Problem on LeetCode](https://leetcode.com/problems/array-prototype-last/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2619` (`2619`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Write JavaScript code that enhances all arrays such that you can call the `arr.last()` method on any array.

The method should return the **last element** of the array. If there are no elements in the array, it should return `-1`.

You may assume that the array is the output of `JSON.parse`.

---

## Examples

### Example 1

```text
Input: nums = [null, {}, 3]
Output: 3
Explanation: Calling nums.last() should return the last element: 3.
```

### Example 2

```text
Input: nums = []
Output: -1
Explanation: Because there are no elements, return -1.
```

---

## Constraints

- `arr` is a valid JSON array

- `0 <= arr.length <= 1000`

---

## Problem Understanding

We must extend JavaScript's built-in `Array` prototype by defining an instance method named `last`. Inside the prototype method, `this` refers to the array instance on which the method is called. If `this.length === 0`, return `-1`. Otherwise, return the element at index `this.length - 1`.

---

## Approach

### Brute Force Approach

A naive approach might use `this.slice(-1)[0] ?? -1` or `this.pop()` (which mutates the array and is unacceptable). Slicing creates a new shallow copy of a 1-element array, incurring unnecessary memory allocation compared to direct index access.

### Optimized Approach

Attach the function directly to `Array.prototype.last`. Check `if (this.length === 0) return -1;`. Otherwise, access `this[this.length - 1]` directly in $O(1)$ time without modifying the array or allocating extra memory.

### Step-by-Step Thinking Process

1. To make `last()` available on all array instances, attach it to `Array.prototype`.
2. Use a regular `function` declaration rather than an arrow function so that `this` dynamically binds to the calling array instance.
3. Check if `this.length === 0`; if so, return `-1` as specified.
4. Otherwise, return `this[this.length - 1]`.

### Algorithm / Intuition

By setting `Array.prototype.last = function() { ... }`, every JavaScript array inherits this method through the prototype chain. When `arr.last()` is invoked, `this` refers to `arr`. The length check `if (this.length === 0)` protects against empty arrays and returns `-1`. For non-empty arrays, `this[this.length - 1]` accesses the final index in constant time.

---

## Dry Run

Trace with Example 1: `arr = [null, {}, 3]`.
- Call `arr.last()`.
- `this.length` is 3, which is not 0.
- Return `this[3 - 1] = this[2] = 3`.

Trace with Example 2: `arr = []`.
- Call `arr.last()`.
- `this.length` is 0.
- Condition `this.length === 0` is true, returns `-1`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — Array length lookup and direct index retrieval are constant-time operations.
- **Space Complexity:** `O(1)` — No additional memory or copies are created.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2619array-prototype-last.js](./2619array-prototype-last.js) |

---

## Key Learnings

- Prototypal inheritance in JavaScript allows adding methods to built-in objects like `Array.prototype`.
- Regular functions must be used for prototype methods so `this` references the calling object; arrow functions capture lexical `this`.
- Checking `length === 0` explicitly handles empty arrays cleanly, avoiding returning `undefined`.
