---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Bit Manipulation
  - Counting
---

# 2275. Largest Combination With Bitwise AND Greater Than Zero

**[View Problem on LeetCode](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2275` (`2275`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Bit Manipulation`, `Counting` |
| **Solution Language** | Java |

---

## Problem Description

The bitwise AND of an array of integers is the result of applying the bitwise AND operator across all elements in that array.

You are given an array of positive integers `candidates`. You can select any combination (subsequence/subset) of elements from `candidates`.

Your goal is to find the size of the largest combination of integers from `candidates` such that the bitwise AND of all elements in the combination is strictly greater than `0`.

---

## Examples

### Example 1

```text
Input: candidates = [16,17,71,62,12,24,14]
Output: 4
Explanation: The combination [16,17,62,24] has a bitwise AND of 16 & 17 & 62 & 24 = 16 > 0.
The size of the combination is 4.
It can be shown that no combination with a size greater than 4 has a bitwise AND greater than 0.
Note that more than one combination may have the largest size.
For example, the combination [62,12,24,14] has a bitwise AND of 62 & 12 & 24 & 14 = 8 > 0.
```

### Example 2

```text
Input: candidates = [8,8]
Output: 2
Explanation: The largest combination [8,8] has a bitwise AND of 8 & 8 = 8 > 0.
The size of the combination is 2, so we return 2.
```

---

## Constraints

- `1 <= candidates.length <= 10^5`

- `1 <= candidates[i] <= 10^7`

---

## Problem Understanding

Key observations and constraints:
- `1 <= candidates.length <= 10^5` and `1 <= candidates[i] <= 10^7`.
- For the bitwise AND of a set of numbers to be strictly greater than 0, there must exist at least one bit position `i` where EVERY number in that combination has a `1` bit.
- Conversely, if we select all numbers in `candidates` that have a `1` at a specific bit position `i`, their bitwise AND will have that `i`-th bit set, guaranteeing a value of at least `2^i > 0`.
- Therefore, the problem reduces to: for each bit position `i`, count how many numbers in `candidates` have their `i`-th bit set to `1`. The maximum count across all bit positions represents the size of the largest valid combination.
- Since `candidates[i] <= 10^7 < 2^24`, numbers have at most 24 significant bits.

---

## Approach

### Brute Force Approach

A brute-force solution would generate all possible non-empty combinations of `candidates` (there are `2^n - 1` such subsets), compute the bitwise AND for each subset, and find the maximum size among subsets with bitwise AND `> 0`.

With `n = 10^5`, `2^{100000}` is unimaginably large and completely impossible to evaluate.

### Optimized Approach

Analyze each bit column independently. Find the maximum value in `candidates` to determine the maximum number of bits `m` that need examination (`m <= 24`). For each bit position `i` from `0` to `m - 1`, iterate through all numbers in `candidates` and count how many have the `i`-th bit set. The answer is the maximum count found across all `m` bit positions. This takes `O(m * n)` time, which is approximately `24 * 10^5 = 2.4 * 10^6` operations.

### Step-by-Step Thinking Process

1. Consider the condition: `bitwise AND > 0`. This holds if and only if at least one bit position is non-zero in the combined result.
2. For a bit position `b` to remain `1` after AND-ing multiple numbers, every chosen number must have a `1` at bit `b`.
3. To maximize the subset size for a fixed bit `b`, we simply take all candidates that have bit `b` set.
4. Thus, the maximum subset size overall is the maximum count of candidates having bit `b` set, taken over all possible bit positions `b`.
5. Determine the maximum number of bits `m` from the largest candidate, loop `i` from `0` to `m - 1`, count set bits, and track the maximum.

### Algorithm / Intuition

In `Solution.largestCombination`, we first find the maximum element `mx` in `candidates` using `Arrays.stream(candidates).max().getAsInt()`. We compute the number of significant bits `m` using `Integer.SIZE - Integer.numberOfLeadingZeros(mx)`.

We then iterate through each bit index `i` from `0` to `m - 1`. For each bit position, a counter `cnt` is incremented whenever `(x >> i) & 1` equals 1 for an element `x` in `candidates`. We update `ans = Math.max(ans, cnt)`. After checking all bit positions, `ans` holds the maximum size of a combination whose bitwise AND has at least one common set bit.

---

## Dry Run

Consider `candidates = [16, 17, 71, 62, 12, 24, 14]`:
- Maximum value `mx = 71`. Binary representation of 71 is `1000111_2` (7 bits, so `m = 7`).
- Bit 0 (`2^0 = 1`): elements with bit 0 set are 17 (`...01`), 71 (`...11`) -> count = 2.
- Bit 1 (`2^1 = 2`): elements with bit 1 set are 71, 62, 14 -> count = 3.
- Bit 2 (`2^2 = 4`): elements with bit 2 set are 71, 62, 12, 14 -> count = 4.
- Bit 3 (`2^3 = 8`): elements with bit 3 set are 24, 14 -> count = 2.
- Bit 4 (`2^4 = 16`): elements with bit 4 set are 16, 17, 62, 24 -> count = 4.
- Bit 5 (`2^5 = 32`): elements with bit 5 set are 62 -> count = 1.
- Bit 6 (`2^6 = 64`): elements with bit 6 set are 71 -> count = 1.
- Maximum count found across all bits is `Math.max(2, 3, 4, 2, 4, 1, 1) = 4` (achieved at bit 2 or bit 4).
- Return `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — where `n` is the length of `candidates` and `m <= 24` is the number of bits in the binary representation of the maximum candidate value. The algorithm performs `24 * 10^5` operations, executing in under 20ms.
- **Space Complexity:** `O(1)` — Only scalar variables (`mx`, `m`, `ans`, `cnt`, `i`, `x`) are used, consuming constant auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2275largest-combination-with-bitwise-and-greater-than-zero.java](./2275largest-combination-with-bitwise-and-greater-than-zero.java) |

---

## Key Learnings

- Bitwise properties can often be decomposed column-by-column across binary bit positions.
- For bitwise AND of multiple integers to be non-zero, it is necessary and sufficient that at least one column consists entirely of 1s.
- `Integer.numberOfLeadingZeros()` provides a clean, hardware-accelerated way to find the bit-width of an integer.
