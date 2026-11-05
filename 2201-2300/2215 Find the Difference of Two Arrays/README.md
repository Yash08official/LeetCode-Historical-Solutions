---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
---

# 2215. Find the Difference of Two Arrays

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-difference-of-two-arrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2215` (`2215`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two **0-indexed** integer arrays `nums1` and `nums2`, return a 2-element array `[answer[0], answer[1]]` where:

- `answer[0]` contains all **distinct** integers that appear in `nums1` **but not** in `nums2`.
- `answer[1]` contains all **distinct** integers that appear in `nums2` **but not** in `nums1`.

The elements within each output list may be returned in **any** order.

---

## Examples

### Example 1

```text
Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation:
For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3].
For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums1. Therefore, answer[1] = [4,6].
```

### Example 2

```text
Input: nums1 = [1,2,3,3], nums2 = [1,1,2,2]
Output: [[3],[]]
Explanation:
For nums1, nums1[2] and nums1[3] are not present in nums2. Since nums1[2] == nums1[3], their value is only included once and answer[0] = [3].
Every integer in nums2 is present in nums1. Therefore, answer[1] = [].
```

---

## Constraints

- `1 <= nums1.length, nums2.length <= 1000`

- `-1000 <= nums1[i], nums2[i] <= 1000`

---

## Problem Understanding

- **Set Difference (`A \ B` and `B \ A`):** Duplicates within `nums1` (or within `nums2`) must appear at most **once** in the output, and order does not matter. That makes mathematical **sets** the exact abstraction required.
- **Fast Membership Testing:** Checking whether an element exists in the other collection happens once per unique element, which takes `O(1)` average time with a hash set.

---

## Approach

### Brute Force Approach

For each element in `nums1`, scan all of `nums2` linearly (`nums2.includes(x)`) and also scan `answer[0]` (`!l1.includes(x)`) to avoid duplicates, then repeat symmetrically for `nums2`. For arrays of length `n` and `m` (`<= 1000`), this takes `O(n * m + n^2 + m^2)` time.

### Optimized Approach

Convert both arrays into JavaScript `Set` objects (`s1` and `s2`) to deduplicate elements automatically and enable `O(1)` `.has()` lookups when building `l1` (`s1 \ s2`) and `l2` (`s2 \ s1`).

### Step-by-Step Thinking Process

1. Construct `s1 = new Set(nums1)` and `s2 = new Set(nums2)` to eliminate duplicate values upfront.
2. Initialize empty result arrays `l1 = []` and `l2 = []`.
3. Iterate `v` over `s1`: if `!s2.has(v)`, push `v` into `l1`.
4. Iterate `v` over `s2`: if `!s1.has(v)`, push `v` into `l2`.
5. Return `[l1, l2]`.

### Algorithm / Intuition

Passing `nums1` to `new Set(nums1)` accomplishes two goals at once:
1. **Deduplication:** Iterating `for (let v of s1)` visits each distinct integer in `nums1` exactly once, so `l1` is guaranteed to contain distinct elements without extra duplicate checks.
2. **Constant-Time Lookup:** `!s2.has(v)` checks membership in `s2` in `O(1)` average time instead of an `O(m)` array scan.

---

## Dry Run

Trace on **Example 1**: `nums1 = [1, 2, 3]`, `nums2 = [2, 4, 6]`.

1. **Create sets:**
   - `s1 = Set {1, 2, 3}`
   - `s2 = Set {2, 4, 6}`
2. **Build `l1` (`v` in `s1` where `!s2.has(v)`):**
   - `v = 1`: `!s2.has(1)` is `true` -> `l1 = [1]`
   - `v = 2`: `!s2.has(2)` is `false` -> skip
   - `v = 3`: `!s2.has(3)` is `true` -> `l1 = [1, 3]`
3. **Build `l2` (`v` in `s2` where `!s1.has(v)`):**
   - `v = 2`: `!s1.has(2)` is `false` -> skip
   - `v = 4`: `!s1.has(4)` is `true` -> `l2 = [4]`
   - `v = 6`: `!s1.has(6)` is `true` -> `l2 = [4, 6]`
4. **Return `[l1, l2]`:** `[[1, 3], [4, 6]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m)` — Where `n = nums1.length` and `m = nums2.length`, building `s1` and `s2` takes `O(n + m)` average time, and iterating over both sets with `O(1)` `.has()` checks takes `O(n + m)` average time.
- **Space Complexity:** `O(n + m)` — Sets `s1` and `s2` store up to `n` and `m` distinct integers respectively.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2215find-the-difference-of-two-arrays.js](./2215find-the-difference-of-two-arrays.js) |

---

## Key Learnings

- Iterating over `s1` (the deduplicated `Set`) rather than the raw array `nums1` prevents pushing duplicate values into `l1` without needing to mutate or delete from `s1`.
- JavaScript's `Set` preserves insertion order while providing `O(1)` average-time `.has()` membership queries.
