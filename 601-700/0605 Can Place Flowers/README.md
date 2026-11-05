---
comments: true
difficulty: Easy
tags:
  - Array
  - Greedy
---

# 605. Can Place Flowers

**[View Problem on LeetCode](https://leetcode.com/problems/can-place-flowers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0605` (`605`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Greedy` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a binary array `flowerbed` representing a row of garden plots (`0` = empty, `1` = already planted) and a non-negative integer `n`. No two flowers may occupy adjacent plots, and the initial `flowerbed` already obeys this rule.

Return `true` if at least `n` new flowers can be planted in `flowerbed` without creating any adjacent flowers, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
```

### Example 2

```text
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false
```

---

## Constraints

- `1 <= flowerbed.length <= 2 * 10^4`

- `flowerbed[i]` is `0` or `1`.

- There are no two adjacent flowers in `flowerbed`.

- `0 <= n <= flowerbed.length`

---

## Problem Understanding

- **Local Validity Rule:** An empty plot at index `i` (`flowerbed[i] === 0`) can receive a flower if and only if its left neighbor (`i - 1`, or boundary) is empty and its right neighbor (`i + 1`, or boundary) is empty.
- **Greedy Choice Property:** Planting a flower as early (leftmost) as legally possible is always optimal. Delaying a valid placement at `i` to `i + 1` can never allow *more* flowers in the remaining suffix `i + 2 .. end` — it can only restrict index `i + 2`.
- **Boundary Handling:** Index `0` has no left neighbor and index `flowerbed.length - 1` has no right neighbor; treating out-of-bounds neighbors as `0` unifies boundary and interior logic.

---

## Approach

### Brute Force Approach

A backtracking/recursive brute force tries both options (plant vs. skip) at every valid empty plot to find the maximum independent set of placements, taking `O(2^m)` exponential time in the length `m` of `flowerbed`.

### Optimized Approach

Greedily scan `flowerbed` from left to right, planting a flower in-place (`flowerbed[i] = 1`) and incrementing `count` whenever `flowerbed[i] === 0` and both neighbors (treating array edges as `0`) are `0`, then check `count >= n`.

### Step-by-Step Thinking Process

1. Initialize `count = 0` to track the maximum number of new flowers we can greedily place.
2. Loop `i` from `0` to `flowerbed.length - 1`.
3. Whenever `flowerbed[i] === 0`, determine `prev` (`0` if `i === 0`, else `flowerbed[i - 1]`) and `next` (`0` if `i === flowerbed.length - 1`, else `flowerbed[i + 1]`).
4. If `prev === 0 && next === 0`, plant immediately by setting `flowerbed[i] = 1` (so `i + 1` sees `prev === 1` on the next iteration!) and increment `count++`.
5. After scanning the array, return `count >= n`.

### Algorithm / Intuition

Because `flowerbed` is mutated in-place (`flowerbed[i] = 1`) whenever we plant a flower at index `i`, the subsequent iteration `i + 1` automatically observes `prev = flowerbed[i] = 1` and avoids planting an adjacent flower.

Using ternary expressions `let prev = (i === 0) ? 0 : flowerbed[i - 1]` and `let next = (i === flowerbed.length - 1) ? 0 : flowerbed[i + 1]` cleanly handles single-element arrays like `[0]` as well as both ends of longer flowerbeds without separate special-case branches.

---

## Dry Run

Tracing `flowerbed = [1, 0, 0, 0, 1]`, `n = 1`:

- **Init:** `count = 0`.
- **`i = 0`:** `flowerbed[0] === 1` -> skip.
- **`i = 1`:** `flowerbed[1] === 0`, `prev = flowerbed[0] = 1`, `next = flowerbed[2] = 0` -> `prev === 0` is false -> skip.
- **`i = 2`:** `flowerbed[2] === 0`, `prev = flowerbed[1] = 0`, `next = flowerbed[3] = 0` -> both `0`! Plant `flowerbed[2] = 1` (`[1, 0, 1, 0, 1]`), `count = 1`.
- **`i = 3`:** `flowerbed[3] === 0`, `prev = flowerbed[2] = 1`, `next = flowerbed[4] = 1` -> skip.
- **`i = 4`:** `flowerbed[4] === 1` -> skip.
- **Return:** `count >= n` -> `1 >= 1` -> `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(m)` — Iterates once through all `m = flowerbed.length` plots, doing `O(1)` work per index.
- **Space Complexity:** `O(1)` — Uses only scalar variables (`count`, `i`, `prev`, `next`) while updating `flowerbed` in-place.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [605can-place-flowers.js](./605can-place-flowers.js) |

---

## Key Learnings

- Greedy left-to-right placement works on 1D non-adjacent packing problems because choosing the leftmost valid slot leaves the largest possible unblocked suffix.
- Treating virtual out-of-bounds slots at `-1` and `length` as empty (`0`) eliminates messy edge-case conditionals for `length == 1`, `i == 0`, and `i == length - 1`.
- In production code where mutating the input array is undesirable, jumping `i += 2` upon planting (and returning `true` early as soon as `count >= n`) avoids modifying `flowerbed`.
