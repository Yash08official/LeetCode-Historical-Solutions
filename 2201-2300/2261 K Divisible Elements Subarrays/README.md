---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Trie
  - Rolling Hash
  - Hash Function
  - Enumeration
---

# 2261. K Divisible Elements Subarrays

**[View Problem on LeetCode](https://leetcode.com/problems/k-divisible-elements-subarrays/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2261` (`2261`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Trie`, `Rolling Hash`, `Hash Function`, `Enumeration` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` and two positive integers `k` and `p`, return the number of **distinct** non-empty contiguous **subarrays** of `nums` that contain **at most `k` elements divisible by `p`**.

Two subarrays are considered distinct if they have different lengths or differ at any position.

---

## Examples

### Example 1

```text
Input: nums = [2,3,3,2,2], k = 2, p = 2
Output: 11
Explanation:
The elements at indices 0, 3, and 4 are divisible by p = 2.
The 11 distinct subarrays which have at most k = 2 elements divisible by 2 are:
[2], [2,3], [2,3,3], [2,3,3,2], [3], [3,3], [3,3,2], [3,3,2,2], [3,2], [3,2,2], and [2,2].
Note that the subarrays [2] and [3] occur more than once in nums, but they should each be counted only once.
The subarray [2,3,3,2,2] should not be counted because it has 3 elements that are divisible by 2.
```

### Example 2

```text
Input: nums = [1,2,3,4], k = 4, p = 1
Output: 10
Explanation:
All element of nums are divisible by p = 1.
Also, every subarray of nums will have at most 4 elements that are divisible by 1.
Since all subarrays are distinct, the total number of subarrays satisfying all the constraints is 10.
```

---

## Constraints

- `1 <= nums.length <= 200`

- `1 <= nums[i], p <= 200`

- `1 <= k <= nums.length`

---

## Follow-up Questions

Can you solve this problem in O(n^2) time complexity?

Our implemented solution **already achieves `O(n^2)` time complexity**! Instead of copying or hashing each subarray from scratch in `O(n)` (which would take `O(n^3)` overall), updating `(h1, h2)` incrementally as `j` advances costs `O(1)` per subarray. If a deterministic zero-collision `O(n^2)` alternative is required, you can instead insert each valid subarray `nums[i..j]` character-by-character into a **Trie** (moving a `node` pointer in `O(1)` as `j` increments and counting newly created Trie nodes).

---

## Problem Understanding

- **At Most `O(n^2)` Subarrays (`n <= 200`):** With `n <= 200`, there are at most `n * (n + 1) / 2 <= 20,100` subarrays in total. Enumerating `(i, j)` pairs is already `O(n^2)`!
- **Monotonic Divisible Count:** Fixing start index `i` and expanding end index `j` rightward only *increases* (or keeps unchanged) the count `cnt` of elements divisible by `p`. As soon as `cnt > k`, every longer subarray starting at `i` is also invalid, so we can `break` immediately.
- **Fast Deduplication Bottleneck:** Storing subarrays as `String`s or `List<Integer>`s from scratch inside the inner loop takes `O(n)` copying/hashing *per subarray* (`O(n^3)` total). Updating a hash **incrementally in `O(1)`** as `j` advances keeps the entire algorithm strictly `O(n^2)`!

---

## Approach

### Brute Force Approach

Generating every subarray `nums[i..j]`, counting elements divisible by `p`, and converting `Arrays.copyOfRange(nums, i, j + 1)` into a `List<Integer>` or comma-joined `String` to insert into a `HashSet` performs `O(j - i + 1)` work per subarray, resulting in `O(n^3)` time and `O(n^3)` space.

### Optimized Approach

Enumerate valid subarrays `nums[i..j]` (`cnt <= k`) while computing an incremental **64-bit double polynomial rolling hash** (`(h1 << 32) | h2`) in `O(1)` per step and inserting the combined `Long` key into a `HashSet<Long>`.

### Step-by-Step Thinking Process

1. Choose two independent polynomial hash bases (`base1 = 131`, `base2 = 13331`—note `nums[j] <= 200`, though `base1 = 131` paired with `base2 = 13331 > 200` and distinct prime moduli `10^9 + 7`, `10^9 + 9` makes collisions astronomically unlikely).
2. Loop start index `i` from `0` to `n - 1`, resetting `h1 = 0`, `h2 = 0`, and divisible counter `cnt = 0`.
3. Loop end index `j` from `i` to `n - 1`: increment `cnt` if `nums[j] % p == 0`, and `break` immediately if `cnt > k`.
4. Advance both rolling hashes in `O(1)`: `h1 = (h1 * base1 + nums[j]) % mod1` and `h2 = (h2 * base2 + nums[j]) % mod2`.
5. Pack both 32-bit hash remainders into one 64-bit `long` via `(h1 << 32) | h2`, add it to `Set<Long> s`, and return `s.size()`.

### Algorithm / Intuition

Why use **double** hashing (`h1` and `h2` packed into a `long`) instead of a single 32-bit hash?
- By the **Birthday Paradox**, with up to `M ≈ 2 * 10^4` distinct subarrays, a single modulo `~10^9` hash has collision probability roughly `M^2 / (2 * 10^9) ≈ 0.2` (20% chance of a false collision across a test suite!).
- Combining two independent hashes `(mod1 = 10^9 + 7, mod2 = 10^9 + 9)` into a single 64-bit integer `(h1 << 32) | h2` gives an effective modulus of `~10^{18}`, dropping collision probability to `M^2 / (2 * 10^{18}) ≈ 2 * 10^{-10}` while storing just one `Long` per distinct subarray!
- Also note that because `1 <= nums[j] <= 200` (never `0`!), leading elements never vanish into `0`, so subarrays of different lengths never trivially collide at `0`.

---

## Dry Run

Trace on **Example 1**: `nums = [2, 3, 3, 2, 2]`, `k = 2`, `p = 2`.

- Divisible elements (`% 2 == 0`): indices `0` (`2`), `3` (`2`), `4` (`2`).
- **`i = 0`:**
  - `j = 0` (`[2]`, `cnt = 1`): adds hash(`2`) -> `|s| = 1`
  - `j = 1` (`[2,3]`, `cnt = 1`): adds hash(`2,3`) -> `|s| = 2`
  - `j = 2` (`[2,3,3]`, `cnt = 1`): adds hash(`2,3,3`) -> `|s| = 3`
  - `j = 3` (`[2,3,3,2]`, `cnt = 2`): adds hash(`2,3,3,2`) -> `|s| = 4`
  - `j = 4` (`cnt = 3 > 2`): `break`!
- **`i = 1`:**
  - `j = 1..4` (`[3]`, `[3,3]`, `[3,3,2]`, `[3,3,2,2]`, `cnt <= 2`): all 4 hashes are new -> `|s| = 8`.
- **`i = 2`:**
  - `j = 2` (`[3]`, `cnt = 0`): duplicate of `nums[1..1]`, `|s|` stays `8`.
  - `j = 3` (`[3,2]`, `cnt = 1`): new -> `|s| = 9`.
  - `j = 4` (`[3,2,2]`, `cnt = 2`): new -> `|s| = 10`.
- **`i = 3`:**
  - `j = 3` (`[2]`, `cnt = 1`): duplicate of `nums[0..0]`, `|s|` stays `10`.
  - `j = 4` (`[2,2]`, `cnt = 2`): new -> `|s| = 11`.
- **`i = 4`:**
  - `j = 4` (`[2]`, `cnt = 1`): duplicate -> `|s|` stays `11`.
- Returns `s.size() = 11`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — The nested `(i, j)` loops execute at most `n * (n + 1) / 2` times, doing `O(1)` arithmetic and `O(1)` average-time `HashSet<Long>` insertion per step.
- **Space Complexity:** `O(n^2)` — `Set<Long> s` stores at most `n * (n + 1) / 2` 64-bit hashes.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2261k-divisible-elements-subarrays.java](./2261k-divisible-elements-subarrays.java) |

---

## Key Learnings

- Packing two 32-bit rolling hashes into a single 64-bit `long` (`(h1 << 32) | h2`) achieves near-zero collision risk while keeping `O(1)` hash updates and minimal memory.
- As a general best practice for polynomial hashing, choose both bases strictly greater than the maximum alphabet value (`max(nums[i]) = 200`, e.g., `base > 200`) and ensure elements are `>= 1` (shift by `+ 1` if `0` can appear) so `[0]` and `[0, 0]` do not share hash `0`.
