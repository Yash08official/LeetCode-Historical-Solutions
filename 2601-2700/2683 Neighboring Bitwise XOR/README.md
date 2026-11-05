---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
---

# 2683. Neighboring Bitwise XOR

**[View Problem on LeetCode](https://leetcode.com/problems/neighboring-bitwise-xor/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2683` (`2683`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

A **0-indexed** array `derived` of length `n` is derived by computing the **bitwise XOR** (⊕) of adjacent values in a binary array `original` of length `n`.

Specifically, for each index `i`:
- If `i < n - 1`, then `derived[i] = original[i] ^ original[i + 1]`.
- If `i == n - 1`, then `derived[n - 1] = original[n - 1] ^ original[0]`.

Given the array `derived`, return `true` if such a valid binary array `original` could exist, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: derived = [1,1,0]
Output: true
Explanation: A valid original array that gives derived is [0,1,0].
derived[0] = original[0] ⊕ original[1] = 0 ⊕ 1 = 1
derived[1] = original[1] ⊕ original[2] = 1 ⊕ 0 = 1
derived[2] = original[2] ⊕ original[0] = 0 ⊕ 0 = 0
```

### Example 2

```text
Input: derived = [1,1]
Output: true
Explanation: A valid original array that gives derived is [0,1].
derived[0] = original[0] ⊕ original[1] = 1
derived[1] = original[1] ⊕ original[0] = 1
```

### Example 3

```text
Input: derived = [1,0]
Output: false
Explanation: There is no valid original array that gives derived.
```

---

## Constraints

- `n == derived.length`

- `1 <= n <= 10^5`

- The values in `derived` are either **0's** or **1's**

---

## Problem Understanding

Let `original` be a binary array of length `n` containing values in `{0, 1}`.

Consider the bitwise XOR sum of all elements in `derived`:
`derived[0] ^ derived[1] ^ ... ^ derived[n - 1]`
`= (original[0] ^ original[1]) ^ (original[1] ^ original[2]) ^ ... ^ (original[n - 1] ^ original[0])`.

Because XOR is commutative and associative, and `x ^ x = 0`, every term `original[i]` appears exactly twice in this total XOR sum:
- `original[0]` appears in `derived[0]` and `derived[n - 1]`.
- For all `1 <= i < n`, `original[i]` appears in `derived[i - 1]` and `derived[i]`.

Therefore, the cumulative XOR sum of all elements in `derived` must always equal 0 for any valid `original` array! If `⊕ derived[i] == 0`, a valid `original` array is always constructible (by arbitrarily choosing `original[0] = 0` or `1`).

---

## Approach

### Brute Force Approach

A brute-force simulation would pick `original[0] = 0`, iteratively reconstruct `original[i] = original[i - 1] ^ derived[i - 1]` for all `i = 1..n-1`, and finally check whether `original[n - 1] ^ original[0] == derived[n - 1]`.

While simulation is `O(n)`, it requires allocating an `original` array of size `n` (`O(n)` extra space). The mathematical cumulative XOR property reduces both time and space to an immediate constant-space check.

### Optimized Approach

The optimal approach computes the cumulative XOR of all elements in `derived` using a single variable `s = 0`.

Loop through each element `x` in `derived`:
```java
s ^= x;
```
Return `s == 0`.

### Step-by-Step Thinking Process

1. We are given `derived[i] = original[i] ^ original[(i + 1) % n]`.
2. What happens if we take the XOR sum of all elements in `derived`?
3. Summing across all equations cancels out every `original[i]` because each appears twice: `(a ^ b) ^ (b ^ c) ^ ... ^ (z ^ a) = 0`.
4. Thus, a necessary condition is that the XOR sum of all `derived[i]` must be 0.
5. Is it also sufficient? Yes! If the total XOR sum is 0, setting `original[0] = 0` uniquely determines `original[1..n-1]`, and the circular condition `original[n-1] ^ original[0] == derived[n-1]` is guaranteed to be satisfied.
6. Compute the total XOR sum of `derived` and check if it equals 0.

### Algorithm / Intuition

The solution exploits the self-canceling nature of bitwise XOR:

1. Initialize accumulator `int s = 0`.
2. For each element `x` in `derived`, update `s ^= x`.
3. If the final value of `s` is 0, the parity of transitions around the circle is consistent, meaning a valid original binary cycle exists -> return `true`.
4. If `s != 0`, the cyclic boundary condition cannot be satisfied -> return `false`.

---

## Dry Run

Trace for `derived = [1, 1, 0]`:

- `s = 0`.
- `x = 1`: `s = 0 ^ 1 = 1`.
- `x = 1`: `s = 1 ^ 1 = 0`.
- `x = 0`: `s = 0 ^ 0 = 0`.
- Check `s == 0` -> `0 == 0` is `true`.
- Explanation verification: with `original = [0, 1, 0]`, `0 ^ 1 = 1`, `1 ^ 0 = 1`, `0 ^ 0 = 0` -> matches `derived`.
- **Return:** `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — A single linear pass through the `derived` array of length `n`.
- **Space Complexity:** `O(1)` — Only a single integer variable `s` is used to maintain the running XOR sum.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2683neighboring-bitwise-xor.java](./2683neighboring-bitwise-xor.java) |

---

## Key Learnings

- Cyclic XOR equations telescope completely: `⨁ (x_i ⊕ x_{i+1}) = 0` because each variable appears twice.
- Mathematical invariant checking often simplifies simulation problems into trivial aggregate checks.
- A necessary condition in XOR cycle problems is almost always sufficient due to deterministic forward propagation.
