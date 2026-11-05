---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2625. Flatten Deeply Nested Array

**[View Problem on LeetCode](https://leetcode.com/problems/flatten-deeply-nested-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2625` (`2625`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a multi-dimensional array `arr` and a non-negative integer depth `n`, return a **flattened** version of that array.

A multi-dimensional array is an array containing integers or other multi-dimensional arrays.

Flattening an array to depth `n` means that any subarray nested at a depth of `n` or less has its elements merged into the parent array, while subarrays deeper than `n` retain their nested array structure.

When `n = 0`, the array should remain completely unflattened.

---

## Examples

### Example 1

```text
Input
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 0
Output
[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

Explanation
Passing a depth of n=0 will always result in the original array. This is because the smallest possible depth of a subarray (0) is not less than n=0. Thus, no subarray should be flattened.
```

### Example 2

```text
Input
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 1
Output
[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

Explanation
The subarrays starting with 4, 7, and 13 are all flattened. This is because their depth of 0 is less than 1. However [9, 10, 11] remains unflattened because its depth is 1.
```

### Example 3

```text
Input
arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 2
Output
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

Explanation
The maximum depth of any subarray is 1. Thus, all of them are flattened.
```

---

## Constraints

- `0 <= count of numbers in arr <= 10^5`

- `0 <= count of subarrays in arr <= 10^5`

- `maxDepth <= 1000`

- `-1000 <= each number <= 1000`

- `0 <= n <= 1000`

---

## Problem Understanding

We must implement array flattening with an explicit depth limit `n`. If `n = 0`, no flattening occurs and the array is returned as-is. If `n > 0`, each element that is an array (`Array.isArray(x)`) should be recursively flattened with depth parameter `n - 1`, and its unpacked elements placed in sequence into the resulting array. Non-array elements are preserved directly.

---

## Approach

### Brute Force Approach

Repeatedly calling `arr.flat()` in a loop $n$ times using the built-in prototype method. However, this problem requires implementing the flattening algorithm manually without relying on `Array.prototype.flat`.

### Optimized Approach

Use recursion. If `!n` (i.e., `n === 0`), return `arr` directly. Otherwise, allocate an empty array `ans`. Iterate through every element `x` of `arr`. If `Array.isArray(x) && n`, recursively call `flat(x, n - 1)` and spread the result into `ans`: `ans.push(...flat(x, n - 1))`. Otherwise, directly push `x` into `ans`. Return `ans`.

### Step-by-Step Thinking Process

1. Base case: if `n === 0`, no flattening is requested; return `arr`.
2. Initialize an accumulator array `ans`.
3. Iterate through elements of `arr` with a `for...of` loop.
4. If an element is an array and `n > 0`, it needs to be unpacked one level deeper: recurse with `flat(x, n - 1)` and spread into `ans`.
5. If it is a primitive number, append it directly to `ans`.
6. Return `ans`.

### Algorithm / Intuition

The function begins with `if (!n) return arr;`, immediately handling the zero-depth case. A loop `for (var x of arr)` inspects each element. `Array.isArray(x)` checks if `x` is a nested array. If true and `n` is non-zero, `flat(x, n - 1)` recursively resolves flattening down to depth `n - 1`, and `ans.push(...)` appends all unpacked elements into the current output. If `x` is not an array, `ans.push(x)` appends it unchanged.

---

## Dry Run

Trace with Example 1: `arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]`, `n = 0`.
- `!n` evaluates to `!0 === true`.
- Immediately returns `arr` unchanged.

Trace with Example 2: Same `arr`, `n = 1`.
- `!n` is false.
- Elements 1, 2, 3 are numbers -> `ans.push(1, 2, 3)`.
- Next element `[4, 5, 6]` is an array: call `flat([4, 5, 6], 0)` -> returns `[4, 5, 6]`. `ans.push(...[4, 5, 6])`.
- Next element `[7, 8, [9, 10, 11], 12]` is an array: call `flat(..., 0)` -> returns `[7, 8, [9, 10, 11], 12]`. `ans.push(...)`.
- Next element `[13, 14, 15]` is an array: call `flat(..., 0)` -> returns `[13, 14, 15]`. `ans.push(...)`.
Output: `[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the total number of elements and subarrays visited in `arr` up to depth `n`. Each element is inspected and copied into `ans` once.
- **Space Complexity:** `O(D + N)` where `D = min(n, maxDepth)` is the call stack depth and `N` is the memory allocated for the flattened result array `ans`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2625flatten-deeply-nested-array.js](./2625flatten-deeply-nested-array.js) |

---

## Key Learnings

- `Array.isArray()` is the robust way to distinguish arrays from other objects and primitives in JavaScript.
- Passing `n - 1` into recursive calls naturally limits flattening to the requested depth.
- Returning `arr` immediately when `!n` avoids unnecessary array allocations when `n = 0`.
