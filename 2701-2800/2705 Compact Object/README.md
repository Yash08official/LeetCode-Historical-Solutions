---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2705. Compact Object

**[View Problem on LeetCode](https://leetcode.com/problems/compact-object/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2705` (`2705`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are given an object or array `obj` that is the result of parsing valid JSON. We need to return a **compact object**.

A compact object is defined as the original object or array with all **falsy** values removed recursively at all nesting levels. A value is considered falsy if `Boolean(value)` returns `false` (i.e., `false`, `0`, `""`, `null`, `undefined`, and `NaN`).

For arrays, removing falsy elements compacts the array by shifting remaining elements so that no empty index holes remain. For plain objects, any key whose value is falsy must be omitted entirely.

---

## Examples

### Example 1

```text
Input: obj = [null, 0, false, 1]
Output: [1]
Explanation: All falsy values have been removed from the array.
```

### Example 2

```text
Input: obj = {"a": null, "b": [false, 1]}
Output: {"b": [1]}
Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.
```

### Example 3

```text
Input: obj = [null, 0, 5, [0], [false, 16]]
Output: [5, [], [16]]
Explanation: obj[0], obj[1], obj[3][0], and obj[4][0] were falsy and removed.
```

---

## Constraints

- `obj` is a valid JSON object

- `2 <= JSON.stringify(obj).length <= 10^6`

---

## Problem Understanding

Key details and edge cases:
- Nesting can be arbitrarily deep with mixed arrays and objects.
- Falsy values include `null`, `0`, `false`, `""`, etc. Note that `typeof null === 'object'` in JavaScript, which is a classic trap.
- If `obj` is a primitive or null, check if it's truthy/falsy. But the root `obj` is specified to be an object or array.
- Empty arrays `[]` and empty objects `{}` are truthy in JavaScript and must NOT be removed unless their parent rules say otherwise.
- Array order must be preserved among retained elements.

---

## Approach

### Brute Force Approach

A non-recursive approach would require using an iterative queue or stack to traverse the JSON tree, reconstructing arrays and objects while keeping track of parents. Handling deep nesting and distinguishing arrays from objects iteratively requires cumbersome bookkeeping. Recursion is the natural and optimal paradigm for hierarchical JSON structures.

### Optimized Approach

The implemented solution applies clean depth-first recursive transformation:
1. Base condition: `if (!obj || typeof obj !== 'object') return obj;` handles primitives and `null`.
2. Array handling: `if (Array.isArray(obj)) return obj.filter(Boolean).map(compactObject);` filters out all top-level falsy items, then recursively compacts remaining nested elements.
3. Object handling: iterate through key-value pairs using `Object.entries(obj).reduce(...)`, only retaining entries where `Boolean(value)` is true, and recursively compacting truthy child values.

### Step-by-Step Thinking Process

1. Recognize the recursive tree structure of JSON objects and arrays.
2. Identify the base case: non-object types or `null` cannot be further traversed, return them as-is.
3. Differentiate between arrays and objects because arrays must maintain sequential indexing without holes.
4. For arrays: `obj.filter(Boolean)` drops falsy values immediately, then `.map(compactObject)` recursively compacts the survivors.
5. For objects: iterate through `Object.entries(obj)`, check if `value` is truthy; if truthy, set `acc[key] = compactObject(value)`.
6. Return the accumulated compacted object or array.

### Algorithm / Intuition

The function `compactObject(obj)` operates recursively. First, `if (!obj || typeof obj !== 'object') return obj;` guards against primitives and `null`. Next, `Array.isArray(obj)` branches into array logic: `obj.filter(Boolean)` uses JavaScript's built-in `Boolean` constructor as a predicate to discard `null, 0, false, ''`, and `.map(compactObject)` recurses on each surviving element.

For non-array objects, `Object.entries(obj).reduce((acc, [key, value]) => { ... }, {})` iterates through each property. If `value` is truthy (checked via `if (value)`), we assign `acc[key] = compactObject(value)`, ensuring that nested objects/arrays are also compacted before being stored in `acc`.

---

## Dry Run

We trace Example 1 with `obj = [null, 0, false, 1]`:

- Call `compactObject([null, 0, false, 1])`.
- Guard check: `typeof obj === 'object'` and `obj !== null`. `Array.isArray(obj)` is `true`.
- `obj.filter(Boolean)` evaluates `Boolean(item)` for each element:
  - `Boolean(null)` -> `false` (dropped)
  - `Boolean(0)` -> `false` (dropped)
  - `Boolean(false)` -> `false` (dropped)
  - `Boolean(1)` -> `true` (kept)
- Filtered array is `[1]`.
- `.map(compactObject)` runs on `1`: primitive number returns `1`.
- Returns `[1]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the total number of keys, indices, and primitive values across the entire nested JSON object. Every node in the JSON tree is visited and processed a constant number of times.
- **Space Complexity:** `O(D + N)` where `D` is the maximum nesting depth (recursion stack) and `N` is the space required to construct the newly compacted objects and arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2705compact-object.js](./2705compact-object.js) |

---

## Key Learnings

- `Array.prototype.filter(Boolean)` is an idiomatic JavaScript pattern for stripping all falsy values from an array.
- Always beware of `typeof null === 'object'`; guard with `!obj` before inspecting object properties.
- Tree traversal on JSON structures naturally decomposes into base case (primitives), array case, and object dictionary case.
