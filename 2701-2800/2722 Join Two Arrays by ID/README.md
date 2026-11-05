---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2722. Join Two Arrays by ID

**[View Problem on LeetCode](https://leetcode.com/problems/join-two-arrays-by-id/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2722` (`2722`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are given two arrays of objects, `arr1` and `arr2`. Every object in both arrays contains an integer `id` property.

We must return a merged array `joinedArray` containing objects grouped by unique `id`, sorted in **ascending order** of `id`.

Merging rules:
- If an `id` exists in only one array, its object is included without modification.
- If an `id` exists in both arrays, the properties are merged into a single object.
- If a property key exists in both objects with the same `id`, the value from `arr2` overrides the value from `arr1`.

---

## Examples

### Example 1

```text
Input:
arr1 = [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9}
],
arr2 = [
    {"id": 3, "x": 5}
]
Output:
[
    {"id": 1, "x": 1},
    {"id": 2, "x": 9},
    {"id": 3, "x": 5}
]
Explanation: There are no duplicate ids so arr1 is simply concatenated with arr2.
```

### Example 2

```text
Input:
arr1 = [
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 3, "y": 6}
],
arr2 = [
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Output:
[
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Explanation: The two objects with id=1 and id=3 are included in the result array without modifiction. The two objects with id=2 are merged together. The keys from arr2 override the values in arr1.
```

### Example 3

```text
Input:
arr1 = [
    {"id": 1, "b": {"b": 94},"v": [4, 3], "y": 48}
]
arr2 = [
    {"id": 1, "b": {"c": 84}, "v": [1, 3]}
]
Output: [
    {"id": 1, "b": {"c": 84}, "v": [1, 3], "y": 48}
]
Explanation: The two objects with id=1 are merged together. For the keys "b" and "v" the values from arr2 are used. Since the key "y" only exists in arr1, that value is taken form arr1.
```

---

## Constraints

- `arr1` and `arr2` are valid JSON arrays

- Each object in `arr1` and `arr2` has a unique integer `id` key

- `2 <= JSON.stringify(arr1).length <= 10^6`

- `2 <= JSON.stringify(arr2).length <= 10^6`

---

## Problem Understanding

Key observations:
- Total JSON string length can reach $10^6$, so an efficient merge is necessary (linear or $O(N \log N)$).
- `id` is an integer.
- When merging two objects with identical `id`, spread syntax `{...obj1, ...obj2}` naturally implements the requirement that `arr2` properties override `arr1` properties.
- In JavaScript (V8 and modern engines conforming to ES2015+), integer keys in a plain object `{}` are iterated in ascending numerical order when using `Object.values(ob)`.

---

## Approach

### Brute Force Approach

A brute-force approach would iterate over each object in `arr2`, scan through `arr1` with a nested loop ($O(N \cdot M)$) to find matching `id`s, merge them in-place, and append non-matching objects, followed by a manual sort. For arrays with tens of thousands of objects, $O(N \cdot M)$ quadratic comparison would exceed the time limit.

### Optimized Approach

The solution uses a hash map (plain JavaScript object `ob`):
1. Iterate through `arr1`: for each object `i`, store `ob[i.id] = i`.
2. Iterate through `arr2`: for each object `i`, check if `ob[i.id]` exists. If so, merge using object spread: `ob[i.id] = {...ob[i.id], ...i}`; otherwise, assign `ob[i.id] = i`.
3. Return `Object.values(ob)`. Because numeric keys in JavaScript objects are automatically traversed in ascending integer order, `Object.values(ob)` yields the final array already sorted by `id`.

### Step-by-Step Thinking Process

1. Need to join two arrays of objects on property `id` with override semantics.
2. Use an object `ob` as a hash table indexed by `id`.
3. Populate `ob` with all objects from `arr1`.
4. Iterate through `arr2`: if `ob[i.id]` already exists, merge with `{ ...ob[i.id], ...i }` so that `arr2`'s keys override `arr1`'s keys. If it doesn't exist, simply assign `ob[i.id] = i`.
5. Extract values via `Object.values(ob)`.
6. Note that ES2015 specification guarantees integer keys are sorted in ascending numeric order when iterating object properties, guaranteeing the output is sorted by `id`.

### Algorithm / Intuition

The dictionary `ob = {}` maps each numeric `id` to its corresponding merged object. In the first pass over `arr1`, `ob[i.id] = i` indexes every record. In the second pass over `arr2`, the ternary operator `ob[i.id] ? {...ob[i.id], ...i} : i` seamlessly performs a shallow merge where matching properties from `i` overwrite existing properties from `ob[i.id]`. Finally, `Object.values(ob)` collects all merged records. Because ECMAScript property traversal order dictates that integer-index keys are sorted in ascending numeric order, the resulting array is guaranteed to be sorted by `id` in ascending order.

---

## Dry Run

We trace Example 1 with `arr1 = [{"id": 1, "x": 1}, {"id": 2, "x": 9}]` and `arr2 = [{"id": 3, "x": 5}]`:

- Pass 1 (arr1):
  - `ob[1] = {"id": 1, "x": 1}`
  - `ob[2] = {"id": 2, "x": 9}`
- Pass 2 (arr2):
  - `i = {"id": 3, "x": 5}`: `ob[3]` is undefined -> `ob[3] = {"id": 3, "x": 5}`
- `ob` keys are integer keys `[1, 2, 3]`.
- `Object.values(ob)` returns `[{"id": 1, "x": 1}, {"id": 2, "x": 9}, {"id": 3, "x": 5}]`.
- Output matches expected result.

---

## Complexity Analysis

- **Time Complexity:** `O(N + M)` on average, where `N = arr1.length` and `M = arr2.length`. Inserting, shallow-merging properties, and extracting values take linear time relative to total object keys.
- **Space Complexity:** `O(N + M)` to store the merged objects in `ob` and construct the resulting array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2722join-two-arrays-by-id.js](./2722join-two-arrays-by-id.js) |

---

## Key Learnings

- JavaScript object spread `{ ...a, ...b }` provides an elegant and concise way to merge objects with right-hand precedence.
- ECMAScript defines deterministic property traversal: integer-like keys are enumerated first in ascending numerical order.
- Hash maps reduce relational joins on unique keys from $O(N \cdot M)$ to $O(N + M)$.
