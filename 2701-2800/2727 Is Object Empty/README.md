---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2727. Is Object Empty

**[View Problem on LeetCode](https://leetcode.com/problems/is-object-empty/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2727` (`2727`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are given an object or an array `obj` that is the result of parsing valid JSON. We need to determine whether the object or array is **empty**.

- An empty object `{}` contains no key-value pairs.
- An empty array `[]` contains no elements.

The function must return `true` if `obj` is empty, and `false` otherwise.

---

## Examples

### Example 1

```text
Input: obj = {"x": 5, "y": 42}
Output: false
Explanation: The object has 2 key-value pairs so it is not empty.
```

### Example 2

```text
Input: obj = {}
Output: true
Explanation: The object doesn't have any key-value pairs so it is empty.
```

### Example 3

```text
Input: obj = [null, false, 0]
Output: false
Explanation: The array has 3 elements so it is not empty.
```

---

## Constraints

- `obj` is a valid JSON object or array

- `2 <= JSON.stringify(obj).length <= 10^5`

**Can you solve it in O(1) time?**

---

## Problem Understanding

Key considerations:
- Input is guaranteed to be a valid JSON object or array (cannot be a primitive like number, string, or boolean).
- JSON string length can be up to $10^5$. If an object or array contains many elements, we should avoid traversing the entire structure!
- A check that inspects only the first key can terminate in $O(1)$ time rather than $O(N)$.

---

## Approach

### Brute Force Approach

A common baseline approach is `Object.keys(obj).length === 0`. While concise, `Object.keys(obj)` must allocate an array of all property names across the entire object or array. If `obj` has 100,000 keys, `Object.keys(obj)` takes $O(N)$ time and allocates a large array in memory just to check if the count is zero. Similarly, `JSON.stringify(obj) === '{}'` traverses the entire structure in $O(N)$ time.

### Optimized Approach

The solution uses a `for...in` loop:
```javascript
var isEmpty = function(obj) {
    for (const _ in obj) return false;
    return true;
};
```
A `for...in` loop iterates over enumerable properties of both objects and arrays. If there is at least one property/index, the loop body executes immediately and returns `false` on the very first step. If there are no properties, the loop never enters, and the function returns `true`.

### Step-by-Step Thinking Process

1. Goal: check if `obj` has any properties or elements in $O(1)$ time.
2. Evaluate `Object.keys(obj).length === 0`: this traverses all keys, taking $O(N)$ time and memory.
3. Evaluate `for...in`: loops through enumerable keys lazily one by one.
4. If the loop enters for even one property `_`, `obj` is not empty, so immediately return `false`.
5. If the loop finishes without executing its body, `obj` has zero enumerable properties, so return `true`.

### Algorithm / Intuition

`for...in` inspects enumerable properties of `obj`. Because JSON parsed objects and arrays only contain own enumerable properties, the moment the engine finds the first property name, the loop body executes `return false`, stopping iteration instantly without inspecting subsequent keys or allocating memory arrays. If `obj` is `{}` or `[]`, no property exists, so the loop exits immediately and returns `true`.

---

## Dry Run

We trace Example 1 with `obj = {"x": 5, "y": 42}`:

- Function `isEmpty({"x": 5, "y": 42})` begins.
- `for (const _ in obj)` evaluates first property.
- First key is found (`_ = "x"`).
- Loop body executes `return false` immediately.
- Function returns `false` in $O(1)$ time without examining key `"y"`.

---

## Complexity Analysis

- **Time Complexity:** `O(1)` — The loop checks at most the first property and immediately returns, avoiding full collection traversal.
- **Space Complexity:** `O(1)` — No auxiliary data structures or key arrays are allocated in memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2727is-object-empty.js](./2727is-object-empty.js) |

---

## Key Learnings

- `for...in` with an immediate `return false` is a true $O(1)$ emptiness check in JavaScript.
- `Object.keys(obj).length === 0` is $O(N)$ in time and space because it builds a complete array of keys.
- Because JSON outputs do not inherit custom enumerable prototype properties, `for...in` safely checks object emptiness.
