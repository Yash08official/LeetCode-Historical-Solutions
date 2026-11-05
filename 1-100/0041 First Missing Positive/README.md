---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
---

# 41. First Missing Positive

**[View Problem on LeetCode](https://leetcode.com/problems/first-missing-positive/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0041` (`41`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | Java |

---

## Problem Description

You are given an unsorted integer array `nums` that can contain negative numbers, zeros, positive numbers, and duplicates.

Your task is to find and return the smallest positive integer (`1`, `2`, `3`, ...) that does **not** appear anywhere in `nums`.

To meet the problem's strict efficiency requirements, your algorithm must run in `O(n)` time and use only `O(1)` extra space.

---

## Examples

### Example 1

```text
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.
```

### Example 2

```text
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
```

### Example 3

```text
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-2^31 <= nums[i] <= 2^31 - 1`

---

## Problem Understanding

- **Answer Range Invariant:** For an array of length `n`, the smallest missing positive integer is guaranteed to lie in the closed range `[1, n + 1]`. Specifically, if every integer from `1` through `n` appears in `nums`, the answer is `n + 1`; otherwise, at least one integer in `[1, n]` is missing, and the smallest such integer is the answer.
- **Irrelevant Values:** Any value `<= 0` or `> n` cannot be the answer unless some smaller positive integer in `[1, n]` is already missing, nor does it have a home slot in a `1..n` index mapping.
- **Handling Duplicates Safely:** Because `nums` can contain duplicate values (such as `[1, 1]`), swapping an element to its target index must stop if that target index already holds the exact same number; otherwise, the loop would cycle infinitely.

---

## Approach

### Brute Force Approach

A straightforward baseline is to insert every positive element of `nums` into a `HashSet` and then test `1, 2, 3, ...` sequentially until we find the first integer not in the set. While this runs in `O(n)` time, the `HashSet` consumes `O(n)` auxiliary memory, violating the `O(1)` space constraint. Alternatively, sorting `nums` in-place avoids extra memory (aside from sort stack overhead) and lets us scan for the first gap, but comparison sorting takes `O(n log n)` time, violating the `O(n)` time requirement.

### Optimized Approach

Use **in-place cyclic sort (index hashing)** on the input array itself: treat index `x - 1` as the home slot for every integer `x` in `[1, n]`. Repeatedly swap `nums[i]` into index `nums[i] - 1` while `nums[i]` is within `[1, n]` and not already matched at its target position, then scan the array left-to-right to find the first index `i` where `nums[i] != i + 1`.

### Step-by-Step Thinking Process

1. Observe that for an array of length `n`, we only care about tracking the presence of integers in `[1, n]`. If all of them exist, the answer must be `n + 1`.
2. Since we cannot allocate an auxiliary boolean array of size `n` due to the `O(1)` space rule, repurpose `nums` itself so that index `0` stores `1`, index `1` stores `2`, ..., and index `x - 1` stores `x`.
3. Iterate `i` from `0` to `n - 1`. Whenever `nums[i]` is a valid candidate (`1 <= nums[i] <= n`) and its home slot `nums[i] - 1` does not already contain `nums[i]`, swap `nums[i]` with `nums[nums[i] - 1]`.
4. Use a `while` loop at index `i` because the newly swapped-in value might also belong in `[1, n]` and need to be routed to its own home slot.
5. Once rearrangement finishes, perform a single pass over `nums`: the first index `i` where `nums[i] != i + 1` reveals `i + 1` as the smallest missing positive. If every slot matches, return `n + 1`.

### Algorithm / Intuition

In `firstMissingPositive`, `n` stores `nums.length`. The first `for` loop walks `i` across `[0, n - 1]` and runs a `while` loop with three guards:
1. `nums[i] >= 1` and `nums[i] <= n`: ignores non-positive numbers and numbers larger than `n`, since they have no valid home index `nums[i] - 1` inside `[0, n - 1]`.
2. `nums[i] != nums[nums[i] - 1]`: checks whether the target slot `nums[i] - 1` already holds the value `nums[i]`. This simultaneously covers both the case where `nums[i]` is already in its own home (`i == nums[i] - 1`) and the case where a duplicate value already occupies `nums[i] - 1`.

Whenever all guards hold, the helper `swap(nums, i, nums[i] - 1)` exchanges the two elements using temporary variable `t`. Although there is a `while` loop nested inside a `for` loop, every `swap` permanently places at least one value `x` into its final home index `x - 1`, so at most `n` swaps can ever occur in total. Finally, the second `for` loop checks `if (i + 1 != nums[i])` and returns `i + 1` on the first mismatch, falling back to `return n + 1` if `[1..n]` are all present.

---

## Dry Run

**Input:** `nums = [1, 2, 0]`, `n = 3`

**Phase 1: Cyclic Placement Loop**
| `i` | Current `nums` | Condition `1 <= nums[i] <= 3 && nums[i] != nums[nums[i] - 1]` | Action |
| :--- | :--- | :--- | :--- |
| `0` | `[1, 2, 0]` | `nums[0] = 1` in `[1, 3]`, but `nums[0] == nums[0]` (`1 == 1`) -> `false` | No swap; advance `i` |
| `1` | `[1, 2, 0]` | `nums[1] = 2` in `[1, 3]`, but `nums[1] == nums[1]` (`2 == 2`) -> `false` | No swap; advance `i` |
| `2` | `[1, 2, 0]` | `nums[2] = 0` (`< 1`) -> `false` | No swap; loop ends |

*(Note: On an out-of-order case like `[3, 4, -1, 1]`, `i = 0` swaps `3` to index `2` giving `[-1, 4, 3, 1]`, and `i = 3` swaps `1` to index `0` giving `[1, 4, 3, -1]`.)*

**Phase 2: Verification Scan on `nums = [1, 2, 0]`**
- `i = 0`: `i + 1 = 1 == nums[0]` (`1`) -> matches.
- `i = 1`: `i + 1 = 2 == nums[1]` (`2`) -> matches.
- `i = 2`: `i + 1 = 3 != nums[2]` (`0`) -> mismatch found! Returns **`3`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each execution of `swap` places at least one integer `x` into its permanent index `x - 1` where `nums[x - 1] == x`, which can never be displaced again. Hence the `while` loop executes at most `n` swaps across the entire first pass, and the second pass inspects at most `n` elements.
- **Space Complexity:** `O(1)` — Rearrangement is performed strictly in-place inside `nums` using only scalar variables (`n`, `i`, `t`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [41first-missing-positive.java](./41first-missing-positive.java) |

---

## Key Learnings

- Whenever an array of size `n` asks for missing or duplicate elements in `[1, n]` with `O(1)` extra space, cyclic sort (`x -> index x - 1`) turns the input array into its own direct-address hash table.
- Always test `nums[i] != nums[nums[i] - 1]` rather than `nums[i] != i + 1` during cyclic sort when duplicates may exist; otherwise two identical values at different indices will swap back and forth forever.
- Nested loops do not automatically imply `O(n^2)` time: amortized potential analysis shows at most `n` swaps occur globally because each swap strictly increases the count of correctly placed slots.
