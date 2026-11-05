---
comments: true
difficulty: Easy
tags:
  - Array
  - Two Pointers
---

# 283. Move Zeroes

**[View Problem on LeetCode](https://leetcode.com/problems/move-zeroes/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0283` (`283`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, reorder its elements **in-place** so that every `0` is moved to the end of the array while all non-zero integers keep their original relative order.

You must modify `nums` directly without allocating a separate copy of the array.

---

## Examples

### Example 1

```text
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

### Example 2

```text
Input: nums = [0]
Output: [0]
```

---

## Constraints

- `1 <= nums.length <= 10^4`

- `-2^31 <= nums[i] <= 2^31 - 1`

---

## Follow-up Questions

Could you minimize the total number of operations done?

In this swap-based solution, the number of swaps equals `k` (the count of non-zero elements), performing `2k` array writes—which is already optimal when `nums` is mostly zeros (e.g., `[0, 0, ..., 0, 1]` performs just `1` swap instead of overwriting `n` slots in a two-pass approach). To eliminate redundant self-writes when `nums` starts with non-zeros, you can guard the swap with `if (++i != j)`.

---

## Problem Understanding

- This is a stable in-place partitioning problem: non-zero values belong in the prefix (preserving order) and zeros belong in the suffix.
- Allocating an auxiliary array is forbidden, so we must rearrange elements using constant extra variables.
- Arrays with no zeros (e.g., `[1, 2, 3]`) or all zeros (e.g., `[0]`) must remain unchanged without out-of-bounds accesses.

---

## Approach

### Brute Force Approach

An in-place bubble-like brute force scans for each `0` and shifts all subsequent elements one position to the left, placing `0` at the end. When `nums` contains many zeros, repeated element shifting degrades to `O(n^2)` time.

### Optimized Approach

Use a Lomuto-style two-pointer single pass: pointer `j` scans every index from `0` to `n - 1`, and pointer `i` (initialized to `-1`) tracks the tail of the non-zero prefix, swapping `nums[++i]` with `nums[j]` whenever `nums[j] != 0`.

### Step-by-Step Thinking Process

1. Maintain a boundary index `i` initialized to `-1` such that `nums[0..i]` always holds all non-zero elements encountered so far in their exact original order.
2. Advance explorer pointer `j` from `0` to `n - 1`.
3. If `nums[j] == 0`, do nothing—the zero naturally becomes part of the zero block `nums[i + 1 .. j]`.
4. If `nums[j] != 0`, advance `++i` (which points either to `j` itself if no zeros were seen yet, or to the leftmost `0`) and swap `nums[i]` with `nums[j]`.

### Algorithm / Intuition

At the start of each iteration `j`, the array is partitioned into three regions: `nums[0..i]` (compacted non-zeros in original order), `nums[i+1..j-1]` (all `0`s), and `nums[j..n-1]` (uninspected elements). When `nums[j]` is non-zero, `++i` lands on the very first `0` in the middle block (or on `j` itself if the middle block is empty). Swapping `nums[i]` and `nums[j]` appends `nums[j]` to the non-zero prefix and pushes that `0` to index `j`, preserving both stability of non-zeros and the all-zero middle invariant.

---

## Dry Run

Tracing **Example 1** (`nums = [0, 1, 0, 3, 12]`, `i = -1`):

| `j` | `nums[j]` | Condition `nums[j] != 0` | Action | `nums` after step |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `0` | `false` | Skip (`i = -1`) | `[0, 1, 0, 3, 12]` |
| `1` | `1` | `true` | `++i -> 0`, swap `nums[0]` & `nums[1]` | `[1, 0, 0, 3, 12]` |
| `2` | `0` | `false` | Skip (`i = 0`) | `[1, 0, 0, 3, 12]` |
| `3` | `3` | `true` | `++i -> 1`, swap `nums[1]` & `nums[3]` | `[1, 3, 0, 0, 12]` |
| `4` | `12` | `true` | `++i -> 2`, swap `nums[2]` & `nums[4]` | `[1, 3, 12, 0, 0]` |

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Pointer `j` traverses the `n`-element array exactly once, performing `O(1)` work per element.
- **Space Complexity:** `O(1)` — Only integer indices `i`, `j`, `n`, and swap variable `t` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [283move-zeroes.java](./283move-zeroes.java) |

---

## Key Learnings

- The Lomuto partition pattern (`++i` swap on matching elements) preserves the relative order of chosen elements (`nums[j] != 0`) while pushing rejected elements (`0`) rightward.
- Initializing `i = -1` and using pre-increment `++i` avoids off-by-one confusion about whether `i` points to the last non-zero or the next write slot.
