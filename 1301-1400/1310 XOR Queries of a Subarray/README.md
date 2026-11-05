---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
  - Prefix Sum
---

# 1310. XOR Queries of a Subarray

**[View Problem on LeetCode](https://leetcode.com/problems/xor-queries-of-a-subarray/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1310` (`1310`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an array `arr` of positive integers and a 2D array `queries`, where each query `queries[i] = [left_i, right_i]` specifies a 0-indexed inclusive subarray range.

For each query, compute the bitwise **XOR** of all elements from `arr[left_i]` through `arr[right_i]`, and return an array containing the answers to all queries in order.

---

## Examples

### Example 1

```text
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8]
Explanation:
The binary representation of the elements in the array are:
1 = 0001
3 = 0011
4 = 0100
8 = 1000
The XOR values for queries are:
[0,1] = 1 xor 3 = 2
[1,2] = 3 xor 4 = 7
[0,3] = 1 xor 3 xor 4 xor 8 = 14
[3,3] = 8
```

### Example 2

```text
Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]
```

---

## Constraints

- `1 <= arr.length, queries.length <= 3 * 10^4`

- `1 <= arr[i] <= 10^9`

- `queries[i].length == 2`

- `0 <= left_i <= right_i < arr.length`

---

## Problem Understanding

- Bitwise XOR (`^`) is associative, commutative, has identity `0` (`x ^ 0 = x`), and every integer is its **own inverse** (`x ^ x = 0`).
- Because `x ^ x = 0`, XORing a prefix `[0..right]` with a shorter prefix `[0..left - 1]` cancels out every element in `[0..left - 1]`, leaving only `[left..right]`.
- Both `arr.length` and `queries.length` can be up to `3 * 10^4`, so answering each query in `O(1)` time after linear preprocessing avoids an `O(n * m)` bottleneck.

---

## Approach

### Brute Force Approach

For each query `[l, r]`, run a loop from index `l` to `r` accumulating `res ^= arr[k]`. In the worst case where every query spans `[0, n - 1]`, each of the `m` queries takes `O(n)` time, resulting in `O(n * m)` total operations (~`9 * 10^8` operations for `3 * 10^4`).

### Optimized Approach

Precompute a 1-indexed prefix XOR array `s` of length `n + 1` where `s[i]` stores the XOR of the first `i` elements of `arr`. Answer each query `[l, r]` in `O(1)` time as `s[r + 1] ^ s[l]`.

### Step-by-Step Thinking Process

1. Recall prefix sums for range addition queries (`sum(l..r) = pref[r + 1] - pref[l]`). Since XOR is its own inverse operation (just like subtraction undoes addition), prefix XOR works identically!
2. Allocate `s` of length `n + 1` initialized to `0`, setting `s[0] = 0` so queries starting at `l = 0` require no special `if (l === 0)` branch.
3. Fill `s[i] = s[i - 1] ^ arr[i - 1]` for `i = 1` to `n`.
4. For each query `[l, r]`, compute `ans[i] = s[r + 1] ^ s[l]`.

### Algorithm / Intuition

In `xorQueries`, `s[k]` equals `arr[0] ^ arr[1] ^ ... ^ arr[k - 1]` (with `s[0] = 0`). When evaluating `s[r + 1] ^ s[l]`, we compute `(arr[0] ^ ... ^ arr[l - 1] ^ arr[l] ^ ... ^ arr[r]) ^ (arr[0] ^ ... ^ arr[l - 1])`. By associativity and commutativity of XOR, each `arr[j]` for `0 <= j < l` pairs up with itself (`arr[j] ^ arr[j] = 0`), leaving `0 ^ arr[l] ^ ... ^ arr[r] = arr[l] ^ ... ^ arr[r]`.

---

## Dry Run

Tracing `arr = [1, 3, 4, 8]`, `queries = [[0,1], [1,2], [0,3], [3,3]]` (**Example 1**):

1. **Build prefix XOR array `s` (`n = 4`):**
   - `s[0] = 0`
   - `s[1] = 0 ^ 1 = 1` (`0001_2`)
   - `s[2] = 1 ^ 3 = 2` (`0010_2`)
   - `s[3] = 2 ^ 4 = 6` (`0110_2`)
   - `s[4] = 6 ^ 8 = 14` (`1110_2`)
   - Resulting `s = [0, 1, 2, 6, 14]`
2. **Evaluate `queries`:**
   - `i = 0`, `[0, 1]`: `s[2] ^ s[0] = 2 ^ 0 = 2`
   - `i = 1`, `[1, 2]`: `s[3] ^ s[1] = 6 ^ 1 = 7`
   - `i = 2`, `[0, 3]`: `s[4] ^ s[0] = 14 ^ 0 = 14`
   - `i = 3`, `[3, 3]`: `s[4] ^ s[3] = 14 ^ 6 = 8`

Return `ans = [2, 7, 14, 8]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + m)` — Building the prefix array `s` takes `O(n)` time, and answering all `m` queries takes `O(m)` time (`O(1)` per query).
- **Space Complexity:** `O(n)` — Auxiliary prefix array `s` uses `n + 1` elements (excluding the required `O(m)` output array `ans`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1310xor-queries-of-a-subarray.js](./1310xor-queries-of-a-subarray.js) |

---

## Key Learnings

- Any invertible associative operation (such as `+`, `-`, `^`, or modular multiplication with modular inverse) supports `O(1)` static range queries via a prefix array.
- Padding a prefix array with a leading identity element (`s[0] = 0`) eliminates boundary checks when `left === 0`.
- In JavaScript, bitwise operators (`^`) coerce operands to 32-bit signed integers; since `arr[i] <= 10^9 < 2^30`, all values fit safely within 31 non-sign bits.
