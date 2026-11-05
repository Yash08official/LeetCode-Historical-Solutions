---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Sliding Window
  - Heap (Priority Queue)
  - Treap
---

# 480. Sliding Window Median

**[View Problem on LeetCode](https://leetcode.com/problems/sliding-window-median/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0480` (`480`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Sliding Window`, `Heap (Priority Queue)`, `Treap` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and a window size `k`, slide a contiguous window of length `k` from left to right across `nums` one element at a time, and return an array containing the **median** of each window.

- When `k` is odd, the median is the single middle element after sorting the `k` elements.
- When `k` is even, the median is the arithmetic mean of the two middle elements.

---

## Examples

### Example 1

```text
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
Explanation:
Window position                Median
---------------                -----
[1  3  -1] -3  5  3  6  7        1
 1 [3  -1  -3] 5  3  6  7       -1
 1  3 [-1  -3  5] 3  6  7       -1
 1  3  -1 [-3  5  3] 6  7        3
 1  3  -1  -3 [5  3  6] 7        5
 1  3  -1  -3  5 [3  6  7]       6
```

### Example 2

```text
Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]
```

---

## Constraints

- `1 <= k <= nums.length <= 10^5`

- `-2^31 <= nums[i] <= 2^31 - 1`

---

## Problem Understanding

- **Dynamic insertion AND arbitrary deletion:** Unlike "Find Median from Data Stream" (Problem 295) which only inserts elements, sliding the window requires **removing** outgoing elements `nums[i - k + 1]`. Java's `PriorityQueue.remove(Object)` takes `O(k)` linear scan time, whereas `TreeMap<Integer, Integer>` supports `O(log k)` insertion, deletion, `firstKey()`, and `lastKey()`!
- **Handling duplicate elements:** Because `TreeMap` keys are unique, storing `(value -> frequency_count)` lets a `TreeMap` act as an ordered multiset, while separate integer counters `lSize` and `rSize` track the true number of elements (including duplicates) in each half.
- **32-bit overflow when averaging:** With `-2^31 <= nums[i] <= 2^31 - 1`, adding two `int` values (such as `2147483647 + 2147483647`) in Java `int` arithmetic overflows! Casting to `(double)` *before* adding prevents overflow.

---

## Approach

### Brute Force Approach

Copying each `k`-element window into a temporary array and sorting it to read the middle element(s) takes `O(k log k)` per window, resulting in `O((n - k + 1) * k log k)` total time—far too slow when `n = 10^5` and `k = 50,000`.

### Optimized Approach

Maintain **Two Balanced `TreeMap` Multisets (`l` and `r`)**: `l` stores the smaller half (`ceil(k / 2)` elements) and `r` stores the larger half (`floor(k / 2)` elements), supporting `O(log k)` insertions, rebalancings, median queries (`l.lastKey()` and `r.firstKey()`), and outgoing-element removals.

### Step-by-Step Thinking Process

1. Partition the active window into two ordered multisets implemented as frequency maps: `l` (lower half, maximum via `l.lastKey()`) and `r` (upper half, minimum via `r.firstKey()`), alongside total element counts `lSize` and `rSize`.
2. Maintain two invariants whenever a window is ready: (1) every key in `l` is `<=` every key in `r`, and (2) `lSize == rSize` (even `k`) or `lSize == rSize + 1` (odd `k`), i.e., `0 <= lSize - rSize <= 1`.
3. To insert `nums[i]` while preserving order invariant (1), first insert `nums[i]` into `r`, then move `r.firstKey()` into `l` (`++lSize`). Next, restore size invariant (2) with `while (lSize - rSize > 1)` by moving `l.lastKey()` from `l` to `r` (`--lSize`, `++rSize`).
4. Once index `j = i - k + 1 >= 0`, the window `[j..i]` has `k` elements: compute `ans[j]` as `l.lastKey()` if `k` is odd, or `((double) l.lastKey() + r.firstKey()) / 2` if `k` is even.
5. Immediately remove one occurrence of the outgoing element `nums[j]` from whichever map contains it (`l.containsKey(nums[j])` vs `r`), decrementing `lSize` or `rSize` (cleaning up the key when its count hits `0`). The next iteration's insert + `while (lSize - rSize > 1)` automatically rebalances both halves!

### Algorithm / Intuition

In `medianSlidingWindow(int[] nums, int k)`:
- Routing every incoming `nums[i]` through `r` first (`r.merge(nums[i], 1, Integer::sum)` -> extract `x = r.firstKey()` -> push `x` to `l`) guarantees `l` never receives an element larger than `r`'s minimum.
- Notice why `while (lSize - rSize > 1)` suffices after removing `nums[j]` at the end of the previous step: before removal, `lSize - rSize` was `0` (even `k`) or `1` (odd `k`). Removing `nums[j]` from `l` makes `lSize - rSize` equal `-1` or `0`, and the next step's `++lSize` brings it right back to `0` or `1`! Removing `nums[j]` from `r` makes `lSize - rSize` equal `1` or `2`, and the next step's `++lSize` makes it `2` or `3`, which the `while (lSize - rSize > 1)` loop cleanly reduces back down to `0` or `1`!

---

## Dry Run

Tracing **Example 1** with `nums = [1, 3, -1, -3, 5, 3, 6, 7]` and `k = 3`:

| `i` (`nums[i]`) | Balanced `l` (`lSize=2`) | Balanced `r` (`rSize=1`) | `j = i-2` | `ans[j]` (`l.lastKey()`) | Evicted `nums[j]` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` (`1`) | `{1:1}` (`lSize=1`) | `{}` (`rSize=0`) | `-2` | — | — |
| `1` (`3`) | `{1:1}` (`lSize=1`) | `{3:1}` (`rSize=1`) | `-1` | — | — |
| `2` (`-1`) | `{-1:1, 1:1}` | `{3:1}` | `0` | `1.0` | `1` (from `l`) |
| `3` (`-3`) | `{-3:1, -1:1}` | `{3:1}` | `1` | `-1.0` | `3` (from `r`) |
| `4` (`5`) | `{-3:1, -1:1}` | `{5:1}` | `2` | `-1.0` | `-1` (from `l`) |
| `5` (`3`) | `{-3:1, 3:1}` | `{5:1}` | `3` | `3.0` | `-3` (from `l`) |
| `6` (`6`) | `{3:1, 5:1}` | `{6:1}` | `4` | `5.0` | `5` (from `l`) |
| `7` (`7`) | `{3:1, 6:1}` | `{7:1}` | `5` | `6.0` | `3` (from `l`) |

Returns `[1.0, -1.0, -1.0, 3.0, 5.0, 6.0]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log k)` — Each of the `n` iterations performs a constant number of `TreeMap` operations (`merge`, `firstKey`, `lastKey`, `containsKey`, `remove`) over maps containing at most `k + 1` distinct keys.
- **Space Complexity:** `O(k)` — Auxiliary space used by `TreeMap`s `l` and `r` (excluding the required output array `ans` of length `n - k + 1`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [480sliding-window-median.java](./480sliding-window-median.java) |

---

## Key Learnings

- Using two `TreeMap<Integer, Integer>` frequency maps provides eager `O(log k)` arbitrary deletion without needing complex lazy-deletion bookkeeping on `PriorityQueue`s.
- Remember that `TreeMap.size()` returns the number of distinct keys, so multiset element counts must be tracked separately via `lSize` and `rSize`.
- Always cast `((double) l.lastKey() + r.firstKey()) / 2` before addition to avoid 32-bit signed integer overflow.
