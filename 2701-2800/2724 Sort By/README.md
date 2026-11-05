---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2724. Sort By

**[View Problem on LeetCode](https://leetcode.com/problems/sort-by/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2724` (`2724`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

We are given an array `arr` and a callback function `fn`. We need to return a sorted array `sortedArr`.

The sorting function `fn` maps each element to a number, and those numbers define the sort keys. `sortedArr` must be sorted in **ascending order** based on the numeric output of `fn`.

We can assume that `fn` returns distinct numbers for all elements in `arr`, and that it always produces valid numbers.

---

## Examples

### Example 1

```text
Input: arr = [5, 4, 1, 2, 3], fn = (x) => x
Output: [1, 2, 3, 4, 5]
Explanation: fn simply returns the number passed to it so the array is sorted in ascending order.
```

### Example 2

```text
Input: arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = (d) => d.x
Output: [{"x": -1}, {"x": 0}, {"x": 1}]
Explanation: fn returns the value for the "x" key. So the array is sorted based on that value.
```

### Example 3

```text
Input: arr = [[3, 4], [5, 2], [10, 1]], fn = (x) => x[1]
Output: [[10, 1], [5, 2], [3, 4]]
Explanation: arr is sorted in ascending order by number at index=1.
```

---

## Constraints

- `arr` is a valid JSON array

- `fn` is a function that returns a number

- `1 <= arr.length <= 5 * 10^5`

---

## Problem Understanding

Key considerations and edge cases:
- Array length can be up to $5 \times 10^5$, so sorting must be $O(N \log N)$.
- In JavaScript, `Array.prototype.sort()` sorts in-place by converting elements to strings by default unless a comparator function `(a, b) => ...` is provided!
- To sort by numeric values in ascending order, the comparator must return `fn(a) - fn(b)`.
- The solution defensively validates that `arr` is an array and `fn` is a function, creates a shallow copy `[...arr]`, and sorts using a comparator.

---

## Approach

### Brute Force Approach

A naive approach like bubble sort or selection sort would repeatedly compare elements using `fn` in $O(N^2)$ time. For an array with $5 \times 10^5$ items, $O(N^2)$ would perform $\approx 2.5 \times 10^{11}$ operations, timing out catastrophically. An $O(N \log N)$ comparison sort (like Timsort used by JavaScript engines) is necessary.

### Optimized Approach

The solution makes a shallow copy of `arr` using spread syntax `[...arr]` to avoid mutating the original input, then invokes native `.sort((a, b) => ...)` with a custom comparator. Inside the comparator, it evaluates `aValue = fn(a)` and `bValue = fn(b)` and returns `aValue - bValue`.

### Step-by-Step Thinking Process

1. Verify inputs: ensure `arr` is an Array and `fn` is a function.
2. Clone the input array `[...arr]` so the sort operation does not mutate the original array.
3. Use native `.sort()` which implements an optimized $O(N \log N)$ sorting algorithm (Timsort in V8).
4. Define the comparator callback `(a, b) => fn(a) - fn(b)`.
5. Return the sorted array.

### Algorithm / Intuition

The implementation first guards against invalid parameters. Next, `[...arr]` creates a shallow copy of the input. Calling `.sort((a, b) => { ... })` invokes the engine's built-in sorting algorithm. For each comparison between elements `a` and `b`, `fn(a)` and `fn(b)` produce numeric sort keys `aValue` and `bValue`. Returning `aValue - bValue` indicates:
- Negative if `aValue < bValue` (so `a` comes before `b`).
- Zero if equal.
- Positive if `aValue > bValue` (so `b` comes before `a`).

---

## Dry Run

We trace Example 1 with `arr = [5, 4, 1, 2, 3]` and `fn = (x) => x`:

- Clone array: `[5, 4, 1, 2, 3]`.
- `.sort()` begins comparing pairs using comparator `(a, b)`:
  - When comparing `5` and `4`: `fn(5) - fn(4) = 5 - 4 = 1 > 0` -> `4` moves before `5`.
  - When comparing `4` and `1`: `fn(4) - fn(1) = 3 > 0` -> `1` moves before `4`.
  - Continuing standard sorting comparisons, elements settle in order `[1, 2, 3, 4, 5]`.
- Returns `[1, 2, 3, 4, 5]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N \log N)` where `N` is the length of `arr`. Native JavaScript `.sort()` runs in $O(N \log N)$ time.
- **Space Complexity:** `O(N)` auxiliary space to create the shallow copy `[...arr]` and for the engine's sort recursion stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2724sort-by.js](./2724sort-by.js) |

---

## Key Learnings

- In JavaScript, `.sort()` without a comparator converts elements to strings, which incorrectly sorts numbers lexicographically (e.g., '10' before '2'). Always provide `(a, b) => a - b`.
- `[...arr]` ensures functional purity by not mutating the caller's original array.
- Sorting by a key function `fn` evaluates relative ordering via `fn(a) - fn(b)`.
