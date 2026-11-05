---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 162. Find Peak Element

**[View Problem on LeetCode](https://leetcode.com/problems/find-peak-element/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0162` (`162`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a **0-indexed** integer array `nums` where adjacent elements are never equal (`nums[i] != nums[i + 1]`), find any **peak element** and return its **index**.

An element `nums[i]` is a peak if it is strictly greater than its immediate neighbors. Out-of-bounds positions `nums[-1]` and `nums[n]` are treated as `-infinity`, meaning index `0` is a peak if `nums[0] > nums[1]` and index `n - 1` is a peak if `nums[n - 1] > nums[n - 2]`. Your algorithm must run in `O(log n)` time.

---

## Examples

### Example 1

```text
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
```

### Example 2

```text
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```

---

## Constraints

- `1 <= nums.length <= 1000`

- `-2^31 <= nums[i] <= 2^31 - 1`

- `nums[i] != nums[i + 1]` for all valid `i`.

---

## Problem Understanding

- **Guaranteed Existence of a Peak:** Because `nums[-1] = -infinity`, `nums[n] = -infinity`, and no two adjacent numbers are equal, walking uphill from any index must eventually reach a local peak before hitting an array boundary.
- **Return Any Valid Peak Index:** We do not need the global maximum—returning the index of *any* local peak suffices.
- **Local Slope Guides Binary Search:** Comparing `nums[mid]` with `nums[mid + 1]` tells us whether we are currently on a **descending slope** (`nums[mid] > nums[mid + 1]`, so a peak exists at or left of `mid`) or an **ascending slope** (`nums[mid] < nums[mid + 1]`, so a peak exists strictly right of `mid`).

---

## Approach

### Brute Force Approach

A single linear scan checks from `i = 0` to `n - 1` for the first index where `nums[i] > nums[i + 1]` (returning `n - 1` if the array strictly increases to the end). While simple, this takes `O(n)` time instead of the required `O(log n)`.

### Optimized Approach

Use **Binary Search on Local Slopes** over `[left, right]`. At `mid = Math.floor((left + right) / 2)`, if `nums[mid] > nums[mid + 1]`, keep the left half including `mid` (`right = mid`); otherwise climb right (`left = mid + 1`).

### Step-by-Step Thinking Process

1. Maintain the invariant across `[left, right]` that the element just outside `left` (`left - 1`) is smaller than `nums[left]`, and the element just outside `right` (`right + 1`) is smaller than `nums[right]`.
2. Initially `left = 0` and `right = nums.length - 1` satisfy this invariant automatically because `nums[-1] = nums[n] = -infinity`.
3. While `left < right`, `mid = Math.floor((left + right) / 2)` guarantees `mid + 1 <= right < nums.length`, so `nums[mid + 1]` is always in bounds.
4. If `nums[mid] > nums[mid + 1]`, setting `right = mid` preserves the right boundary invariant (`nums[right] > nums[right + 1]`).
5. Otherwise (`nums[mid] < nums[mid + 1]`, since `nums[mid] != nums[mid + 1]`), setting `left = mid + 1` preserves the left boundary invariant (`nums[left - 1] < nums[left]`). When `left == right`, both boundary conditions hold at once, proving `left` is a peak!

### Algorithm / Intuition

Even though `nums` is not globally sorted, binary search still works because **monotonic boundary invariants** guarantee a peak inside `[left, right]`. Think of standing at `mid` in dense fog: you only look one step right (`mid + 1`). If `mid + 1` goes uphill, climbing into `[mid + 1, right]` guarantees you will hit a peak before falling off the `-infinity` cliff at `right + 1`. If `mid + 1` goes downhill, staying in `[left, mid]` guarantees `mid` itself—or something even higher to its left—is a peak.

---

## Dry Run

Trace on **Example 1**: `nums = [1, 2, 3, 1]` (`left = 0, right = 3`)

| Iteration | `left` | `right` | `mid` | Comparison `nums[mid] > nums[mid + 1]` | Pointer Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `0` | `3` | `1` | `nums[1] (2) > nums[2] (3)` -> `false` | `left = 1 + 1 = 2` |
| 2 | `2` | `3` | `2` | `nums[2] (3) > nums[3] (1)` -> `true` | `right = 2` |

Now `left == right == 2`; loop exits and returns index `2` (`nums[2] = 3`).

---

## Complexity Analysis

- **Time Complexity:** `O(log n)` — Each iteration halves the search interval `[left, right]` of initial size `n`.
- **Space Complexity:** `O(1)` — Only `left`, `right`, and `mid` scalar variables are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [162find-peak-element.js](./162find-peak-element.js) |

---

## Key Learnings

- Binary search applies beyond sorted arrays whenever a `mid` check establishes an existence invariant on one half of the search range.
- Flooring `mid = Math.floor((left + right) / 2)` under `while (left < right)` guarantees `mid + 1` never goes out of bounds, even on a 2-element range.
- The constraint `nums[i] != nums[i + 1]` is essential—if flat plateaus were allowed (`[1, 1, 1, 2, 1]`), `O(log n)` slope comparison could not tell which direction leads uphill.
