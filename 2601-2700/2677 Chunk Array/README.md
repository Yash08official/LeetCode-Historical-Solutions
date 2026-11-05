---
comments: true
difficulty: Easy
tags:
  - Unavailable (Not tagged on LeetCode)
---

# 2677. Chunk Array

**[View Problem on LeetCode](https://leetcode.com/problems/chunk-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2677` (`2677`) |
| **Difficulty** | Easy |
| **Topics / Tags** | Unavailable (Not tagged on LeetCode) |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array `arr` and a chunk size `size`, return a **chunked** array.

A chunked array contains the original elements of `arr`, but partitioned into subarrays (chunks) where each chunk has a length of `size`. The final chunk may have a length less than `size` if the remaining elements do not divide evenly by `size`.

If the input array `arr` is empty, return an empty array `[]`.

---

## Examples

### Example 1

```text
Input: arr = [1,2,3,4,5], size = 1
Output: [[1],[2],[3],[4],[5]]
Explanation: The arr has been split into subarrays each with 1 element.
```

### Example 2

```text
Input: arr = [1,9,6,3,2], size = 3
Output: [[1,9,6],[3,2]]
Explanation: The arr has been split into subarrays with 3 elements. However, only two elements are left for the 2nd subarray.
```

### Example 3

```text
Input: arr = [8,5,3,2,6], size = 6
Output: [[8,5,3,2,6]]
Explanation: Size is greater than arr.length thus all elements are in the first subarray.
```

### Example 4

```text
Input: arr = [], size = 1
Output: []
Explanation: There are no elements to be chunked so an empty array is returned.
```

---

## Constraints

- `arr` is a valid JSON array

- `2 <= JSON.stringify(arr).length <= 10^5`

- `1 <= size <= arr.length + 1`

---

## Problem Understanding

Array chunking splits a linear list into fixed-size batches.

Key considerations:
- Input array `arr` has length `n >= 0`, chunk size `size >= 1`.
- Number of output chunks is `ceil(n / size)`.
- Each subarray from index `0` to `n - size` has length `size`.
- The last subarray contains `n % size` elements (or `size` if `n` is divisible by `size`).
- Elements must maintain their original sequence.

---

## Approach

### Brute Force Approach

A manual element-by-element approach would iterate through `arr` with a `for` loop, pushing elements one by one into a temporary `currentChunk` array, and pushing `currentChunk` to the result whenever its length reaches `size`.

While also `O(n)`, manually managing chunk boundaries and remaining elements requires extra branching and boundary checks compared to slicing.

### Optimized Approach

The optimal approach uses a `while` loop with `Array.prototype.slice`.

Maintain an accumulator array `chunked = []` and a pointer `index = 0`. While `index < arr.length`, extract the slice `arr.slice(index, size + index)` and push it into `chunked`. Then increment `index += size`.

Because `slice` automatically stops at `arr.length` if the end index exceeds the array bounds, the final partial chunk is handled cleanly without extra conditional logic.

### Step-by-Step Thinking Process

1. We need to divide `arr` into subarrays of length `size`.
2. Initialize an empty array `chunked = []` and an offset `index = 0`.
3. Use a loop while `index < arr.length`.
4. Extract a window of length `size` using `arr.slice(index, size + index)`.
5. Push the extracted slice to `chunked`.
6. Advance `index` by `size`.
7. Once `index >= arr.length`, return `chunked`.

### Algorithm / Intuition

The algorithm slices the array into successive windows:

1. `let index = 0` marks the beginning of the current chunk.
2. `arr.slice(index, size + index)` creates a shallow copy of elements in `[index, index + size)`.
3. If `index + size > arr.length`, `slice` naturally truncates at `arr.length`, perfectly capturing the final partial chunk.
4. Advancing `index += size` shifts the window forward by exactly one chunk.
5. Returns the collected array of subarrays.

---

## Dry Run

Trace for `arr = [1, 2, 3, 4, 5]`, `size = 1`:

- `chunked = []`, `index = 0`, `arr.length = 5`.
- `index = 0`: `arr.slice(0, 1) = [1]`. `chunked.push([1])`. `index = 1`.
- `index = 1`: `arr.slice(1, 2) = [2]`. `chunked.push([2])`. `index = 2`.
- `index = 2`: `arr.slice(2, 3) = [3]`. `chunked.push([3])`. `index = 3`.
- `index = 3`: `arr.slice(3, 4) = [4]`. `chunked.push([4])`. `index = 4`.
- `index = 4`: `arr.slice(4, 5) = [5]`. `chunked.push([5])`. `index = 5`.
- `index < 5` is false. Loop ends.
- **Return:** `[[1], [2], [3], [4], [5]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Where `n` is `arr.length`. Each element of `arr` is copied into a chunk slice exactly once across all iterations.
- **Space Complexity:** `O(n)` — To store the chunked subarrays containing all `n` elements. Auxiliary pointer variables consume `O(1)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2677chunk-array.js](./2677chunk-array.js) |

---

## Key Learnings

- `Array.prototype.slice(start, end)` gracefully handles out-of-bounds `end` values by clamping to array length.
- Chunking is cleanly expressed as step-wise slicing with `index += size`.
- Edge cases like `arr = []` terminate immediately since `0 < 0` is false, returning `[]` correctly.
