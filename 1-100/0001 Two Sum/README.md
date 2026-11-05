---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
---

# 1. Two Sum

**[View Problem on LeetCode](https://leetcode.com/problems/two-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0001` (`1`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an integer array `nums` and a target integer `target`, find the `0`-based indices of two distinct elements in `nums` whose values sum to `target`.

Each test case is guaranteed to have **exactly one valid pair**, and the same array index cannot be used twice. The pair of indices may be returned in any order.

---

## Examples

### Example 1

**Input:** `nums = [2,7,11,15], target = 9`

**Output:** `[0,1]`

**Explanation:**

The sum of `nums[0]` and `nums[1]` is `2 + 7 = 9`, which equals the target. Therefore, the indices `[0, 1]` are returned.

### Example 2

**Input:** `nums = [3,2,4], target = 6`

**Output:** `[1,2]`

**Explanation:**

The sum of `nums[1]` and `nums[2]` is `2 + 4 = 6`, which equals the target. Therefore, the indices `[1, 2]` are returned.

### Example 3

**Input:** `nums = [3,3], target = 6`

**Output:** `[0,1]`

**Explanation:**

The sum of `nums[0]` and `nums[1]` is `3 + 3 = 6`, which equals the target. Therefore, the indices `[0, 1]` are returned.

---

## Constraints

- `2 <= nums.length <= 10^4`

- `-10^9 <= nums[i] <= 10^9`

- `-10^9 <= target <= 10^9`

- **Only one valid answer exists.**

---

## Follow-up Questions

Can you come up with an algorithm that is less than `O(n^2)` time complexity?

The implemented one-pass hash map solution directly answers the follow-up question by reducing the time complexity from `O(n^2)` down to `O(n)`.

---

## Problem Understanding

- **Input:** An array `nums` (`2 <= nums.length <= 10^4`) containing positive, negative, or zero integers (`-10^9` to `10^9`), along with an integer `target`.
- **Invariant:** If we are currently inspecting `nums[i]`, we need some previously seen element `nums[j]` (`j < i`) such that `nums[j] == target - nums[i]`.
- **Duplicate values:** Arrays like `[3, 3]` with `target = 6` are valid because indices `0` and `1` are distinct elements even though their values match.
- **Guaranteed solution:** Because a valid pair always exists within `nums`, a single pass from left to right is guaranteed to find the answer before running past the end of the array.

---

## Approach

### Brute Force Approach

Check every possible pair of distinct indices `(i, j)` with `0 <= i < j < nums.length` using two nested loops and return `[i, j]` as soon as `nums[i] + nums[j] == target`. While this requires `O(1)` extra space, checking up to `n * (n - 1) / 2` pairs results in `O(n^2)` time complexity, which becomes slow as `n` approaches `10^4`.

### Optimized Approach

Use a single-pass hash map (`Map`) that records each visited number and its index, allowing us to check in `O(1)` average time whether the required complement `target - nums[i]` has already been seen.

### Step-by-Step Thinking Process

1. Rewrite the equation `nums[j] + nums[i] = target` as a lookup query: for the current element `x = nums[i]`, we need to know whether `y = target - x` appeared at an earlier index `j < i`.
2. Maintain a JavaScript `Map` named `d` mapping each previously visited number to its array index.
3. Check `d.has(y)` **before** inserting `x` into `d` so we never match an element with itself and safely handle duplicate values like `[3, 3]`.
4. Rely on the problem's guarantee that a solution always exists, returning `[d.get(y), i]` immediately upon finding the complement.

### Algorithm / Intuition

In `1two-sum.js`, `d` is a `Map` storing `value -> index` pairs for elements already scanned. As the loop index `i` advances from `0`, we read `x = nums[i]` and compute its complement `y = target - x`. Notice that the `for (let i = 0; ; ++i)` loop omits an explicit termination condition because the problem guarantees at least one valid answer exists inside `nums`. If `d.has(y)` is `true`, we immediately return `[d.get(y), i]`. Otherwise, we record `d.set(x, i)` and move to the next index.

---

## Dry Run

**Input:** `nums = [2, 7, 11, 15]`, `target = 9`

| Iteration (`i`) | `x = nums[i]` | `y = target - x` | `d.has(y)`? | Action / Map `d` After Step |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `2` | `9 - 2 = 7` | `false` | Store `2 -> 0`. `d = {2 => 0}` |
| `1` | `7` | `9 - 7 = 2` | `true` (`d.get(2) = 0`) | Return `[0, 1]` |

**Output:** `[0, 1]`

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We inspect each element of `nums` at most once, performing `O(1)` average-time `Map.has`, `Map.get`, and `Map.set` operations per iteration.
- **Space Complexity:** `O(n)` — In the worst case (when the matching pair includes the last element), the `Map` `d` stores up to `n - 1` entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1two-sum.js](./1two-sum.js) |

---

## Key Learnings

- Trading `O(n)` space for a hash table turns an `O(n)` linear search for `target - x` into an `O(1)` complement lookup, reducing total runtime from `O(n^2)` to `O(n)`.
- Checking the map before inserting the current element avoids using the same index twice when `x * 2 === target` (e.g., `nums = [3, 2, 4]`, `target = 6`).
- JavaScript's `Map` avoids prototype-key collisions and handles arbitrary numeric keys cleanly without string coercion overhead.
