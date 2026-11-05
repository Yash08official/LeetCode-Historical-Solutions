---
comments: true
difficulty: Medium
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2631. Group By

**[View Problem on LeetCode](https://leetcode.com/problems/group-by/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2631` (`2631`) |
| **Difficulty** | Medium |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Write code that enhances all JavaScript arrays such that calling `array.groupBy(fn)` on any array returns a **grouped** version of that array.

A grouped array is an object where each key is the string returned by calling the selector function `fn(arr[i])` on an element, and each value is an array containing all elements from the original array that produced that key.

The relative order of elements under each key must be preserved in the output lists.

---

## Examples

### Example 1

```text
Input:
array = [
  {"id":"1"},
  {"id":"1"},
  {"id":"2"}
],
fn = function (item) {
  return item.id;
}
Output:
{
  "1": [{"id": "1"}, {"id": "1"}],
  "2": [{"id": "2"}]
}
Explanation:
Output is from array.groupBy(fn).
The selector function gets the "id" out of each item in the array.
There are two objects with an "id" of 1. Both of those objects are put in the first array.
There is one object with an "id" of 2. That object is put in the second array.
```

### Example 2

```text
Input:
array = [
  [1, 2, 3],
  [1, 3, 5],
  [1, 5, 9]
]
fn = function (list) {
  return String(list[0]);
}
Output:
{
  "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]]
}
Explanation:
The array can be of any type. In this case, the selector function defines the key as being the first element in the array.
All the arrays have 1 as their first element so they are grouped together.
{
  "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]]
}
```

### Example 3

```text
Input:
array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
fn = function (n) {
  return String(n > 5);
}
Output:
{
  "true": [6, 7, 8, 9, 10],
  "false": [1, 2, 3, 4, 5]
}
Explanation:
The selector function splits the array by whether each number is greater than 5.
```

---

## Constraints

- `0 <= array.length <= 10^5`

- `fn` returns a string

---

## Problem Understanding

This problem requires extending `Array.prototype` with a custom `groupBy` method.

Key requirements:
- `this` inside the method refers to the array on which `.groupBy()` was invoked.
- `fn` is applied to each item of the array to compute the grouping key.
- The returned value is an object `{ [key]: item[] }`.
- If a key is encountered for the first time, an empty array must be initialized before appending the item.
- The original array must not be mutated.

---

## Approach

### Brute Force Approach

A naive approach would be to first pass through the array to collect all unique keys into a set, and then for each unique key, iterate through the entire array again to filter elements matching that key.

If there are `k` unique keys across `n` elements, this results in `O(k * n)` time complexity. In the worst case where all elements map to distinct keys (`k = n`), the time complexity degrades to `O(n^2)`.

### Optimized Approach

The optimal approach performs a single linear pass `O(n)` using a hash table (JavaScript plain object `result`).

For each element in `this`, compute `const key = fn(item)`. If `!result[key]`, initialize `result[key] = []`. Then push `item` into `result[key]`. Finally, return `result`.

### Step-by-Step Thinking Process

1. We need to attach `groupBy` to `Array.prototype` so that any array can call `arr.groupBy(fn)`.
2. Inside the prototype method, `this` represents the caller array.
3. Initialize an empty accumulator object `const result = {}`.
4. Iterate through `this` using `this.forEach(item => ...)`.
5. For each `item`, compute its group key: `const key = fn(item)`.
6. Check if `result[key]` exists. If not, initialize it to an empty array `result[key] = []`.
7. Append the current item: `result[key].push(item)`.
8. After traversing all elements, return `result`.

### Algorithm / Intuition

By extending `Array.prototype.groupBy`, all array instances inherit the grouping behavior.

1. `const result = {}` acts as a bucket map.
2. Iterating with `this.forEach` processes elements in their original sequence from index `0` to `n - 1`.
3. For each element, `key = fn(item)` determines the partition bucket.
4. The check `if (!result[key]) result[key] = [];` ensures the array bucket exists.
5. Pushing to `result[key]` guarantees elements with the same key maintain their original order.
6. Returns the completed object.

---

## Dry Run

Trace for `array = [{"id":"1"}, {"id":"1"}, {"id":"2"}]`, `fn = item => item.id`:

- **Initial:** `result = {}`.
- **Item 0 (`{"id":"1"}`):**
  - `key = fn(item) = "1"`.
  - `!result["1"]` is true -> `result["1"] = []`.
  - `result["1"].push({"id":"1"})` -> `result["1"] = [{"id":"1"}]`.
- **Item 1 (`{"id":"1"}`):**
  - `key = fn(item) = "1"`.
  - `result["1"]` exists.
  - `result["1"].push({"id":"1"})` -> `result["1"] = [{"id":"1"}, {"id":"1"}]`.
- **Item 2 (`{"id":"2"}`):**
  - `key = fn(item) = "2"`.
  - `!result["2"]` is true -> `result["2"] = []`.
  - `result["2"].push({"id":"2"})` -> `result["2"] = [{"id":"2"}]`.
- **Result:** `{"1": [{"id":"1"}, {"id":"1"}], "2": [{"id":"2"}]}`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Where `n` is the length of `array`. Each element is processed exactly once, and property lookups/insertions in a JavaScript object execute in `O(1)` average time.
- **Space Complexity:** `O(n)` — The `result` object stores references to all `n` items distributed across key arrays, requiring `O(n)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2631group-by.js](./2631group-by.js) |

---

## Key Learnings

- Extending `Array.prototype` enables chaining methods on any array instance while utilizing `this` as the source array.
- Single-pass bucketing with an object hash map achieves optimal `O(n)` grouping.
- Sequential traversal via `forEach` naturally preserves the stable relative ordering of elements within each group.
