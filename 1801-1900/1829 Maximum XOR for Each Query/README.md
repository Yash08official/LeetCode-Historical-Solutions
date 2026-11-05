---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Prefix Sum
---

# 1829. Maximum XOR for Each Query

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-xor-for-each-query/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1829` (`1829`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

You are given a sorted array `nums` of `n` non-negative integers (each `< 2^{maximumBit}`) and an integer `maximumBit`.

Perform `n` sequential queries (`i = 0` to `n - 1`):
1. Choose a non-negative integer `k < 2^{maximumBit}` that **maximizes** `(nums[0] XOR nums[1] XOR ... XOR nums[last]) XOR k`, and record `k` as `answer[i]`.
2. Remove the **last** element from `nums` before the next query.

Return the resulting array `answer` of length `n`.

---

## Examples

### Example 1

```text
Input: nums = [0,1,1,3], maximumBit = 2
Output: [0,3,2,3]
Explanation: The queries are answered as follows:
1^st query: nums = [0,1,1,3], k = 0 since 0 XOR 1 XOR 1 XOR 3 XOR 0 = 3.
2^nd query: nums = [0,1,1], k = 3 since 0 XOR 1 XOR 1 XOR 3 = 3.
3^rd query: nums = [0,1], k = 2 since 0 XOR 1 XOR 2 = 3.
4^th query: nums = [0], k = 3 since 0 XOR 3 = 3.
```

### Example 2

```text
Input: nums = [2,3,4,7], maximumBit = 3
Output: [5,2,6,5]
Explanation: The queries are answered as follows:
1^st query: nums = [2,3,4,7], k = 5 since 2 XOR 3 XOR 4 XOR 7 XOR 5 = 7.
2^nd query: nums = [2,3,4], k = 2 since 2 XOR 3 XOR 4 XOR 2 = 7.
3^rd query: nums = [2,3], k = 6 since 2 XOR 3 XOR 6 = 7.
4^th query: nums = [2], k = 5 since 2 XOR 5 = 7.
```

### Example 3

```text
Input: nums = [0,1,2,2,5,7], maximumBit = 3
Output: [4,3,6,4,6,7]
```

---

## Constraints

- `nums.length == n`

- `1 <= n <= 10^5`

- `1 <= maximumBit <= 20`

- `0 <= nums[i] < 2^maximumBit`

- `nums`​​​ is sorted in **ascending** order.

---

## Problem Understanding

- **Bitwise Independence:** Since every `nums[idx] < 2^{maximumBit}` and `0 <= k < 2^{maximumBit}`, `xs XOR k` (where `xs` is the current array's XOR sum) can be at most `2^{maximumBit} - 1` (all `1`s in the lowest `maximumBit` bits).
- **Optimal `k` Flips Every Zero Bit:** We can achieve `xs XOR k == 2^{maximumBit} - 1` on **every** query by setting bit `j` (`0 <= j < maximumBit`) of `k` to `1` whenever bit `j` of `xs` is `0`, and `0` otherwise.
- **XOR Self-Inverse (`a ^ a = 0`):** Removing the last element `x` from the array updates the running XOR sum in `O(1)` via `xs ^= x`.

---

## Approach

### Brute Force Approach

Recomputing the XOR of the remaining `n - i` elements from scratch on each query and testing all `2^{maximumBit}` candidate values of `k` would take `O(n^2 + n * 2^{maximumBit})` time — up to `10^{10}` operations for `n = 10^5` and `maximumBit = 20`.

### Optimized Approach

Compute the total XOR `xs` of `nums` once. For each query `i` from `0` to `n - 1`, construct `k` by inspecting bits `0 .. maximumBit - 1` of `xs` and setting `k`'s `j`-th bit whenever `xs` has a `0` at bit `j`, store `ans[i] = k`, and peel off `nums[n - i - 1]` via `xs ^= x`.

### Step-by-Step Thinking Process

1. XOR all elements of `nums` into `xs` so `xs` initially holds `nums[0] ^ ... ^ nums[n - 1]`.
2. For query `i` (`0 <= i < n`), identify the element `x = nums[n - i - 1]` that will be removed at the end of this query.
3. Build `k = 0` bit by bit across `j = maximumBit - 1` down to `0`: if bit `j` of `xs` is `0` (`((xs >> j) & 1) == 0`), turn on bit `j` in `k` (`k |= 1 << j`).
4. Save `ans[i] = k`, then update `xs ^= x` to remove `x` from the prefix XOR in `O(1)`.

### Algorithm / Intuition

To maximize `xs ^ k` under `k < 2^{maximumBit}`, we want every bit position `0 <= j < maximumBit` of `xs ^ k` to evaluate to `1`. The inner loop directly checks `((xs >> j) & 1) == 0`: if `xs` lacks a `1` at bit `j`, `k` supplies it via `k |= 1 << j`; if `xs` already has `1` at bit `j`, `k` leaves bit `j` as `0`. Afterward, `xs ^= nums[n - i - 1]` cancels out the last element because `A ^ x ^ x == A`.

---

## Dry Run

Using **Example 1**: `nums = [0, 1, 1, 3]`, `maximumBit = 2`

Initial total XOR: `xs = 0 ^ 1 ^ 1 ^ 3 = 3` (`11_2`).

| Query `i` | `xs` (binary) | Zero bits in `[0..1]` -> `k` | `ans[i]` | Removed `x = nums[3 - i]` | Next `xs = xs ^ x` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `3` (`11_2`) | none -> `00_2 = 0` | `0` | `3` | `3 ^ 3 = 0` |
| `1` | `0` (`00_2`) | bits `1, 0` -> `11_2 = 3` | `3` | `1` | `0 ^ 1 = 1` |
| `2` | `1` (`01_2`) | bit `1` -> `10_2 = 2` | `2` | `1` | `1 ^ 1 = 0` |
| `3` | `0` (`00_2`) | bits `1, 0` -> `11_2 = 3` | `3` | `0` | `0 ^ 0 = 0` |

Final return value: `[0, 3, 2, 3]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n * maximumBit)` — Initial XOR pass takes `O(n)`, and each of the `n` queries loops over `maximumBit` (`<= 20`) bit positions.
- **Space Complexity:** `O(1)` auxiliary space (excluding the required output array `ans` of length `n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1829maximum-xor-for-each-query.java](./1829maximum-xor-for-each-query.java) |

---

## Key Learnings

- XOR is its own inverse (`xs ^ x ^ x == xs`), allowing dynamic removal of elements from a running XOR sum in `O(1)`.
- Bitmask shortcut: flipping the lowest `maximumBit` bits of `xs` (when `xs < 2^{maximumBit}`) can also be written in a single `O(1)` operation as `k = xs ^ ((1 << maximumBit) - 1)`.
